import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import * as stylex from '@stylexjs/stylex';
import type { Ref } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type AccordionProps = Omit<BaseAccordion.Root.Props, 'className' | 'render' | 'style'> & {
  ref?: Ref<HTMLDivElement>;
};
export type AccordionItemProps = Omit<
  BaseAccordion.Item.Props,
  'className' | 'render' | 'style'
> & { ref?: Ref<HTMLDivElement> };
export type AccordionHeaderProps = Omit<
  BaseAccordion.Header.Props,
  'className' | 'render' | 'style'
> & { ref?: Ref<HTMLHeadingElement> };
export type AccordionTriggerProps = Omit<
  BaseAccordion.Trigger.Props,
  'className' | 'render' | 'style'
> & { ref?: Ref<HTMLElement> };
export type AccordionPanelProps = Omit<
  BaseAccordion.Panel.Props,
  'className' | 'render' | 'style'
> & { ref?: Ref<HTMLDivElement> };

const styles = stylex.create({
  root: {
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    fontFamily: fontFamilies.sans,
    overflow: 'hidden'
  },
  item: {
    borderTopColor: colors.borderMuted,
    borderTopStyle: 'solid',
    borderTopWidth: '1px'
  },
  firstItem: { borderTopWidth: 0 },
  header: { margin: 0 },
  trigger: {
    alignItems: 'center',
    backgroundColor: { default: colors.surface, ':hover': colors.surfaceSubtle },
    borderWidth: 0,
    color: { default: colors.text, ':disabled': colors.textDisabled },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    justifyContent: 'space-between',
    lineHeight: lineHeights.sm,
    padding: spacing.lg,
    textAlign: 'left',
    width: '100%'
  },
  openTrigger: { backgroundColor: colors.surfaceSubtle },
  arrow: { color: colors.textMuted, display: 'inline-block', transition: 'transform 160ms ease' },
  panel: {
    backgroundColor: colors.surface,
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    padding: spacing.lg
  }
});

export function Accordion(props: AccordionProps) {
  return <BaseAccordion.Root {...props} className={stylex.props(styles.root).className} />;
}

export function AccordionItem(props: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      {...props}
      className={(state) =>
        stylex.props(styles.item, state.index === 0 && styles.firstItem).className
      }
    />
  );
}

export function AccordionHeader(props: AccordionHeaderProps) {
  return <BaseAccordion.Header {...props} className={stylex.props(styles.header).className} />;
}

export function AccordionTrigger({ children, ...props }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Trigger
      {...props}
      className={(state) =>
        stylex.props(styles.trigger, state.open && styles.openTrigger).className
      }
    >
      {children}
      <span aria-hidden="true" {...stylex.props(styles.arrow)}>
        ›
      </span>
    </BaseAccordion.Trigger>
  );
}

export function AccordionPanel(props: AccordionPanelProps) {
  return <BaseAccordion.Panel {...props} className={stylex.props(styles.panel).className} />;
}
