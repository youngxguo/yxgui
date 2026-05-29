import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
  type SelectHTMLAttributes
} from 'react';
import { Card } from '../Card/Card';
import { Typography } from '../Typography/Typography';
import {
  getDataPresenceAttribute,
  getDataStateAttribute,
  isAriaBooleanTrue
} from '../_internal/dataAttributes';
import { assignRef } from '../_internal/refs';
import { Portal } from '../_internal/Portal';
import { useControllableState } from '../_internal/useControllableState';
import { useDismissableLayer } from '../_internal/useDismissableLayer';
import { useEntranceAnimation } from '../_internal/useEntranceAnimation';
import { useFloatingPosition } from '../_internal/useFloatingPosition';
import {
  getSelectContentStyleProps,
  getSelectHiddenSelectStyleProps,
  getSelectOptionMetaStyleProps,
  getSelectOptionStyleProps,
  getSelectTriggerIndicatorIconStyleProps,
  getSelectTriggerIndicatorStyleProps,
  getSelectTriggerLabelStyleProps,
  getSelectTriggerStyleProps,
  type SelectSize
} from './Select.styles';

type TriggerEventOverrides = 'onBlur' | 'onClick' | 'onFocus' | 'onKeyDown' | 'size';

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  TriggerEventOverrides
> {
  ref?: Ref<HTMLSelectElement>;
  size?: SelectSize;
  invalid?: boolean;
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
  onFocus?: (event: FocusEvent<HTMLButtonElement>) => void;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  'data-testid'?: string;
  'data-contract'?: string;
}

interface SelectOptionItem {
  key: string;
  value: string;
  label: string;
  disabled: boolean;
}

interface OptionElementProps {
  children?: ReactNode;
  disabled?: boolean;
  label?: string;
  value?: string | number;
}

function getNodeText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((child) => getNodeText(child)).join('');
  }

  if (isValidElement(node)) {
    const element = node as ReactElement<OptionElementProps>;
    return getNodeText(element.props.children);
  }

  return '';
}

function parseSelectOptions(
  nodes: ReactNode,
  groupDisabled = false,
  options: SelectOptionItem[] = []
): SelectOptionItem[] {
  Children.forEach(nodes, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    if (child.type === 'option') {
      const optionElement = child as ReactElement<OptionElementProps>;
      const optionValue =
        optionElement.props.value !== undefined
          ? String(optionElement.props.value)
          : getNodeText(optionElement.props.children);
      const optionLabel =
        optionElement.props.label !== undefined
          ? String(optionElement.props.label)
          : getNodeText(optionElement.props.children);

      options.push({
        key: child.key !== null ? String(child.key) : `${optionValue}-${options.length}`,
        value: optionValue,
        label: optionLabel,
        disabled: groupDisabled || Boolean(optionElement.props.disabled)
      });
      return;
    }

    if (child.type === 'optgroup') {
      const optGroupElement = child as ReactElement<OptionElementProps>;
      parseSelectOptions(
        optGroupElement.props.children,
        groupDisabled || Boolean(optGroupElement.props.disabled),
        options
      );
    }
  });

  return options;
}

export function Select({
  ref,
  children,
  size = 'md',
  invalid: invalidProp = false,
  disabled = false,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  onClick,
  onKeyDown,
  className,
  style,
  id,
  name,
  title,
  required,
  autoFocus,
  tabIndex,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalidProp,
  'data-testid': dataTestId,
  'data-contract': dataContract,
  ...nativeSelectProps
}: SelectProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const nativeSelectRef = useRef<HTMLSelectElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listboxId = useId();

  const options = useMemo(() => parseSelectOptions(children), [children]);
  const enabledOptionIndexes = useMemo(
    () =>
      options.reduce<number[]>((enabled, option, index) => {
        if (!option.disabled) {
          enabled.push(index);
        }
        return enabled;
      }, []),
    [options]
  );
  const controlledValue = value !== undefined ? String(value) : undefined;
  const defaultResolvedValue =
    defaultValue !== undefined ? String(defaultValue) : (options[0]?.value ?? '');
  const [selectedValue, setSelectedValue] = useControllableState<string>({
    value: controlledValue,
    defaultValue: defaultResolvedValue
  });
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const isOpen = !disabled && open;

  const invalid = invalidProp || isAriaBooleanTrue(ariaInvalidProp);
  const ariaInvalid = invalid ? true : undefined;
  const selectedOption = options.find((option) => option.value === selectedValue);
  const triggerLabel = selectedOption?.label ?? options[0]?.label ?? '';
  const fallbackActiveIndex = useMemo(() => {
    const selectedIndex = options.findIndex(
      (option, index) => option.value === selectedValue && enabledOptionIndexes.includes(index)
    );

    return selectedIndex >= 0 ? selectedIndex : (enabledOptionIndexes[0] ?? -1);
  }, [enabledOptionIndexes, options, selectedValue]);
  const resolvedActiveIndex =
    isOpen && enabledOptionIndexes.includes(activeIndex) ? activeIndex : fallbackActiveIndex;
  const activeOptionId =
    isOpen && resolvedActiveIndex >= 0 && options[resolvedActiveIndex]
      ? `${listboxId}-option-${resolvedActiveIndex}`
      : undefined;
  const triggerStyleProps = getSelectTriggerStyleProps({
    size,
    invalid,
    open: isOpen,
    className,
    style
  });

  useEffect(() => {
    if (controlledValue !== undefined || !options.length) {
      return;
    }

    const hasCurrentValue = options.some((option) => option.value === selectedValue);
    if (!hasCurrentValue) {
      setSelectedValue(options[0]?.value ?? '');
    }
  }, [controlledValue, options, selectedValue, setSelectedValue]);

  useEffect(() => {
    if (!isOpen || resolvedActiveIndex < 0) {
      return;
    }

    const activeOptionNode = optionRefs.current[resolvedActiveIndex];
    if (!activeOptionNode || typeof activeOptionNode.scrollIntoView !== 'function') {
      return;
    }

    activeOptionNode.scrollIntoView({ block: 'nearest' });
  }, [isOpen, resolvedActiveIndex]);

  const position = useFloatingPosition({
    open: isOpen,
    anchorRef: triggerRef,
    offset: 6,
    matchWidth: true
  });
  useEntranceAnimation(contentRef, isOpen, 'floating');

  const closeSelect = (focusTrigger: boolean) => {
    setOpen(false);
    if (focusTrigger) {
      triggerRef.current?.focus();
    }
  };

  useDismissableLayer({
    open: isOpen,
    layerRef: contentRef,
    branchRefs: [triggerRef],
    onPointerDownOutside: () => closeSelect(false),
    onEscapeKeyDown: () => closeSelect(true)
  });

  const openSelect = (preferLastItem = false) => {
    if (disabled || !options.length) {
      return;
    }

    const selectedIndex = options.findIndex(
      (option, index) => option.value === selectedValue && enabledOptionIndexes.includes(index)
    );
    const fallbackIndex = preferLastItem
      ? (enabledOptionIndexes[enabledOptionIndexes.length - 1] ?? -1)
      : (enabledOptionIndexes[0] ?? -1);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : fallbackIndex);
    setOpen(true);
  };

  const moveActiveIndex = (step: 1 | -1) => {
    if (!enabledOptionIndexes.length) {
      return;
    }

    const activeEnabledIndex = enabledOptionIndexes.indexOf(resolvedActiveIndex);
    const nextEnabledIndex =
      activeEnabledIndex === -1
        ? step > 0
          ? 0
          : enabledOptionIndexes.length - 1
        : (activeEnabledIndex + step + enabledOptionIndexes.length) % enabledOptionIndexes.length;
    setActiveIndex(enabledOptionIndexes[nextEnabledIndex] ?? -1);
  };

  const commitSelectedValue = (nextValue: string) => {
    if (nextValue === selectedValue) {
      closeSelect(true);
      return;
    }

    const nativeSelect = nativeSelectRef.current;
    if (!nativeSelect) {
      setSelectedValue(nextValue);
      closeSelect(true);
      return;
    }

    nativeSelect.value = nextValue;
    nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));
    closeSelect(true);
  };

  const selectActiveOption = () => {
    if (resolvedActiveIndex < 0) {
      return;
    }

    const option = options[resolvedActiveIndex];
    if (!option || option.disabled) {
      return;
    }

    commitSelectedValue(option.value);
  };

  const handleOpenListboxKeyDown = (event: KeyboardEvent<HTMLElement>): boolean => {
    switch (event.key) {
      case 'ArrowDown':
        moveActiveIndex(1);
        event.preventDefault();
        return true;
      case 'ArrowUp':
        moveActiveIndex(-1);
        event.preventDefault();
        return true;
      case 'Home':
        setActiveIndex(enabledOptionIndexes[0] ?? -1);
        event.preventDefault();
        return true;
      case 'End':
        setActiveIndex(enabledOptionIndexes[enabledOptionIndexes.length - 1] ?? -1);
        event.preventDefault();
        return true;
      case 'Enter':
      case ' ':
        if (!event.altKey && !event.metaKey) {
          selectActiveOption();
          event.preventDefault();
          return true;
        }
        return false;
      default:
        return false;
    }
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (isOpen) {
      if (!handleOpenListboxKeyDown(event)) {
        if (event.key === 'Escape') {
          closeSelect(true);
          event.preventDefault();
        } else if (event.key === 'Tab') {
          closeSelect(false);
        }
      }
    } else {
      if (event.key === 'ArrowDown') {
        openSelect(false);
        event.preventDefault();
      } else if (event.key === 'ArrowUp') {
        openSelect(true);
        event.preventDefault();
      } else if ((event.key === 'Enter' || event.key === ' ') && !event.altKey && !event.metaKey) {
        openSelect(false);
        event.preventDefault();
      }
    }

    onKeyDown?.(event);
  };

  return (
    <>
      <button
        {...triggerStyleProps}
        ref={triggerRef}
        type="button"
        role="combobox"
        id={id}
        name={name}
        title={title}
        autoFocus={autoFocus}
        tabIndex={tabIndex}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={activeOptionId}
        data-testid={dataTestId}
        data-contract={dataContract}
        data-state={getDataStateAttribute(isOpen, 'open', 'closed')}
        data-invalid={getDataPresenceAttribute(invalid)}
        data-disabled={getDataPresenceAttribute(disabled)}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={(event) => {
          const nextTarget = event.relatedTarget;
          if (isOpen && !contentRef.current?.contains(nextTarget)) {
            setOpen(false);
          }

          onBlur?.(event);
        }}
        onClick={(event) => {
          if (!isOpen) {
            openSelect(false);
          } else {
            closeSelect(false);
          }
          onClick?.(event);
        }}
        onKeyDown={handleTriggerKeyDown}
      >
        <Typography
          as="span"
          variant={size === 'sm' ? 'small' : size === 'lg' ? 'lead' : 'text'}
          {...getSelectTriggerLabelStyleProps(triggerLabel.length === 0)}
        >
          {triggerLabel}
        </Typography>
        <span aria-hidden="true" {...getSelectTriggerIndicatorStyleProps(isOpen)}>
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            {...getSelectTriggerIndicatorIconStyleProps()}
          >
            <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <select
        {...nativeSelectProps}
        {...getSelectHiddenSelectStyleProps()}
        ref={(node) => {
          nativeSelectRef.current = node;
          assignRef(ref, node);
        }}
        value={selectedValue}
        name={name}
        required={required}
        disabled={disabled}
        aria-hidden="true"
        tabIndex={-1}
        onChange={(event) => {
          setSelectedValue(event.currentTarget.value);
          onChange?.(event);
        }}
      >
        {children}
      </select>

      {isOpen ? (
        <Portal>
          <Card
            {...getSelectContentStyleProps({
              style: {
                top: `${position.top}px`,
                left: `${position.left}px`,
                minWidth: position.minWidth ? `${position.minWidth}px` : undefined
              }
            })}
            ref={(node) => {
              contentRef.current = node;
            }}
            id={listboxId}
            role="listbox"
            tabIndex={-1}
            data-state="open"
            aria-labelledby={id}
            onKeyDown={handleOpenListboxKeyDown}
          >
            {options.map((option, index) => {
              const isSelected = option.value === selectedValue;
              const isActive = index === resolvedActiveIndex;

              return (
                <button
                  key={option.key}
                  type="button"
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled || undefined}
                  disabled={option.disabled}
                  data-state={getDataStateAttribute(isSelected, 'checked', 'unchecked')}
                  data-disabled={getDataPresenceAttribute(option.disabled)}
                  {...getSelectOptionStyleProps({
                    active: isActive,
                    selected: isSelected
                  })}
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  onMouseMove={() => {
                    if (!option.disabled) {
                      setActiveIndex(index);
                    }
                  }}
                  onClick={() => {
                    if (option.disabled) {
                      return;
                    }

                    commitSelectedValue(option.value);
                  }}
                >
                  <Typography as="span" variant="small">
                    {option.label}
                  </Typography>
                  {isSelected ? (
                    <Typography as="span" variant="muted" {...getSelectOptionMetaStyleProps()}>
                      Selected
                    </Typography>
                  ) : null}
                </button>
              );
            })}
          </Card>
        </Portal>
      ) : null}
    </>
  );
}
