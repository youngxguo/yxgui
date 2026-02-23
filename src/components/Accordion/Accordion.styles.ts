import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import {
  getDisclosureIndicatorStyleProps,
  getDisclosureTriggerStyleProps
} from '../../styles/disclosure';
import {
  borderTokens,
  paletteTokens,
  spacingTokens,
  surfaceTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

const accordionStyles = stylex.create({
  root: {
    display: 'block',
    overflow: 'hidden',
    width: '100%'
  },
  item: {
    borderBottom: `1px solid ${borderTokens.muted}`
  },
  itemLast: {
    ':last-child': {
      borderBottom: 'none'
    }
  },
  itemDisabled: {
    opacity: 0.7
  },
  header: {
    margin: 0
  },
  triggerOpen: {
    backgroundColor: surfaceTokens.selected
  },
  indicatorLineHeight: {
    lineHeight: '1'
  },
  content: {
    color: paletteTokens.mutedForeground
  },
  contentInner: {
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: '1.5',
    padding: `0 ${spacingTokens.lg} ${spacingTokens.lg}`
  }
});

export function getAccordionRootStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([accordionStyles.root], options);
}

export function getAccordionItemStyleProps(disabled: boolean, options?: StyleRecipeOverrides) {
  return composeStyleProps(
    [accordionStyles.item, accordionStyles.itemLast, disabled && accordionStyles.itemDisabled],
    options
  );
}

export function getAccordionHeaderStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([accordionStyles.header], options);
}

export function getAccordionTriggerStyleProps(
  open: boolean,
  disabled: boolean,
  options?: StyleRecipeOverrides
) {
  return getDisclosureTriggerStyleProps({
    open,
    disabled,
    openStyle: accordionStyles.triggerOpen,
    includeGap: true,
    overrides: options
  });
}

export function getAccordionIndicatorStyleProps(options?: StyleRecipeOverrides) {
  return getDisclosureIndicatorStyleProps([accordionStyles.indicatorLineHeight], options);
}

export function getAccordionContentStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([accordionStyles.content], options);
}

export function getAccordionContentInnerStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([accordionStyles.contentInner], options);
}
