import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type Ref
} from 'react';
import { Input } from '../Input/Input';
import { Typography } from '../Typography/Typography';
import { Portal } from '../_internal/Portal';
import {
  getDataPresenceAttribute,
  getDataStateAttribute,
  isAriaBooleanTrue
} from '../_internal/dataAttributes';
import { assignRef } from '../_internal/refs';
import { useControllableState } from '../_internal/useControllableState';
import { useDismissableLayer } from '../_internal/useDismissableLayer';
import { useEntranceAnimation } from '../_internal/useEntranceAnimation';
import { useFloatingPosition } from '../_internal/useFloatingPosition';
import {
  getComboboxContentStyleProps,
  getComboboxEmptyStateStyleProps,
  getComboboxListStyleProps,
  getComboboxOptionMetaStyleProps,
  getComboboxOptionStyleProps,
  getComboboxTriggerIndicatorStyleProps,
  getComboboxTriggerLabelStyleProps,
  getComboboxTriggerStyleProps,
  type ComboboxSize
} from './Combobox.styles';

interface ComboboxBaseItem {
  id: string;
  key: string;
  label: string;
  disabled: boolean;
}

interface ComboboxClearItem extends ComboboxBaseItem {
  kind: 'clear';
}

interface ComboboxOptionItem extends ComboboxBaseItem {
  kind: 'option';
  option: ComboboxOption;
}

type ComboboxItem = ComboboxClearItem | ComboboxOptionItem;

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  keywords?: ReadonlyArray<string>;
}

export interface ComboboxProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'defaultValue' | 'onChange' | 'size' | 'type' | 'value'
> {
  ref?: Ref<HTMLButtonElement>;
  options: ReadonlyArray<ComboboxOption>;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  emptyMessage?: string;
  clearLabel?: string;
  clearable?: boolean;
  size?: ComboboxSize;
  invalid?: boolean;
  offset?: number;
}

const CLEAR_ITEM_KEY = '__combobox-clear__';

function normalizeTerm(value: string) {
  return value.trim().toLowerCase();
}

function optionMatchesQuery(option: ComboboxOption, normalizedQuery: string) {
  if (!normalizedQuery) {
    return true;
  }

  const terms = [option.label, option.value, ...(option.keywords ?? [])];
  return terms.some((term) => normalizeTerm(term).includes(normalizedQuery));
}

export function Combobox({
  ref,
  options,
  value,
  defaultValue = null,
  onValueChange,
  open,
  defaultOpen = false,
  onOpenChange,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search options',
  searchAriaLabel = 'Search options',
  emptyMessage = 'No options found.',
  clearLabel = 'Clear selection',
  clearable = true,
  size = 'md',
  invalid: invalidProp = false,
  disabled = false,
  offset = 6,
  className,
  style,
  id: idProp,
  onClick,
  onKeyDown,
  'aria-invalid': ariaInvalidProp,
  ...props
}: ComboboxProps) {
  const generatedId = useId();
  const triggerId = idProp ?? `${generatedId}-trigger`;
  const listboxId = `${generatedId}-listbox`;

  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });
  const [selectedValue, setSelectedValue] = useControllableState<string | null>({
    value,
    defaultValue,
    onChange: onValueChange
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItemIdOverride, setActiveItemIdOverride] = useState<string | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const invalid = invalidProp || isAriaBooleanTrue(ariaInvalidProp);
  const ariaInvalid = invalid ? true : undefined;
  const normalizedQuery = normalizeTerm(searchQuery);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue) ?? null,
    [options, selectedValue]
  );
  const filteredOptions = useMemo(
    () => options.filter((option) => optionMatchesQuery(option, normalizedQuery)),
    [options, normalizedQuery]
  );

  const clearMatchesQuery =
    normalizedQuery.length === 0 || normalizeTerm(clearLabel).includes(normalizedQuery);
  const showClearAction = clearable && selectedOption !== null && clearMatchesQuery;

  const listItems = useMemo(() => {
    const items: ComboboxItem[] = [];

    if (showClearAction) {
      items.push({
        id: `${listboxId}-clear`,
        key: CLEAR_ITEM_KEY,
        kind: 'clear',
        label: clearLabel,
        disabled: false
      });
    }

    filteredOptions.forEach((option, index) => {
      items.push({
        id: `${listboxId}-option-${index}`,
        key: `${option.value}-${index}`,
        kind: 'option',
        option,
        label: option.label,
        disabled: Boolean(option.disabled)
      });
    });

    return items;
  }, [clearLabel, filteredOptions, listboxId, showClearAction]);

  const enabledItems = useMemo(() => listItems.filter((item) => !item.disabled), [listItems]);
  const defaultActiveItemId = useMemo(() => {
    const selectedItem = listItems.find(
      (item) => item.kind === 'option' && item.option.value === selectedValue && !item.disabled
    );
    return selectedItem?.id ?? enabledItems[0]?.id ?? null;
  }, [enabledItems, listItems, selectedValue]);
  const activeItemId =
    activeItemIdOverride && enabledItems.some((item) => item.id === activeItemIdOverride)
      ? activeItemIdOverride
      : defaultActiveItemId;

  const position = useFloatingPosition({
    open: isOpen,
    anchorRef: triggerRef,
    offset,
    matchWidth: true
  });
  useEntranceAnimation(contentRef, isOpen, 'floating');

  const closeCombobox = (restoreFocus: boolean) => {
    setIsOpen(false);
    setSearchQuery('');
    setActiveItemIdOverride(null);
    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  };
  const openCombobox = () => {
    setIsOpen(true);
    setActiveItemIdOverride(null);
  };

  useDismissableLayer({
    open: isOpen,
    layerRef: contentRef,
    branchRefs: [triggerRef],
    onPointerDownOutside: () => closeCombobox(false),
    onEscapeKeyDown: () => closeCombobox(true)
  });

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus();
    }
  }, [isOpen]);

  const triggerStyleProps = getComboboxTriggerStyleProps({
    size,
    invalid,
    className,
    style
  });

  const moveActiveItem = (step: number) => {
    if (!enabledItems.length) {
      return;
    }

    const currentIndex = enabledItems.findIndex((item) => item.id === activeItemId);
    const defaultIndex = step > 0 ? 0 : enabledItems.length - 1;
    const nextIndex =
      currentIndex === -1
        ? defaultIndex
        : (currentIndex + step + enabledItems.length) % enabledItems.length;
    setActiveItemIdOverride(enabledItems[nextIndex]?.id ?? null);
  };

  const selectItem = (item: ComboboxItem) => {
    if (item.disabled) {
      return;
    }

    setSelectedValue(item.kind === 'clear' ? null : item.option.value);
    closeCombobox(true);
  };

  return (
    <>
      <button
        {...props}
        {...triggerStyleProps}
        ref={(node) => {
          triggerRef.current = node;
          assignRef(ref, node);
        }}
        id={triggerId}
        type="button"
        role="combobox"
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={isOpen ? (activeItemId ?? undefined) : undefined}
        aria-invalid={ariaInvalid}
        data-state={getDataStateAttribute(isOpen, 'open', 'closed')}
        data-invalid={getDataPresenceAttribute(invalid)}
        data-disabled={getDataPresenceAttribute(disabled)}
        onClick={(event) => {
          if (isOpen) {
            closeCombobox(false);
          } else {
            openCombobox();
          }
          onClick?.(event);
        }}
        onKeyDown={(event) => {
          if (!isOpen && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
            event.preventDefault();
            openCombobox();
          }

          if (isOpen && event.key === 'Escape') {
            event.preventDefault();
            closeCombobox(false);
          }

          onKeyDown?.(event);
        }}
      >
        <Typography
          as="span"
          variant="small"
          {...getComboboxTriggerLabelStyleProps(selectedOption === null)}
        >
          {selectedOption?.label ?? placeholder}
        </Typography>
        <span aria-hidden="true" {...getComboboxTriggerIndicatorStyleProps()}>
          v
        </span>
      </button>

      {isOpen ? (
        <Portal>
          <div
            {...getComboboxContentStyleProps({
              style: {
                top: `${position.top}px`,
                left: `${position.left}px`,
                minWidth: position.minWidth ? `${position.minWidth}px` : undefined
              }
            })}
            ref={contentRef}
            data-state="open"
          >
            <Input
              ref={searchInputRef}
              size="sm"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
              placeholder={searchPlaceholder}
              aria-label={searchAriaLabel}
              aria-controls={listboxId}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  moveActiveItem(1);
                  event.preventDefault();
                  return;
                }

                if (event.key === 'ArrowUp') {
                  moveActiveItem(-1);
                  event.preventDefault();
                  return;
                }

                if (event.key === 'Home') {
                  setActiveItemIdOverride(enabledItems[0]?.id ?? null);
                  event.preventDefault();
                  return;
                }

                if (event.key === 'End') {
                  setActiveItemIdOverride(enabledItems[enabledItems.length - 1]?.id ?? null);
                  event.preventDefault();
                  return;
                }

                if (event.key === 'Enter') {
                  const activeItem = enabledItems.find((item) => item.id === activeItemId);
                  if (!activeItem) {
                    return;
                  }

                  event.preventDefault();
                  selectItem(activeItem);
                  return;
                }

                if (event.key === 'Escape') {
                  event.preventDefault();
                  closeCombobox(true);
                }
              }}
            />

            <div
              id={listboxId}
              role="listbox"
              aria-labelledby={triggerId}
              {...getComboboxListStyleProps(undefined)}
            >
              {listItems.length === 0 ? (
                <div
                  role="status"
                  aria-live="polite"
                  {...getComboboxEmptyStateStyleProps(undefined)}
                >
                  <Typography as="p" variant="muted">
                    {emptyMessage}
                  </Typography>
                </div>
              ) : (
                listItems.map((item) => {
                  const isActive = item.id === activeItemId;
                  const isSelected = item.kind === 'option' && item.option.value === selectedValue;

                  return (
                    <button
                      key={item.key}
                      type="button"
                      id={item.id}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={item.disabled ? true : undefined}
                      disabled={item.disabled}
                      data-state={getDataStateAttribute(isSelected, 'checked', 'unchecked')}
                      data-disabled={getDataPresenceAttribute(item.disabled)}
                      {...getComboboxOptionStyleProps({
                        active: isActive,
                        selected: isSelected
                      })}
                      onMouseMove={() => {
                        if (!item.disabled) {
                          setActiveItemIdOverride(item.id);
                        }
                      }}
                      onClick={() => {
                        selectItem(item);
                      }}
                    >
                      <Typography as="span" variant="small">
                        {item.label}
                      </Typography>
                      {isSelected ? (
                        <Typography
                          as="span"
                          variant="muted"
                          {...getComboboxOptionMetaStyleProps()}
                        >
                          Selected
                        </Typography>
                      ) : null}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </Portal>
      ) : null}
    </>
  );
}
