import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import { type ThemeCSSVariableRef } from '../../theme/vars.stylex';

const varBorderDefault = 'var(--yxgui-border-default)' as ThemeCSSVariableRef;
const varComponentsCardShadow = 'var(--yxgui-components-card-shadow)' as ThemeCSSVariableRef;
const varPaletteForeground = 'var(--yxgui-palette-foreground)' as ThemeCSSVariableRef;
const varPaletteMutedForeground = 'var(--yxgui-palette-muted-foreground)' as ThemeCSSVariableRef;
const varRadiusLg = 'var(--yxgui-radius-lg)' as ThemeCSSVariableRef;
const varSpacingLg = 'var(--yxgui-spacing-lg)' as ThemeCSSVariableRef;
const varSpacingSm = 'var(--yxgui-spacing-sm)' as ThemeCSSVariableRef;
const varSpacingXs = 'var(--yxgui-spacing-xs)' as ThemeCSSVariableRef;
const varSurfaceElevated = 'var(--yxgui-surface-elevated)' as ThemeCSSVariableRef;
const varTypographyFontFamily = 'var(--yxgui-typography-font-family)' as ThemeCSSVariableRef;
const varTypographyFontSizeLg = 'var(--yxgui-typography-font-size-lg)' as ThemeCSSVariableRef;
const varTypographyFontSizeSm = 'var(--yxgui-typography-font-size-sm)' as ThemeCSSVariableRef;
const varTypographyFontWeightStrong =
  'var(--yxgui-typography-font-weight-strong)' as ThemeCSSVariableRef;

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const cardStyles = stylex.create({
  root: {
    backgroundColor: varSurfaceElevated,
    borderColor: varBorderDefault,
    borderRadius: varRadiusLg,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: varComponentsCardShadow,
    color: varPaletteForeground,
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: varSpacingXs,
    padding: varSpacingLg
  },
  title: {
    fontFamily: varTypographyFontFamily,
    fontSize: varTypographyFontSizeLg,
    fontWeight: varTypographyFontWeightStrong,
    lineHeight: '1.2',
    margin: 0
  },
  description: {
    color: varPaletteMutedForeground,
    fontFamily: varTypographyFontFamily,
    fontSize: varTypographyFontSizeSm,
    lineHeight: '1.4',
    margin: 0
  },
  content: {
    fontFamily: varTypographyFontFamily,
    padding: `0 ${varSpacingLg} ${varSpacingLg}`
  },
  footer: {
    alignItems: 'center',
    display: 'flex',
    gap: varSpacingSm,
    justifyContent: 'flex-end',
    padding: `0 ${varSpacingLg} ${varSpacingLg}`
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
