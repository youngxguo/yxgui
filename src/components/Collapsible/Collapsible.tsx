import * as stylex from '@stylexjs/stylex';
import { useState, type ComponentProps, type ToggleEvent } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type CollapsibleProps = Omit<
  ComponentProps<'details'>,
  'className' | 'defaultOpen' | 'onToggle' | 'style'
> & {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onToggle?: ComponentProps<'details'>['onToggle'];
};
export type CollapsibleTriggerProps = Omit<ComponentProps<'summary'>, 'className' | 'style'>;
export type CollapsibleContentProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: colors.text,
    fontFamily: fontFamilies.sans
  },
  trigger: {
    cursor: 'pointer',
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    padding: spacing.lg
  },
  content: {
    borderTopColor: colors.borderMuted,
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    padding: spacing.lg
  }
});

export function Collapsible({ defaultOpen, onOpenChange, onToggle, ...props }: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const isControlled = props.open !== undefined;

  function handleToggle(event: ToggleEvent<HTMLDetailsElement>) {
    onToggle?.(event);
    if (event.defaultPrevented) return;
    if (!isControlled) setInternalOpen(event.currentTarget.open);
    onOpenChange?.(event.currentTarget.open);
  }

  return (
    <details
      {...props}
      open={props.open ?? internalOpen}
      onToggle={handleToggle}
      {...stylex.props(styles.root)}
    />
  );
}

export function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  return <summary {...props} {...stylex.props(styles.trigger)} />;
}

export function CollapsibleContent(props: CollapsibleContentProps) {
  return <div {...props} {...stylex.props(styles.content)} />;
}
