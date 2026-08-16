import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
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

type ClosedProps<Props> = Omit<Props, 'className' | 'render' | 'style'>;
type PositionOptions = Pick<
  BasePreviewCard.Positioner.Props,
  'align' | 'alignOffset' | 'side' | 'sideOffset'
>;

export type PreviewCardProps = BasePreviewCard.Root.Props;
export type PreviewCardTriggerProps = ClosedProps<BasePreviewCard.Trigger.Props>;
export type PreviewCardContentProps = ClosedProps<BasePreviewCard.Popup.Props> &
  PositionOptions & { showArrow?: boolean };
export type PreviewCardTitleProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type PreviewCardDescriptionProps = Omit<ComponentProps<'p'>, 'className' | 'style'>;
export type PreviewCardImageProps = Omit<ComponentProps<'img'>, 'className' | 'style'>;

const styles = stylex.create({
  trigger: {
    color: { default: colors.primary, ':hover': colors.primaryHover },
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    outline: { default: 'none', ':focus-visible': `2px solid ${colors.primary}` },
    outlineOffset: '2px',
    textDecoration: 'underline',
    textUnderlineOffset: '2px'
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
    display: 'grid',
    fontFamily: fontFamilies.sans,
    gap: spacing.md,
    maxWidth: 'calc(100vw - 32px)',
    opacity: 1,
    padding: spacing.lg,
    transform: 'scale(1)',
    transformOrigin: 'var(--transform-origin)',
    transition: 'opacity 120ms ease, transform 120ms ease',
    width: '280px'
  },
  transition: { opacity: 0, transform: 'scale(0.98)' },
  arrow: { color: colors.surfaceElevated, display: 'flex' },
  arrowSvg: { display: 'block' },
  image: {
    borderRadius: radii.sm,
    display: 'block',
    height: '120px',
    objectFit: 'cover',
    width: '100%'
  },
  title: {
    color: colors.text,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  }
});

function Arrow() {
  return (
    <BasePreviewCard.Arrow className={stylex.props(styles.arrow).className}>
      <svg
        aria-hidden="true"
        focusable="false"
        height="5"
        viewBox="0 0 10 5"
        width="10"
        {...stylex.props(styles.arrowSvg)}
      >
        <path d="M0 5 5 0l5 5Z" fill="currentColor" />
      </svg>
    </BasePreviewCard.Arrow>
  );
}

export function PreviewCard(props: PreviewCardProps) {
  return <BasePreviewCard.Root {...props} />;
}

export function PreviewCardTrigger(props: PreviewCardTriggerProps) {
  return <BasePreviewCard.Trigger {...props} className={stylex.props(styles.trigger).className} />;
}

export function PreviewCardContent({
  align = 'center',
  alignOffset,
  children,
  showArrow = true,
  side = 'bottom',
  sideOffset = 8,
  ...props
}: PreviewCardContentProps) {
  const container = useThemePortalContainer();

  return (
    <BasePreviewCard.Portal container={container}>
      <BasePreviewCard.Positioner
        align={align}
        alignOffset={alignOffset}
        className={stylex.props(styles.positioner).className}
        side={side}
        sideOffset={sideOffset}
      >
        <BasePreviewCard.Popup
          {...props}
          className={(state) =>
            stylex.props(
              styles.popup,
              (state.transitionStatus === 'starting' || state.transitionStatus === 'ending') &&
                styles.transition
            ).className
          }
        >
          {showArrow && <Arrow />}
          {children}
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
}

export function PreviewCardImage(props: PreviewCardImageProps) {
  return <img {...props} {...stylex.props(styles.image)} />;
}

export function PreviewCardTitle(props: PreviewCardTitleProps) {
  return <div {...props} {...stylex.props(styles.title)} />;
}

export function PreviewCardDescription(props: PreviewCardDescriptionProps) {
  return <p {...props} {...stylex.props(styles.description)} />;
}
