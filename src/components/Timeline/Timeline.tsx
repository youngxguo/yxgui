import * as stylex from '@stylexjs/stylex';
import type { ComponentProps, ReactNode } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type TimelineStatus = 'complete' | 'current' | 'error' | 'upcoming';
export type TimelineItem = {
  dateTime?: string;
  description?: ReactNode;
  id: string;
  status?: TimelineStatus;
  time?: ReactNode;
  title: ReactNode;
};
export type TimelineProps = Omit<ComponentProps<'ol'>, 'children' | 'className' | 'style'> & {
  items: readonly TimelineItem[];
  label?: string;
};

const statusLabels: Record<TimelineStatus, string> = {
  complete: 'Completed',
  current: 'Current',
  error: 'Error',
  upcoming: 'Upcoming'
};

const styles = stylex.create({
  root: {
    fontFamily: fontFamilies.sans,
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  item: {
    display: 'grid',
    gap: spacing.md,
    gridTemplateColumns: '16px minmax(0, 1fr)',
    paddingBottom: spacing.xl
  },
  lastItem: { paddingBottom: 0 },
  rail: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  marker: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.borderMuted,
    borderRadius: radii.full,
    borderStyle: 'solid',
    borderWidth: '2px',
    boxSizing: 'border-box',
    flexShrink: 0,
    height: '12px',
    marginTop: spacing.sm,
    width: '12px'
  },
  complete: { backgroundColor: colors.success, borderColor: colors.success },
  current: { backgroundColor: colors.primary, borderColor: colors.primary },
  error: { backgroundColor: colors.danger, borderColor: colors.danger },
  upcoming: {},
  line: {
    backgroundColor: colors.borderMuted,
    bottom: '-28px',
    left: '7.5px',
    position: 'absolute',
    top: '20px',
    width: '1px'
  },
  content: { display: 'grid', gap: spacing.sm, minWidth: 0 },
  heading: {
    alignItems: 'baseline',
    display: 'flex',
    gap: spacing.md,
    justifyContent: 'space-between'
  },
  title: {
    color: colors.text,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  time: {
    color: colors.textMuted,
    flexShrink: 0,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.sm
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm
  },
  visuallyHidden: {
    borderWidth: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px'
  }
});

export function Timeline({ items, label, ...props }: TimelineProps) {
  return (
    <ol {...props} aria-label={label} {...stylex.props(styles.root)}>
      {items.map((item, index) => {
        const status = item.status ?? 'upcoming';
        const last = index === items.length - 1;
        return (
          <li
            aria-current={status === 'current' ? 'true' : undefined}
            key={item.id}
            {...stylex.props(styles.item, last && styles.lastItem)}
          >
            <span aria-hidden="true" {...stylex.props(styles.rail)}>
              <span {...stylex.props(styles.marker, styles[status])} />
              {!last && <span {...stylex.props(styles.line)} />}
            </span>
            <span {...stylex.props(styles.content)}>
              <span {...stylex.props(styles.visuallyHidden)}>{statusLabels[status]}: </span>
              <span {...stylex.props(styles.heading)}>
                <span {...stylex.props(styles.title)}>{item.title}</span>
                {item.time !== undefined && (
                  <time dateTime={item.dateTime} {...stylex.props(styles.time)}>
                    {item.time}
                  </time>
                )}
              </span>
              {item.description !== undefined && (
                <span {...stylex.props(styles.description)}>{item.description}</span>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
