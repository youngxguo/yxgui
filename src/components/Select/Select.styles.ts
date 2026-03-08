import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { getControlLikeStyleProps, type ControlLikeSize } from '../../styles/controlLike';
import { getMenuContentStyleProps, getMenuItemStyleProps } from '../../styles/menu';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { spacingTokens, typographyTokens } from '../../theme/tokens/foundationTokens.stylex';
import { componentSizeTokens } from '../../theme/tokens/componentTokens.stylex';
import { colorTokens, surfaceTokens } from '../../theme/tokens/semanticTokens.stylex';

export type SelectSize = ControlLikeSize;

interface GetSelectTriggerStylePropsOptions {
  size: SelectSize;
  invalid: boolean;
  open: boolean;
  className?: string;
  style?: CSSProperties;
}

interface GetSelectOptionStylePropsOptions {
  active: boolean;
  selected: boolean;
  className?: string;
  style?: CSSProperties;
}

const selectStyles = stylex.create({
  trigger: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'left'
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
  triggerOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  triggerLabel: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  triggerLabelPlaceholder: {
    color: colorTokens.mutedForeground
  },
  triggerIndicator: {
    color: colorTokens.mutedForeground,
    display: 'inline-flex',
    flexShrink: 0,
    marginLeft: spacingTokens.sm,
    pointerEvents: 'none',
    transitionDuration: '0.15s',
    transitionProperty: 'transform'
  },
  triggerIndicatorOpen: {
    transform: 'rotate(180deg)'
  },
  triggerIndicatorIcon: {
    display: 'block',
    height: spacingTokens.md,
    width: spacingTokens.md
  },
  optionLayout: {
    justifyContent: 'space-between'
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
  hiddenSelect: {
    height: 0,
    left: 0,
    opacity: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    width: 0
  }
});

const selectSizeStyles: Record<SelectSize, stylex.StaticStyles> = {
  sm: selectStyles.sm,
  md: selectStyles.md,
  lg: selectStyles.lg
};

export function getSelectTriggerStyleProps({
  size,
  invalid,
  open,
  className,
  style
}: GetSelectTriggerStylePropsOptions) {
  return getControlLikeStyleProps({
    size,
    sizeStyles: selectSizeStyles,
    invalid,
    baseStyles: [selectStyles.trigger, open && selectStyles.triggerOpen],
    className,
    style
  });
}

export function getSelectTriggerLabelStyleProps(placeholder: boolean) {
  return composeStyleProps(
    [selectStyles.triggerLabel, placeholder && selectStyles.triggerLabelPlaceholder],
    undefined
  );
}

export function getSelectTriggerIndicatorStyleProps(open: boolean) {
  return composeStyleProps(
    [selectStyles.triggerIndicator, open && selectStyles.triggerIndicatorOpen],
    undefined
  );
}

export function getSelectTriggerIndicatorIconStyleProps() {
  return composeStyleProps([selectStyles.triggerIndicatorIcon], undefined);
}

export function getSelectContentStyleProps(options?: StyleRecipeOverrides) {
  return getMenuContentStyleProps(options);
}

export function getSelectOptionStyleProps({
  active,
  selected,
  className,
  style
}: GetSelectOptionStylePropsOptions) {
  return getMenuItemStyleProps({ className, style }, [
    selectStyles.optionLayout,
    active && selectStyles.optionActive,
    selected && selectStyles.optionSelected
  ]);
}

export function getSelectOptionMetaStyleProps() {
  return composeStyleProps([selectStyles.optionMeta], undefined);
}

export function getSelectHiddenSelectStyleProps() {
  return composeStyleProps([selectStyles.hiddenSelect], undefined);
}
