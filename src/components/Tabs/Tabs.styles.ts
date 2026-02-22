import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import {
  borderTokens,
  paletteTokens,
  radiusTokens,
  spacingTokens,
  surfaceTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

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
    backgroundColor: surfaceTokens.subtle,
    border: `1px solid ${borderTokens.muted}`,
    borderRadius: radiusTokens.md,
    display: 'inline-flex',
    gap: '0.25rem',
    padding: '0.25rem'
  },
  listVertical: {
    alignItems: 'stretch',
    display: 'grid',
    width: 'fit-content'
  },
  trigger: {
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: radiusTokens.sm,
    color: paletteTokens.foreground,
    cursor: 'pointer',
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    fontWeight: typographyTokens.fontWeightMedium,
    lineHeight: '1.2',
    padding: '0.45rem 0.7rem'
  },
  triggerHover: {
    ':hover': {
      backgroundColor: '#efeee8'
    }
  },
  triggerSelected: {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)'
  },
  triggerDisabled: {
    cursor: 'not-allowed',
    opacity: 0.5
  },
  panel: {
    border: `1px solid ${borderTokens.muted}`,
    borderRadius: radiusTokens.md,
    color: paletteTokens.foreground,
    fontFamily: typographyTokens.fontFamily,
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
  disabled: boolean,
  options?: SlotStyleOptions
) {
  return composeStyleProps(
    [
      tabsStyles.trigger,
      !disabled && tabsStyles.triggerHover,
      selected && tabsStyles.triggerSelected,
      disabled && tabsStyles.triggerDisabled
    ],
    options
  );
}

export function getTabsPanelStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([tabsStyles.panel], options);
}
