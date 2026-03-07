import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { getControlLikeStyleProps, type ControlLikeSize } from '../../styles/controlLike';
import { floatingPrimitives } from '../../styles/floating';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { componentSizeTokens } from '../../theme/tokens/componentTokens.stylex';
import {
  radiusTokens,
  shadowTokens,
  spacingTokens,
  typographyTokens
} from '../../theme/tokens/foundationTokens.stylex';
import { borderTokens, colorTokens, surfaceTokens } from '../../theme/tokens/semanticTokens.stylex';

export type ComboboxSize = ControlLikeSize;

interface GetComboboxTriggerStylePropsOptions {
  size: ComboboxSize;
  invalid: boolean;
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
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    gap: spacingTokens.sm,
    justifyContent: 'space-between',
    paddingRight: spacingTokens.sm,
    textAlign: 'left',
    width: '100%'
  },
  triggerLabel: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  triggerPlaceholder: {
    color: colorTokens.mutedForeground
  },
  triggerIndicator: {
    color: colorTokens.mutedForeground,
    flexShrink: 0,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: typographyTokens.lineHeightTight
  },
  sm: {
    fontSize: typographyTokens.fontSizeSm,
    minHeight: componentSizeTokens.sizeMd,
    paddingBottom: spacingTokens.xxs,
    paddingLeft: spacingTokens.sm,
    paddingTop: spacingTokens.xxs
  },
  md: {
    fontSize: typographyTokens.fontSizeMd,
    minHeight: componentSizeTokens.sizeMd,
    paddingBottom: spacingTokens.xs,
    paddingLeft: spacingTokens.lg,
    paddingTop: spacingTokens.xs
  },
  lg: {
    fontSize: typographyTokens.fontSizeLg,
    minHeight: componentSizeTokens.sizeLg,
    paddingBottom: spacingTokens.sm,
    paddingLeft: spacingTokens.xl,
    paddingTop: spacingTokens.sm
  },
  content: {
    backgroundColor: surfaceTokens.base,
    borderColor: borderTokens.muted,
    borderRadius: radiusTokens.md,
    borderStyle: 'solid',
    borderWidth: borderTokens.widthThin,
    boxShadow: shadowTokens.floating,
    display: 'grid',
    gap: spacingTokens.xs,
    padding: spacingTokens.xs
  },
  list: {
    display: 'grid',
    gap: spacingTokens.xxxs
  },
  option: {
    alignItems: 'center',
    appearance: 'none',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: radiusTokens.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: colorTokens.foreground,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: typographyTokens.fontFamily,
    justifyContent: 'space-between',
    minHeight: componentSizeTokens.sizeMd,
    padding: `${spacingTokens.xxs} ${spacingTokens.sm}`,
    textAlign: 'left',
    width: '100%'
  },
  optionActive: {
    backgroundColor: surfaceTokens.hover
  },
  optionSelected: {
    backgroundColor: surfaceTokens.selected
  },
  optionDisabled: {
    ':disabled': {
      color: colorTokens.mutedForeground,
      cursor: 'not-allowed'
    }
  },
  optionFocusVisible: {
    ':focus-visible': {
      backgroundColor: surfaceTokens.accentSubtle,
      outline: 'none'
    }
  },
  optionMeta: {
    color: colorTokens.mutedForeground
  },
  emptyState: {
    padding: `${spacingTokens.xxs} ${spacingTokens.sm}`
  }
});

const comboboxSizeStyles: Record<ComboboxSize, unknown> = {
  sm: comboboxStyles.sm,
  md: comboboxStyles.md,
  lg: comboboxStyles.lg
};

export function getComboboxTriggerStyleProps({
  size,
  invalid,
  className,
  style
}: GetComboboxTriggerStylePropsOptions) {
  return getControlLikeStyleProps({
    size,
    sizeStyles: comboboxSizeStyles,
    invalid,
    baseStyles: [comboboxStyles.triggerRoot],
    includeText: true,
    className,
    style
  });
}

export function getComboboxTriggerLabelStyleProps(placeholder: boolean) {
  return composeStyleProps(
    [comboboxStyles.triggerLabel, placeholder && comboboxStyles.triggerPlaceholder],
    undefined
  );
}

export function getComboboxTriggerIndicatorStyleProps() {
  return composeStyleProps([comboboxStyles.triggerIndicator], undefined);
}

export function getComboboxContentStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([floatingPrimitives.floatingLayer, comboboxStyles.content], options);
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
  return composeStyleProps(
    [
      comboboxStyles.option,
      comboboxStyles.optionDisabled,
      comboboxStyles.optionFocusVisible,
      active && comboboxStyles.optionActive,
      selected && comboboxStyles.optionSelected
    ],
    { className, style }
  );
}

export function getComboboxOptionMetaStyleProps() {
  return composeStyleProps([comboboxStyles.optionMeta], undefined);
}

export function getComboboxEmptyStateStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([comboboxStyles.emptyState], options);
}
