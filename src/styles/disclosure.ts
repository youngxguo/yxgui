import * as stylex from '@stylexjs/stylex';
import { uiPrimitives } from './primitives';
import { composeStyleProps, type StyleRecipeOverrides } from './recipes';
import { spacingTokens, typographyTokens } from '../theme/tokens/foundationTokens.stylex';
import { colorTokens, surfaceTokens } from '../theme/tokens/semanticTokens.stylex';

const disclosureStyles = stylex.create({
  trigger: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    color: colorTokens.foreground,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeMd,
    fontWeight: typographyTokens.fontWeightMedium,
    justifyContent: 'space-between',
    lineHeight: '1.25',
    padding: `${spacingTokens.md} ${spacingTokens.lg}`,
    textAlign: 'left',
    width: '100%'
  },
  triggerGap: {
    gap: spacingTokens.sm
  },
  triggerHover: {
    ':not(:disabled):hover': {
      backgroundColor: surfaceTokens.subtle
    }
  },
  triggerDisabled: {
    cursor: 'not-allowed'
  },
  indicator: {
    color: colorTokens.mutedForeground,
    flexShrink: 0,
    fontFamily: typographyTokens.fontFamilyMono,
    fontSize: typographyTokens.fontSizeSm
  }
});

interface GetDisclosureTriggerStylePropsOptions {
  open: boolean;
  disabled: boolean;
  openStyle?: unknown;
  disabledStyle?: unknown;
  includeGap?: boolean;
  overrides?: StyleRecipeOverrides;
}

export function getDisclosureTriggerStyleProps({
  open,
  disabled,
  openStyle,
  disabledStyle,
  includeGap = false,
  overrides
}: GetDisclosureTriggerStylePropsOptions) {
  return composeStyleProps(
    [
      disclosureStyles.trigger,
      includeGap && disclosureStyles.triggerGap,
      disclosureStyles.triggerHover,
      uiPrimitives.focusVisibleOutline,
      uiPrimitives.interactiveTransition,
      open && openStyle,
      disabled && disclosureStyles.triggerDisabled,
      disabled && disabledStyle
    ],
    overrides
  );
}

export function getDisclosureIndicatorStyleProps(
  extraStyles: ReadonlyArray<unknown> = [],
  overrides?: StyleRecipeOverrides
) {
  return composeStyleProps([disclosureStyles.indicator, ...extraStyles], overrides);
}
