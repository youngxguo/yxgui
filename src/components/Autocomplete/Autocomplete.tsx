import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
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

export type AutocompleteOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

export type AutocompleteProps = Omit<
  BaseAutocomplete.Root.Props<string>,
  'children' | 'inputRef' | 'itemToStringValue' | 'items'
> & {
  description?: ReactNode;
  emptyMessage?: ReactNode;
  fullWidth?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  label: ReactNode;
  options: readonly AutocompleteOption[];
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
    paddingInline: spacing.md
  },
  disabledInput: { color: colors.textDisabled },
  clear: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: { default: 'transparent', ':hover': colors.surfaceSubtle },
    borderWidth: 0,
    color: colors.textMuted,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.md,
    justifyContent: 'center',
    minWidth: '34px',
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
    borderRadius: radii.sm,
    color: { default: colors.text, ':disabled': colors.textDisabled },
    cursor: { default: 'default', ':disabled': 'not-allowed' },
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    outline: 'none',
    paddingBlock: spacing.md,
    paddingInline: spacing.md,
    userSelect: 'none'
  },
  highlightedItem: { backgroundColor: colors.surfaceSubtle },
  empty: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingBlock: spacing.md,
    paddingInline: spacing.md
  }
});

export function Autocomplete({
  autoHighlight = true,
  description,
  emptyMessage = 'No suggestions found.',
  fullWidth = false,
  inputRef,
  label,
  modal = false,
  openOnInputClick = true,
  options,
  placeholder = 'Type to search…',
  ...props
}: AutocompleteProps) {
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
      <BaseAutocomplete.Root
        {...props}
        autoHighlight={autoHighlight}
        itemToStringValue={(value) => optionsByValue.get(value)?.label ?? value}
        items={values}
        modal={modal}
        openOnInputClick={openOnInputClick}
      >
        <label htmlFor={inputId} id={labelId} {...stylex.props(styles.label)}>
          {label}
        </label>
        <BaseAutocomplete.InputGroup
          className={(state) =>
            stylex.props(styles.inputGroup, state.disabled && styles.disabledGroup).className
          }
        >
          <BaseAutocomplete.Input
            aria-describedby={description ? descriptionId : undefined}
            aria-labelledby={labelId}
            className={(state) =>
              stylex.props(styles.input, state.disabled && styles.disabledInput).className
            }
            id={inputId}
            placeholder={placeholder}
            ref={inputRef}
          />
          <BaseAutocomplete.Clear
            aria-label="Clear value"
            className={stylex.props(styles.clear).className}
          >
            ×
          </BaseAutocomplete.Clear>
        </BaseAutocomplete.InputGroup>
        {description && (
          <p id={descriptionId} {...stylex.props(styles.description)}>
            {description}
          </p>
        )}
        <BaseAutocomplete.Portal container={container}>
          <BaseAutocomplete.Positioner
            align="start"
            className={stylex.props(styles.positioner).className}
            sideOffset={4}
          >
            <BaseAutocomplete.Popup
              className={(state) =>
                stylex.props(
                  styles.popup,
                  (state.transitionStatus === 'starting' || state.transitionStatus === 'ending') &&
                    styles.transition
                ).className
              }
            >
              <BaseAutocomplete.Empty className={stylex.props(styles.empty).className}>
                {emptyMessage}
              </BaseAutocomplete.Empty>
              <BaseAutocomplete.List>
                {(value: string) => {
                  const option = optionsByValue.get(value);
                  if (!option) return null;

                  return (
                    <BaseAutocomplete.Item
                      key={option.value}
                      disabled={option.disabled}
                      value={option.value}
                      className={(state) =>
                        stylex.props(styles.item, state.highlighted && styles.highlightedItem)
                          .className
                      }
                    >
                      {option.label}
                    </BaseAutocomplete.Item>
                  );
                }}
              </BaseAutocomplete.List>
            </BaseAutocomplete.Popup>
          </BaseAutocomplete.Positioner>
        </BaseAutocomplete.Portal>
      </BaseAutocomplete.Root>
    </div>
  );
}
