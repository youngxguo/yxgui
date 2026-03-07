import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import type { ControlLikeSize } from '../../styles/controlLike';
import { getMenuContentStyleProps, getMenuItemStyleProps } from '../../styles/menu';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { spacingTokens } from '../../theme/tokens/foundationTokens.stylex';
import { borderTokens, colorTokens, surfaceTokens } from '../../theme/tokens/semanticTokens.stylex';

export type ComboboxSize = ControlLikeSize;

interface GetComboboxTriggerRootStylePropsOptions {
  className?: string;
  style?: CSSProperties;
}

interface GetComboboxOptionStylePropsOptions {
  active: boolean;
  selected: boolean;
  className?: string;
  style?: CSSProperties;
}

const comboboxStyles = stylex.create({
  triggerRoot: {
    position: 'relative',
    width: '100%'
  },
  triggerInput: {
    paddingRight: spacingTokens.xl
  },
  triggerIndicator: {
    color: colorTokens.mutedForeground,
    display: 'inline-flex',
    flexShrink: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: spacingTokens.sm,
    top: '50%',
    transform: 'translateY(-50%)',
    transitionDuration: '0.15s',
    transitionProperty: 'transform'
  },
  triggerIndicatorOpen: {
    transform: 'translateY(-50%) rotate(180deg)'
  },
  triggerIndicatorIcon: {
    display: 'block',
    height: spacingTokens.md,
    width: spacingTokens.md
  },
  list: {
    display: 'grid'
  },
  optionLayout: {
    justifyContent: 'space-between'
  },
  optionFocusVisible: {
    ':focus-visible': {
      outlineColor: borderTokens.focus,
      outlineOffset: spacingTokens.xxxs,
      outlineStyle: 'solid',
      outlineWidth: spacingTokens.xxxs
    }
  },
  optionActive: {
    backgroundColor: surfaceTokens.hover
  },
  optionSelected: {
    backgroundColor: surfaceTokens.selected
  },
  optionMeta: {
    color: colorTokens.mutedForeground
  },
  emptyState: {
    padding: `${spacingTokens.xs} ${spacingTokens.md}`
  }
});

export function getComboboxTriggerRootStyleProps({
  className,
  style
}: GetComboboxTriggerRootStylePropsOptions) {
  return composeStyleProps([comboboxStyles.triggerRoot], { className, style });
}

export function getComboboxTriggerInputStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([comboboxStyles.triggerInput], options);
}

export function getComboboxTriggerIndicatorStyleProps(open: boolean) {
  return composeStyleProps(
    [comboboxStyles.triggerIndicator, open && comboboxStyles.triggerIndicatorOpen],
    undefined
  );
}

export function getComboboxTriggerIndicatorIconStyleProps() {
  return composeStyleProps([comboboxStyles.triggerIndicatorIcon], undefined);
}

export function getComboboxContentStyleProps(options?: StyleRecipeOverrides) {
  return getMenuContentStyleProps(options);
}

export function getComboboxListStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([comboboxStyles.list], options);
}

export function getComboboxOptionStyleProps({
  active,
  selected,
  className,
  style
}: GetComboboxOptionStylePropsOptions) {
  return getMenuItemStyleProps(
    { className, style },
    [
      comboboxStyles.optionLayout,
      comboboxStyles.optionFocusVisible,
      active && comboboxStyles.optionActive,
      selected && comboboxStyles.optionSelected
    ],
    false
  );
}

export function getComboboxOptionMetaStyleProps() {
  return composeStyleProps([comboboxStyles.optionMeta], undefined);
}

export function getComboboxEmptyStateStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([comboboxStyles.emptyState], options);
}
