import { Tabs as BaseTabs } from '@base-ui/react/tabs';
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

export type TabsProps = Omit<BaseTabs.Root.Props, 'className' | 'render' | 'style'> & {
  ref?: Ref<HTMLDivElement>;
};
export type TabsListProps = Omit<BaseTabs.List.Props, 'className' | 'render' | 'style'> & {
  ref?: Ref<HTMLDivElement>;
};
export type TabProps = Omit<BaseTabs.Tab.Props, 'className' | 'render' | 'style'> & {
  ref?: Ref<HTMLElement>;
};
export type TabsPanelProps = Omit<BaseTabs.Panel.Props, 'className' | 'render' | 'style'> & {
  ref?: Ref<HTMLDivElement>;
};

const styles = stylex.create({
  root: { display: 'grid', fontFamily: fontFamilies.sans, gap: spacing.lg },
  list: {
    alignItems: 'center',
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'flex',
    gap: spacing.sm,
    padding: spacing.sm
  },
  verticalList: { alignItems: 'stretch', flexDirection: 'column' },
  tab: {
    backgroundColor: { default: 'transparent', ':hover': colors.surfaceSubtle },
    borderColor: 'transparent',
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: { default: colors.textMuted, ':disabled': colors.textDisabled },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    paddingBlock: spacing.md,
    paddingInline: spacing.lg
  },
  activeTab: {
    backgroundColor: colors.surfaceSubtle,
    borderColor: colors.borderMuted,
    color: colors.primary
  },
  panel: {
    color: colors.text,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    outline: 'none'
  }
});

export function Tabs(props: TabsProps) {
  return <BaseTabs.Root {...props} className={stylex.props(styles.root).className} />;
}

export function TabsList({ activateOnFocus = true, ...props }: TabsListProps) {
  return (
    <BaseTabs.List
      {...props}
      activateOnFocus={activateOnFocus}
      className={(state) =>
        stylex.props(styles.list, state.orientation === 'vertical' && styles.verticalList).className
      }
    />
  );
}

export function Tab(props: TabProps) {
  return (
    <BaseTabs.Tab
      {...props}
      className={(state) => stylex.props(styles.tab, state.active && styles.activeTab).className}
    />
  );
}

export function TabsPanel(props: TabsPanelProps) {
  return <BaseTabs.Panel {...props} className={stylex.props(styles.panel).className} />;
}
