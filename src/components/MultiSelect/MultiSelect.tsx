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

export type MultiSelectOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

export type MultiSelectProps = Omit<
  BaseCombobox.Root.Props<string, true>,
  'children' | 'inputRef' | 'itemToStringLabel' | 'itemToStringValue' | 'items' | 'multiple'
> & {
  description?: ReactNode;
  emptyMessage?: ReactNode;
  fullWidth?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  label: ReactNode;
  options: readonly MultiSelectOption[];
  placeholder?: string;
};

const styles = stylex.create({
  field: {
    display: 'grid',
    gap: spacing.sm,
    maxWidth: '100%',
    width: '320px'
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
    gap: spacing.sm,
    minHeight: '38px',
    padding: spacing.sm
  },
  disabledGroup: {
    backgroundColor: colors.surfaceDisabled,
    borderColor: colors.borderDisabled
  },
  chips: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    gap: spacing.sm,
    minWidth: 0
  },
  chip: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radii.sm,
    color: colors.text,
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    gap: spacing.sm,
    lineHeight: lineHeights.sm,
    maxWidth: '100%',
    paddingLeft: spacing.md
  },
  chipRemove: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: { default: 'transparent', ':hover': colors.borderMuted },
    borderWidth: 0,
    color: colors.textMuted,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.md,
    justifyContent: 'center',
    minWidth: '24px',
    padding: 0
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: { default: colors.text, '::placeholder': colors.textMuted },
    flex: 1,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    minWidth: '72px',
    outline: 'none',
    padding: spacing.sm
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
    minWidth: '28px',
    padding: 0
  },
  positioner: { zIndex: 1100 },
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
    display: 'grid',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    gap: spacing.md,
    gridTemplateColumns: '16px 1fr',
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

export function MultiSelect({
  description,
  emptyMessage = 'No results found.',
  fullWidth = false,
  inputRef,
  label,
  modal = false,
  options,
  placeholder = 'Search options…',
  ...props
}: MultiSelectProps) {
  const container = useThemePortalContainer();
  const descriptionId = useId();
  const inputId = useId();
  const labelId = useId();
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
        multiple
      >
        <label htmlFor={inputId} id={labelId} {...stylex.props(styles.label)}>
          {label}
        </label>
        <BaseCombobox.InputGroup
          className={(state) =>
            stylex.props(styles.inputGroup, state.disabled && styles.disabledGroup).className
          }
        >
          <BaseCombobox.Chips className={stylex.props(styles.chips).className}>
            <BaseCombobox.Value>
              {(selectedValues: string[]) => (
                <>
                  {selectedValues.map((selectedValue) => {
                    const option = optionsByValue.get(selectedValue);
                    const optionLabel = option?.label ?? selectedValue;
                    return (
                      <BaseCombobox.Chip
                        aria-label={optionLabel}
                        key={selectedValue}
                        className={stylex.props(styles.chip).className}
                      >
                        {optionLabel}
                        <BaseCombobox.ChipRemove
                          aria-label={`Remove ${optionLabel}`}
                          className={stylex.props(styles.chipRemove).className}
                        >
                          ×
                        </BaseCombobox.ChipRemove>
                      </BaseCombobox.Chip>
                    );
                  })}
                  <BaseCombobox.Input
                    aria-describedby={description ? descriptionId : undefined}
                    aria-labelledby={labelId}
                    className={(state) =>
                      stylex.props(styles.input, state.disabled && styles.disabledInput).className
                    }
                    id={inputId}
                    placeholder={selectedValues.length === 0 ? placeholder : ''}
                    ref={inputRef}
                  />
                </>
              )}
            </BaseCombobox.Value>
          </BaseCombobox.Chips>
          <BaseCombobox.Clear
            aria-label="Clear selections"
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
                      <BaseCombobox.ItemIndicator
                        className={stylex.props(styles.indicator).className}
                      >
                        ✓
                      </BaseCombobox.ItemIndicator>
                      {option.label}
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
