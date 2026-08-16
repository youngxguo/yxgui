import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import * as stylex from '@stylexjs/stylex';
import type { ReactNode, Ref } from 'react';
import { colors } from '../../theme/colors.stylex';
import { radii, spacing } from '../../theme/foundations.stylex';

export type ScrollAreaProps = Omit<
  BaseScrollArea.Root.Props,
  'children' | 'className' | 'render' | 'style'
> & {
  children: ReactNode;
  orientation?: 'vertical' | 'horizontal' | 'both';
  ref?: Ref<HTMLDivElement>;
  size?: 'sm' | 'md' | 'lg';
};

const styles = stylex.create({
  root: {
    backgroundColor: colors.surface,
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  },
  sm: { height: '120px' },
  md: { height: '180px' },
  lg: { height: '240px' },
  viewport: {
    height: '100%',
    overscrollBehavior: 'contain',
    width: '100%'
  },
  content: {
    boxSizing: 'border-box',
    minWidth: '100%',
    padding: spacing.lg
  },
  horizontalContent: {
    width: 'max-content'
  },
  scrollbar: {
    display: 'flex',
    padding: '2px',
    position: 'absolute',
    touchAction: 'none',
    userSelect: 'none'
  },
  verticalScrollbar: {
    bottom: 0,
    right: 0,
    top: 0,
    width: '10px'
  },
  horizontalScrollbar: {
    bottom: 0,
    height: '10px',
    left: 0,
    right: 0
  },
  verticalThumb: {
    backgroundColor: colors.border,
    borderRadius: radii.full,
    flex: 1,
    minHeight: '24px'
  },
  horizontalThumb: {
    backgroundColor: colors.border,
    borderRadius: radii.full,
    flex: 1,
    minWidth: '24px'
  },
  corner: {
    backgroundColor: colors.surfaceSubtle
  }
});

export function ScrollArea({
  children,
  orientation = 'vertical',
  size = 'md',
  ...props
}: ScrollAreaProps) {
  const horizontal = orientation === 'horizontal' || orientation === 'both';
  const vertical = orientation === 'vertical' || orientation === 'both';

  return (
    <BaseScrollArea.Root {...props} className={stylex.props(styles.root, styles[size]).className}>
      <BaseScrollArea.Viewport className={stylex.props(styles.viewport).className}>
        <BaseScrollArea.Content
          className={stylex.props(styles.content, horizontal && styles.horizontalContent).className}
        >
          {children}
        </BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      {vertical && (
        <BaseScrollArea.Scrollbar
          className={stylex.props(styles.scrollbar, styles.verticalScrollbar).className}
          orientation="vertical"
        >
          <BaseScrollArea.Thumb className={stylex.props(styles.verticalThumb).className} />
        </BaseScrollArea.Scrollbar>
      )}
      {horizontal && (
        <BaseScrollArea.Scrollbar
          className={stylex.props(styles.scrollbar, styles.horizontalScrollbar).className}
          orientation="horizontal"
        >
          <BaseScrollArea.Thumb className={stylex.props(styles.horizontalThumb).className} />
        </BaseScrollArea.Scrollbar>
      )}
      {orientation === 'both' && (
        <BaseScrollArea.Corner className={stylex.props(styles.corner).className} />
      )}
    </BaseScrollArea.Root>
  );
}
