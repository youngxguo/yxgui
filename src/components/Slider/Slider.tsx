import { Slider as BaseSlider } from '@base-ui/react/slider';
import * as stylex from '@stylexjs/stylex';
import type { ReactNode, Ref } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

type SliderValue = number | readonly number[];

export type SliderProps = Omit<
  BaseSlider.Root.Props<SliderValue>,
  'children' | 'className' | 'render' | 'style'
> & {
  label: ReactNode;
  ref?: Ref<HTMLDivElement>;
  showValue?: boolean;
  thumbLabels?: readonly string[];
};

const styles = stylex.create({
  root: {
    display: 'grid',
    fontFamily: fontFamilies.sans,
    gap: spacing.md,
    width: '100%'
  },
  verticalRoot: { height: '180px', width: 'fit-content' },
  header: {
    alignItems: 'center',
    display: 'flex',
    gap: spacing.lg,
    justifyContent: 'space-between'
  },
  label: {
    color: colors.text,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  value: { color: colors.textMuted, fontSize: fontSizes.sm, lineHeight: lineHeights.sm },
  control: {
    alignItems: 'center',
    display: 'flex',
    minHeight: '24px',
    touchAction: 'none',
    width: '100%'
  },
  verticalControl: { height: '100%', minWidth: '24px', width: '24px' },
  track: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radii.full,
    height: '6px',
    position: 'relative',
    width: '100%'
  },
  verticalTrack: { height: '100%', width: '6px' },
  indicator: {
    backgroundColor: colors.primary,
    borderRadius: radii.full
  },
  thumb: {
    backgroundColor: colors.controlThumb,
    borderColor: colors.primary,
    borderRadius: radii.full,
    borderStyle: 'solid',
    borderWidth: '2px',
    boxSizing: 'border-box',
    height: '20px',
    outlineColor: colors.primary,
    outlineOffset: '2px',
    outlineStyle: 'solid',
    outlineWidth: { default: 0, ':focus-within': '2px' },
    width: '20px'
  },
  disabled: { opacity: 0.5 }
});

export function Slider({
  defaultValue,
  disabled = false,
  label,
  orientation = 'horizontal',
  showValue = true,
  thumbLabels,
  value,
  ...props
}: SliderProps) {
  const configuredValue = value ?? defaultValue;
  const thumbCount = Array.isArray(configuredValue) ? Math.max(configuredValue.length, 1) : 1;
  const labelText = typeof label === 'string' ? label : 'Slider value';

  return (
    <BaseSlider.Root
      {...props}
      defaultValue={defaultValue}
      disabled={disabled}
      orientation={orientation}
      value={value}
      className={
        stylex.props(
          styles.root,
          orientation === 'vertical' && styles.verticalRoot,
          disabled && styles.disabled
        ).className
      }
    >
      <div {...stylex.props(styles.header)}>
        <BaseSlider.Label className={stylex.props(styles.label).className}>
          {label}
        </BaseSlider.Label>
        {showValue && <BaseSlider.Value className={stylex.props(styles.value).className} />}
      </div>
      <BaseSlider.Control
        className={
          stylex.props(styles.control, orientation === 'vertical' && styles.verticalControl)
            .className
        }
      >
        <BaseSlider.Track
          className={
            stylex.props(styles.track, orientation === 'vertical' && styles.verticalTrack).className
          }
        >
          <BaseSlider.Indicator className={stylex.props(styles.indicator).className} />
          {Array.from({ length: thumbCount }, (_, index) => (
            <BaseSlider.Thumb
              getAriaLabel={() =>
                thumbLabels?.[index] ?? (thumbCount === 1 ? labelText : `${labelText} ${index + 1}`)
              }
              index={thumbCount > 1 ? index : undefined}
              key={index}
              className={stylex.props(styles.thumb).className}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
