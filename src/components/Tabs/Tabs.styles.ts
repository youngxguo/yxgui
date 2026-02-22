import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { borderTokens, spacingTokens, surfaceTokens } from '../../theme/tokens.stylex';

export type TabsOrientation = 'horizontal' | 'vertical';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const tabsStyles = stylex.create({
  root: {
    display: 'grid',
    gap: spacingTokens.md
  },
  list: {
    display: 'inline-flex',
    gap: spacingTokens.xxs,
    padding: spacingTokens.xxs
  },
  listVertical: {
    alignItems: 'stretch',
    display: 'grid',
    width: 'fit-content'
  },
  trigger: {
    justifyContent: 'flex-start'
  },
  triggerSelected: {
    backgroundColor: surfaceTokens.base
  },
  panel: {
    borderColor: borderTokens.muted,
    padding: spacingTokens.lg
  }
});

const orientationListStyles: Record<TabsOrientation, unknown> = {
  horizontal: null,
  vertical: tabsStyles.listVertical
};

export function getTabsRootStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([tabsStyles.root], options);
}

export function getTabsListStyleProps(orientation: TabsOrientation, options?: SlotStyleOptions) {
  return composeStyleProps(
    [tabsStyles.list, pickStyle(orientationListStyles, orientation)],
    options
  );
}

export function getTabsTriggerStyleProps(
  selected: boolean,
  _disabled: boolean,
  options?: SlotStyleOptions
) {
  return composeStyleProps([tabsStyles.trigger, selected && tabsStyles.triggerSelected], options);
}

export function getTabsPanelStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([tabsStyles.panel], options);
}
