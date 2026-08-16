import * as stylex from '@stylexjs/stylex';
import type { ComponentProps, ReactNode } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';
import { CopyButton } from '../CopyButton';

export type CodeBlockProps = Omit<ComponentProps<'figure'>, 'children' | 'className' | 'style'> & {
  code: string;
  copyLabel?: string;
  copyable?: boolean;
  label?: ReactNode;
  language?: string;
  wrap?: boolean;
};

const styles = stylex.create({
  root: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    margin: 0,
    maxWidth: '100%',
    overflow: 'hidden'
  },
  header: {
    alignItems: 'center',
    borderBottomColor: colors.borderMuted,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    display: 'flex',
    fontFamily: fontFamilies.sans,
    gap: spacing.md,
    justifyContent: 'space-between',
    minHeight: '38px',
    paddingInlineStart: spacing.lg
  },
  metadata: {
    color: colors.textMuted,
    display: 'flex',
    fontSize: fontSizes.sm,
    gap: spacing.md,
    lineHeight: lineHeights.sm,
    minWidth: 0
  },
  label: { color: colors.text },
  language: { textTransform: 'uppercase' },
  pre: {
    color: colors.text,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0,
    overflow: 'auto',
    padding: spacing.lg,
    tabSize: 2,
    whiteSpace: 'pre'
  },
  wrap: { overflowWrap: 'anywhere', whiteSpace: 'pre-wrap' }
});

export function CodeBlock({
  code,
  copyLabel = 'Copy code',
  copyable = true,
  label,
  language,
  wrap = false,
  ...props
}: CodeBlockProps) {
  const hasHeader = Boolean(label || language || copyable);
  return (
    <figure {...props} {...stylex.props(styles.root)}>
      {hasHeader && (
        <figcaption {...stylex.props(styles.header)}>
          <span {...stylex.props(styles.metadata)}>
            {label && <span {...stylex.props(styles.label)}>{label}</span>}
            {language && <span {...stylex.props(styles.language)}>{language}</span>}
          </span>
          {copyable && <CopyButton label={copyLabel} value={code} />}
        </figcaption>
      )}
      <pre tabIndex={0} {...stylex.props(styles.pre, wrap && styles.wrap)}>
        <code>{code}</code>
      </pre>
    </figure>
  );
}
