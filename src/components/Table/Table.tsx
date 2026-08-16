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

export type TableProps = Omit<ComponentProps<'table'>, 'className' | 'style'>;
export type TableHeaderProps = Omit<ComponentProps<'thead'>, 'className' | 'style'>;
export type TableBodyProps = Omit<ComponentProps<'tbody'>, 'className' | 'style'>;
export type TableFooterProps = Omit<ComponentProps<'tfoot'>, 'className' | 'style'>;
export type TableRowProps = Omit<ComponentProps<'tr'>, 'className' | 'style'>;
export type TableHeadProps = Omit<ComponentProps<'th'>, 'className' | 'style'> & {
  numeric?: boolean;
};
export type TableCellProps = Omit<ComponentProps<'td'>, 'className' | 'style'> & {
  numeric?: boolean;
};
export type TableCaptionProps = Omit<ComponentProps<'caption'>, 'className' | 'style'>;

const styles = stylex.create({
  table: {
    borderCollapse: 'collapse',
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    width: '100%'
  },
  header: {
    backgroundColor: colors.surfaceSubtle
  },
  footer: {
    backgroundColor: colors.surfaceSubtle,
    fontWeight: fontWeights.semibold
  },
  row: {
    borderBottomColor: colors.borderMuted,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px'
  },
  head: {
    color: colors.textMuted,
    fontWeight: fontWeights.semibold,
    paddingBlock: spacing.md,
    paddingInline: spacing.lg,
    textAlign: 'left',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap'
  },
  cell: {
    paddingBlock: spacing.md,
    paddingInline: spacing.lg,
    textAlign: 'left',
    verticalAlign: 'middle'
  },
  numeric: {
    fontVariantNumeric: 'tabular-nums',
    textAlign: 'right'
  },
  caption: {
    captionSide: 'bottom',
    color: colors.textMuted,
    paddingBlock: spacing.md,
    textAlign: 'left'
  }
});

export function Table(props: TableProps) {
  return <table {...props} {...stylex.props(styles.table)} />;
}

export function TableHeader(props: TableHeaderProps) {
  return <thead {...props} {...stylex.props(styles.header)} />;
}

export function TableBody(props: TableBodyProps) {
  return <tbody {...props} />;
}

export function TableFooter(props: TableFooterProps) {
  return <tfoot {...props} {...stylex.props(styles.footer)} />;
}

export function TableRow(props: TableRowProps) {
  return <tr {...props} {...stylex.props(styles.row)} />;
}

export function TableHead({ numeric = false, scope = 'col', ...props }: TableHeadProps) {
  return <th {...props} scope={scope} {...stylex.props(styles.head, numeric && styles.numeric)} />;
}

export function TableCell({ numeric = false, ...props }: TableCellProps) {
  return <td {...props} {...stylex.props(styles.cell, numeric && styles.numeric)} />;
}

export function TableCaption(props: TableCaptionProps) {
  return <caption {...props} {...stylex.props(styles.caption)} />;
}
