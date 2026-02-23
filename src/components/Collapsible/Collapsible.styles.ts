import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import {
  getDisclosureIndicatorStyleProps,
  getDisclosureTriggerStyleProps
} from '../../styles/disclosure';
import {
  borderTokens,
  colorTokens,
  spacingTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

const collapsibleStyles = stylex.create({
  root: {
    display: 'grid',
    overflow: 'hidden'
  },
  triggerOpen: {
    borderBottom: `1px solid ${borderTokens.muted}`
  },
  triggerDisabled: {
    opacity: 0.65
  },
  content: {
    color: colorTokens.foreground
  },
  contentInner: {
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: typographyTokens.lineHeightRelaxed,
    padding: spacingTokens.lg
  }
});

export function getCollapsibleRootStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([collapsibleStyles.root], options);
}

export function getCollapsibleTriggerStyleProps(
  open: boolean,
  disabled: boolean,
  options?: StyleRecipeOverrides
) {
  return getDisclosureTriggerStyleProps({
    open,
    disabled,
    openStyle: collapsibleStyles.triggerOpen,
    disabledStyle: collapsibleStyles.triggerDisabled,
    overrides: options
  });
}

export function getCollapsibleIndicatorStyleProps(options?: StyleRecipeOverrides) {
  return getDisclosureIndicatorStyleProps([], options);
}

export function getCollapsibleContentStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([collapsibleStyles.content], options);
}

export function getCollapsibleContentInnerStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([collapsibleStyles.contentInner], options);
}
