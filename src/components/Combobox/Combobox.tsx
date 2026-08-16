import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import * as stylex from '@stylexjs/stylex';
import { useId, useMemo, type ReactNode, type Ref } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';
import { useThemePortalContainer } from '../Theme/Theme';

export type ComboboxOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

export type ComboboxProps = Omit<
  BaseCombobox.Root.Props<string>,
  'children' | 'inputRef' | 'itemToStringLabel' | 'itemToStringValue' | 'items' | 'multiple'
> & {
  description?: ReactNode;
  emptyMessage?: ReactNode;
  fullWidth?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  label: ReactNode;
  options: readonly ComboboxOption[];
  placeholder?: string;
};

const styles = stylex.create({
  field: {
    display: 'grid',
    gap: spacing.sm,
    maxWidth: '100%',
    width: '280px'
  },
  fullWidth: { width: '100%' },
  label: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  description: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  },
  inputGroup: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'flex',
    minHeight: '38px',
    overflow: 'hidden'
  },
  disabledGroup: {
    backgroundColor: colors.surfaceDisabled,
    borderColor: colors.borderDisabled
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: { default: colors.text, '::placeholder': colors.textMuted },
    flex: 1,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    minWidth: 0,
    outline: 'none',
    paddingBlock: spacing.md,
    paddingLeft: spacing.md,
    paddingRight: 0
  },
  disabledInput: { color: colors.textDisabled },
  control: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: { default: 'transparent', ':hover': colors.surfaceSubtle },
    borderWidth: 0,
    color: colors.textMuted,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    justifyContent: 'center',
    minWidth: '34px',
    padding: 0
  },
  positioner: {
    zIndex: 1100
  },
  popup: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: '0 12px 36px rgba(17, 24, 39, 0.2)',
    boxSizing: 'border-box',
    color: colors.text,
    fontFamily: fontFamilies.sans,
    maxHeight: 'min(280px, var(--available-height))',
    minWidth: 'var(--anchor-width)',
    opacity: 1,
    outline: 'none',
    overflowY: 'auto',
    padding: spacing.sm,
    transform: 'scale(1)',
    transformOrigin: 'var(--transform-origin)',
    transition: 'opacity 120ms ease, transform 120ms ease'
  },
  transition: { opacity: 0, transform: 'scale(0.98)' },
  item: {
    alignItems: 'center',
    borderRadius: radii.sm,
    color: { default: colors.text, ':disabled': colors.textDisabled },
    cursor: { default: 'default', ':disabled': 'not-allowed' },
    display: 'flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    gap: spacing.md,
    justifyContent: 'space-between',
    lineHeight: lineHeights.sm,
    outline: 'none',
    paddingBlock: spacing.md,
    paddingInline: spacing.md,
    userSelect: 'none'
  },
  highlightedItem: { backgroundColor: colors.surfaceSubtle },
  indicator: {
    color: colors.primary,
    fontWeight: fontWeights.semibold
  },
  empty: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingBlock: spacing.md,
    paddingInline: spacing.md
  }
});

export function Combobox({
  description,
  emptyMessage = 'No results found.',
  fullWidth = false,
  inputRef,
  label,
  modal = false,
  options,
  placeholder = 'Search…',
  ...props
}: ComboboxProps) {
  const container = useThemePortalContainer();
  const descriptionId = useId();
  const inputId = useId();
  const optionsByValue = useMemo(
    () => new Map(options.map((option) => [option.value, option])),
    [options]
  );
  const values = useMemo(() => options.map((option) => option.value), [options]);

  return (
    <div {...stylex.props(styles.field, fullWidth && styles.fullWidth)}>
      <BaseCombobox.Root
        {...props}
        itemToStringLabel={(value) => optionsByValue.get(value)?.label ?? value}
        itemToStringValue={(value) => value}
        items={values}
        modal={modal}
      >
        <label htmlFor={inputId} {...stylex.props(styles.label)}>
          {label}
        </label>
        <BaseCombobox.InputGroup
          className={(state) =>
            stylex.props(styles.inputGroup, state.disabled && styles.disabledGroup).className
          }
        >
          <BaseCombobox.Input
            aria-describedby={description ? descriptionId : undefined}
            className={(state) =>
              stylex.props(styles.input, state.disabled && styles.disabledInput).className
            }
            id={inputId}
            placeholder={placeholder}
            ref={inputRef}
          />
          <BaseCombobox.Clear
            aria-label="Clear selection"
            className={stylex.props(styles.control).className}
          >
            ×
          </BaseCombobox.Clear>
          <BaseCombobox.Trigger
            aria-label="Show options"
            className={stylex.props(styles.control).className}
          >
            ▾
          </BaseCombobox.Trigger>
        </BaseCombobox.InputGroup>
        {description && (
          <p id={descriptionId} {...stylex.props(styles.description)}>
            {description}
          </p>
        )}
        <BaseCombobox.Portal container={container}>
          <BaseCombobox.Positioner
            align="start"
            className={stylex.props(styles.positioner).className}
            sideOffset={4}
          >
            <BaseCombobox.Popup
              className={(state) =>
                stylex.props(
                  styles.popup,
                  (state.transitionStatus === 'starting' || state.transitionStatus === 'ending') &&
                    styles.transition
                ).className
              }
            >
              <BaseCombobox.Empty className={stylex.props(styles.empty).className}>
                {emptyMessage}
              </BaseCombobox.Empty>
              <BaseCombobox.List>
                {(value: string) => {
                  const option = optionsByValue.get(value);
                  if (!option) return null;

                  return (
                    <BaseCombobox.Item
                      key={option.value}
                      disabled={option.disabled}
                      value={option.value}
                      className={(state) =>
                        stylex.props(styles.item, state.highlighted && styles.highlightedItem)
                          .className
                      }
                    >
                      {option.label}
                      <BaseCombobox.ItemIndicator
                        className={stylex.props(styles.indicator).className}
                      >
                        ✓
                      </BaseCombobox.ItemIndicator>
                    </BaseCombobox.Item>
                  );
                }}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </BaseCombobox.Root>
    </div>
  );
}
