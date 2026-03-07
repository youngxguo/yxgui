import { useId, useMemo, useRef, useState, type InputHTMLAttributes, type Ref } from 'react';
import { Card } from '../Card/Card';
import { Input } from '../Input/Input';
import { Typography } from '../Typography/Typography';
import {
  getDataPresenceAttribute,
  getDataStateAttribute,
  isAriaBooleanTrue
} from '../_internal/dataAttributes';
import { Portal } from '../_internal/Portal';
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
  getComboboxTriggerIndicatorIconStyleProps,
  getComboboxTriggerIndicatorStyleProps,
  getComboboxTriggerInputStyleProps,
  getComboboxTriggerRootStyleProps,
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
  InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'onChange' | 'size' | 'type' | 'value'
> {
  ref?: Ref<HTMLInputElement>;
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
  onFocus,
  onBlur,
  onKeyDown,
  'aria-invalid': ariaInvalidProp,
  'aria-label': ariaLabelProp,
  ...props
}: ComboboxProps) {
  const generatedId = useId();
  const inputId = idProp ?? `${generatedId}-input`;
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

  const triggerRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  const openCombobox = (resetQuery = true) => {
    setIsOpen(true);
    setActiveItemIdOverride(null);
    if (resetQuery) {
      setSearchQuery('');
    }
  };

  useDismissableLayer({
    open: isOpen,
    layerRef: contentRef,
    branchRefs: [triggerRef],
    onPointerDownOutside: () => closeCombobox(false),
    onEscapeKeyDown: () => closeCombobox(true)
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

  const inputValue = isOpen ? searchQuery : (selectedOption?.label ?? '');
  const inputPlaceholder = isOpen ? searchPlaceholder : placeholder;
  const triggerRootStyleProps = getComboboxTriggerRootStyleProps({ className, style });
  const triggerInputStyleProps = getComboboxTriggerInputStyleProps(undefined);

  return (
    <>
      <div {...triggerRootStyleProps}>
        <Input
          {...props}
          {...triggerInputStyleProps}
          ref={(node) => {
            triggerRef.current = node;
            assignRef(ref, node);
          }}
          id={inputId}
          type="text"
          size={size}
          invalid={invalid}
          disabled={disabled}
          value={inputValue}
          placeholder={inputPlaceholder}
          autoComplete={props.autoComplete ?? 'off'}
          role="combobox"
          aria-label={ariaLabelProp ?? searchAriaLabel}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-activedescendant={isOpen ? (activeItemId ?? undefined) : undefined}
          aria-invalid={ariaInvalid}
          data-state={getDataStateAttribute(isOpen, 'open', 'closed')}
          onFocus={(event) => {
            if (!isOpen) {
              openCombobox(true);
            }
            onFocus?.(event);
          }}
          onBlur={(event) => {
            const nextFocusedNode = event.relatedTarget;
            if (isOpen && !contentRef.current?.contains(nextFocusedNode)) {
              closeCombobox(false);
            }
            onBlur?.(event);
          }}
          onClick={(event) => {
            if (!isOpen) {
              openCombobox(true);
            }
            onClick?.(event);
          }}
          onChange={(event) => {
            if (!isOpen) {
              openCombobox(false);
            }
            setSearchQuery(event.currentTarget.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              if (!isOpen) {
                openCombobox(true);
              } else {
                moveActiveItem(1);
              }
              event.preventDefault();
            }

            if (event.key === 'ArrowUp') {
              if (!isOpen) {
                openCombobox(true);
              } else {
                moveActiveItem(-1);
              }
              event.preventDefault();
            }

            if (isOpen && event.key === 'Home') {
              setActiveItemIdOverride(enabledItems[0]?.id ?? null);
              event.preventDefault();
            }

            if (isOpen && event.key === 'End') {
              setActiveItemIdOverride(enabledItems[enabledItems.length - 1]?.id ?? null);
              event.preventDefault();
            }

            if (event.key === 'Enter') {
              if (!isOpen) {
                openCombobox(true);
                event.preventDefault();
              } else {
                const activeItem = enabledItems.find((item) => item.id === activeItemId);
                if (activeItem) {
                  selectItem(activeItem);
                  event.preventDefault();
                }
              }
            }

            if (event.key === 'Escape' && isOpen) {
              closeCombobox(false);
              event.preventDefault();
            }

            if (event.key === 'Tab' && isOpen) {
              closeCombobox(false);
            }

            onKeyDown?.(event);
          }}
        />
        <span aria-hidden="true" {...getComboboxTriggerIndicatorStyleProps(isOpen)}>
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            {...getComboboxTriggerIndicatorIconStyleProps()}
          >
            <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {isOpen ? (
        <Portal>
          <Card
            {...getComboboxContentStyleProps({
              style: {
                top: `${position.top}px`,
                left: `${position.left}px`,
                minWidth: position.minWidth ? `${position.minWidth}px` : undefined
              }
            })}
            ref={(node) => {
              contentRef.current = node;
            }}
            data-state="open"
          >
            <div
              id={listboxId}
              role="listbox"
              aria-labelledby={inputId}
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
          </Card>
        </Portal>
      ) : null}
    </>
  );
}
