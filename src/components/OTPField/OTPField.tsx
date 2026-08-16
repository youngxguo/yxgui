import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import * as stylex from '@stylexjs/stylex';
import { useId, type ReactNode } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type OTPFieldProps = Omit<
  BaseOTPField.Root.Props,
  'children' | 'className' | 'length' | 'render' | 'style'
> & {
  description?: ReactNode;
  groupSize?: number;
  label: ReactNode;
  length?: number;
};

const styles = stylex.create({
  field: {
    display: 'grid',
    gap: spacing.sm,
    maxWidth: '100%'
  },
  label: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    gap: spacing.sm,
    maxWidth: '100%'
  },
  slotGroup: {
    alignItems: 'center',
    display: 'flex',
    gap: spacing.sm
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    height: '40px',
    lineHeight: lineHeights.md,
    margin: 0,
    outline: 'none',
    padding: 0,
    textAlign: 'center',
    width: '40px'
  },
  focusedInput: {
    borderColor: colors.primary,
    boxShadow: `0 0 0 1px ${colors.primary}`
  },
  invalidInput: {
    borderColor: colors.danger
  },
  disabledInput: {
    backgroundColor: colors.surfaceDisabled,
    borderColor: colors.borderDisabled,
    color: colors.textDisabled,
    cursor: 'not-allowed'
  },
  separator: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    paddingInline: spacing.sm
  },
  description: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  }
});

export function OTPField({
  'aria-describedby': ariaDescribedBy,
  description,
  groupSize,
  id: providedId,
  label,
  length = 6,
  ...props
}: OTPFieldProps) {
  const generatedId = useId();
  const generatedDescriptionId = useId();
  const id = providedId ?? generatedId;
  const descriptionId = description ? generatedDescriptionId : undefined;
  const describedBy = [ariaDescribedBy, descriptionId].filter(Boolean).join(' ') || undefined;

  return (
    <div {...stylex.props(styles.field)}>
      <label htmlFor={id} {...stylex.props(styles.label)}>
        {label}
      </label>
      <BaseOTPField.Root
        {...props}
        aria-describedby={describedBy}
        id={id}
        length={length}
        className={stylex.props(styles.root).className}
      >
        {Array.from({ length }, (_, index) => (
          <span key={index} {...stylex.props(styles.slotGroup)}>
            {Boolean(groupSize) && index > 0 && index % groupSize! === 0 && (
              <span aria-hidden="true" {...stylex.props(styles.separator)}>
                −
              </span>
            )}
            <BaseOTPField.Input
              aria-describedby={describedBy}
              aria-label={index === 0 ? undefined : `Character ${index + 1} of ${length}`}
              className={(state) =>
                stylex.props(
                  styles.input,
                  state.focused && styles.focusedInput,
                  state.valid === false && styles.invalidInput,
                  state.disabled && styles.disabledInput
                ).className
              }
            />
          </span>
        ))}
      </BaseOTPField.Root>
      {description && (
        <p id={descriptionId} {...stylex.props(styles.description)}>
          {description}
        </p>
      )}
    </div>
  );
}
