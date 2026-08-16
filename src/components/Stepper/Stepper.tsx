import * as stylex from '@stylexjs/stylex';
import { useState, type ComponentProps, type ReactNode } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperStep = {
  description?: ReactNode;
  disabled?: boolean;
  id: string;
  label: ReactNode;
};
export type StepperProps = Omit<ComponentProps<'nav'>, 'children' | 'className' | 'style'> & {
  defaultStep?: number;
  label: string;
  onStepChange?: (step: number) => void;
  orientation?: StepperOrientation;
  step?: number;
  steps: readonly StepperStep[];
};

const styles = stylex.create({
  list: {
    display: 'flex',
    fontFamily: fontFamilies.sans,
    gap: spacing.lg,
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  horizontal: { alignItems: 'flex-start' },
  vertical: { flexDirection: 'column' },
  item: { display: 'flex', flex: 1, gap: spacing.md, minWidth: 0 },
  marker: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderColor: colors.borderMuted,
    borderRadius: radii.full,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: colors.textMuted,
    display: 'inline-flex',
    flexShrink: 0,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    height: '28px',
    justifyContent: 'center',
    lineHeight: lineHeights.sm,
    width: '28px'
  },
  completeMarker: {
    backgroundColor: colors.success,
    borderColor: colors.success,
    color: colors.onEmphasis
  },
  currentMarker: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    color: colors.onEmphasis
  },
  content: { display: 'grid', gap: spacing.sm, minWidth: 0 },
  control: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: colors.text,
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    padding: 0,
    textAlign: 'left'
  },
  label: {
    color: colors.text,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  disabledLabel: { color: colors.textDisabled },
  description: { color: colors.textMuted, fontSize: fontSizes.sm, lineHeight: lineHeights.sm }
});

function clampStep(step: number, count: number) {
  return Math.min(Math.max(step, 0), Math.max(count - 1, 0));
}

export function Stepper({
  defaultStep = 0,
  label,
  onStepChange,
  orientation = 'horizontal',
  step,
  steps,
  ...props
}: StepperProps) {
  const [uncontrolledStep, setUncontrolledStep] = useState(() =>
    clampStep(defaultStep, steps.length)
  );
  const currentStep = clampStep(step ?? uncontrolledStep, steps.length);

  const select = (nextStep: number, disabled = false) => {
    if (disabled) return;
    if (step === undefined) setUncontrolledStep(nextStep);
    onStepChange?.(nextStep);
  };

  return (
    <nav {...props} aria-label={label}>
      <ol
        {...stylex.props(
          styles.list,
          orientation === 'horizontal' ? styles.horizontal : styles.vertical
        )}
      >
        {steps.map((item, index) => {
          const complete = index < currentStep;
          const current = index === currentStep;
          return (
            <li
              aria-current={current ? 'step' : undefined}
              key={item.id}
              {...stylex.props(styles.item)}
            >
              <span
                aria-hidden="true"
                {...stylex.props(
                  styles.marker,
                  complete && styles.completeMarker,
                  current && styles.currentMarker
                )}
              >
                {complete ? '✓' : index + 1}
              </span>
              <span {...stylex.props(styles.content)}>
                {onStepChange ? (
                  <button
                    disabled={item.disabled}
                    type="button"
                    onClick={() => select(index, item.disabled)}
                    {...stylex.props(styles.control, item.disabled && styles.disabledLabel)}
                  >
                    {item.label}
                  </button>
                ) : (
                  <span {...stylex.props(styles.label, item.disabled && styles.disabledLabel)}>
                    {item.label}
                  </span>
                )}
                {item.description && (
                  <span {...stylex.props(styles.description)}>{item.description}</span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
