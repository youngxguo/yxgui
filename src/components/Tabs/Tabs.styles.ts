import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, pickStyle, type StyleRecipeOverrides } from '../../styles/recipes';
import { spacingTokens } from '../../theme/tokens/foundationTokens.stylex';
import { borderTokens, surfaceTokens } from '../../theme/tokens/semanticTokens.stylex';

export type TabsOrientation = 'horizontal' | 'vertical';

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

export function getTabsRootStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([tabsStyles.root], options);
}

export function getTabsListStyleProps(
  orientation: TabsOrientation,
  options?: StyleRecipeOverrides
) {
  return composeStyleProps(
    [tabsStyles.list, pickStyle(orientationListStyles, orientation)],
    options
  );
}

export function getTabsTriggerStyleProps(
  selected: boolean,
  _disabled: boolean,
  options?: StyleRecipeOverrides
) {
  return composeStyleProps([tabsStyles.trigger, selected && tabsStyles.triggerSelected], options);
}

export function getTabsPanelStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([tabsStyles.panel], options);
}
