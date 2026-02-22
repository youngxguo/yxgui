import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import { stylexVars as vars } from '../../theme/stylexVars.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const cardStyles = stylex.create({
  root: {
    backgroundColor: vars.surfaceElevated,
    borderColor: vars.borderDefault,
    borderRadius: vars.radiusMd,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: vars.componentsCardShadow,
    color: vars.paletteForeground,
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacingXs,
    padding: vars.spacingLg
  },
  title: {
    fontFamily: vars.typographyFontFamily,
    fontSize: vars.typographyFontSizeLg,
    fontWeight: vars.typographyFontWeightStrong,
    lineHeight: '1.2',
    margin: 0
  },
  description: {
    color: vars.paletteMutedForeground,
    fontFamily: vars.typographyFontFamily,
    fontSize: vars.typographyFontSizeSm,
    lineHeight: '1.4',
    margin: 0
  },
  content: {
    fontFamily: vars.typographyFontFamily,
    padding: `0 ${vars.spacingLg} ${vars.spacingLg}`
  },
  footer: {
    alignItems: 'center',
    display: 'flex',
    gap: vars.spacingSm,
    justifyContent: 'flex-end',
    padding: `0 ${vars.spacingLg} ${vars.spacingLg}`
  }
});

export function getCardRootStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([cardStyles.root], options);
}

export function getCardHeaderStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([cardStyles.header], options);
}

export function getCardTitleStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([cardStyles.title], options);
}

export function getCardDescriptionStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([cardStyles.description], options);
}

export function getCardContentStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([cardStyles.content], options);
}

export function getCardFooterStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([cardStyles.footer], options);
}
