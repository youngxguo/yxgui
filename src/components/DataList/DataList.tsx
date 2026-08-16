import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing
} from '../../theme/foundations.stylex';

export type DataListProps = Omit<ComponentProps<'dl'>, 'className' | 'style'>;
export type DataListItemProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type DataListTermProps = Omit<ComponentProps<'dt'>, 'className' | 'style'>;
export type DataListDescriptionProps = Omit<ComponentProps<'dd'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    display: 'grid',
    fontFamily: fontFamilies.sans,
    margin: 0
  },
  item: {
    borderBottomColor: colors.borderMuted,
    borderBottomStyle: 'solid',
    borderBottomWidth: { default: '1px', ':last-child': 0 },
    display: 'grid',
    gap: spacing.sm,
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 640px)': 'minmax(140px, 1fr) minmax(0, 2fr)'
    },
    paddingBlock: spacing.md
  },
  term: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  description: {
    color: colors.text,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0,
    minWidth: 0
  }
});

export function DataList(props: DataListProps) {
  return <dl {...props} {...stylex.props(styles.root)} />;
}

export function DataListItem(props: DataListItemProps) {
  return <div {...props} {...stylex.props(styles.item)} />;
}

export function DataListTerm(props: DataListTermProps) {
  return <dt {...props} {...stylex.props(styles.term)} />;
}

export function DataListDescription(props: DataListDescriptionProps) {
  return <dd {...props} {...stylex.props(styles.description)} />;
}
