import * as stylex from '@stylexjs/stylex';
import { useId, type ComponentProps, type ReactNode } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type ListboxProps = Omit<ComponentProps<'select'>, 'className' | 'style'> & {
  description?: ReactNode;
  error?: ReactNode;
  fullWidth?: boolean;
  label: ReactNode;
};

export type ListboxOptionProps = Omit<ComponentProps<'option'>, 'className' | 'style'>;

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
  control: {
    backgroundColor: { default: colors.surface, ':disabled': colors.surfaceDisabled },
    borderColor: { default: colors.border, ':disabled': colors.borderDisabled },
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: { default: colors.text, ':disabled': colors.textDisabled },
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    minHeight: '132px',
    outline: { default: 'none', ':focus-visible': `2px solid ${colors.primary}` },
    outlineOffset: '1px',
    padding: spacing.sm,
    width: '100%'
  },
  invalid: { borderColor: colors.danger },
  option: {
    borderRadius: radii.sm,
    paddingBlock: spacing.md,
    paddingInline: spacing.md
  },
  description: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  },
  error: {
    color: colors.danger,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  }
});

export function Listbox({
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  description,
  error,
  fullWidth = false,
  id,
  label,
  size = 5,
  ...props
}: ListboxProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const descriptionId = `${controlId}-description`;
  const errorId = `${controlId}-error`;
  const describedBy = [ariaDescribedBy, description ? descriptionId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ');
  const invalid =
    Boolean(error) ||
    (ariaInvalid !== undefined && ariaInvalid !== false && ariaInvalid !== 'false');

  return (
    <div {...stylex.props(styles.field, fullWidth && styles.fullWidth)}>
      <label htmlFor={controlId} {...stylex.props(styles.label)}>
        {label}
      </label>
      <select
        {...props}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : ariaInvalid}
        id={controlId}
        size={size}
        {...stylex.props(styles.control, invalid && styles.invalid)}
      />
      {description ? (
        <p id={descriptionId} {...stylex.props(styles.description)}>
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} {...stylex.props(styles.error)}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ListboxOption(props: ListboxOptionProps) {
  return <option {...props} {...stylex.props(styles.option)} />;
}
