import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import {
  borderTokens,
  colorTokens,
  radiusTokens,
  spacingTokens,
  surfaceTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarShape = 'circle' | 'rounded' | 'square';

interface GetAvatarStylePropsOptions {
  size: AvatarSize;
  shape: AvatarShape;
  className?: string;
  style?: CSSProperties;
}

interface GetAvatarFallbackStylePropsOptions {
  size: AvatarSize;
}

const avatarStyles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: surfaceTokens.subtle,
    borderColor: borderTokens.muted,
    borderRadius: radiusTokens.pill,
    borderStyle: 'solid',
    borderWidth: borderTokens.widthThin,
    color: colorTokens.mutedForeground,
    display: 'inline-flex',
    flexShrink: 0,
    fontFamily: typographyTokens.fontFamily,
    fontWeight: typographyTokens.fontWeightStrong,
    justifyContent: 'center',
    lineHeight: typographyTokens.lineHeightTight,
    overflow: 'hidden',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'middle'
  },
  sm: {
    fontSize: typographyTokens.fontSizeSm,
    height: spacingTokens.xxxl,
    width: spacingTokens.xxxl
  },
  md: {
    fontSize: typographyTokens.fontSizeMd,
    height: spacingTokens.xxxxl,
    width: spacingTokens.xxxxl
  },
  lg: {
    fontSize: typographyTokens.fontSizeLg,
    height: spacingTokens.xxxxxl,
    width: spacingTokens.xxxxxl
  },
  circle: {
    borderRadius: radiusTokens.pill
  },
  rounded: {
    borderRadius: radiusTokens.lg
  },
  square: {
    borderRadius: radiusTokens.sm
  },
  image: {
    display: 'block',
    height: '100%',
    objectFit: 'cover',
    width: '100%'
  },
  fallback: {
    alignItems: 'center',
    display: 'inline-flex',
    height: '100%',
    justifyContent: 'center',
    textTransform: 'uppercase',
    width: '100%'
  },
  fallbackSm: {
    letterSpacing: '0.01em'
  },
  fallbackMd: {
    letterSpacing: '0.015em'
  },
  fallbackLg: {
    letterSpacing: '0.02em'
  }
});

const avatarSizeStyles: Record<AvatarSize, unknown> = {
  sm: avatarStyles.sm,
  md: avatarStyles.md,
  lg: avatarStyles.lg
};

const avatarShapeStyles: Record<AvatarShape, unknown> = {
  circle: avatarStyles.circle,
  rounded: avatarStyles.rounded,
  square: avatarStyles.square
};

const avatarFallbackSizeStyles: Record<AvatarSize, unknown> = {
  sm: avatarStyles.fallbackSm,
  md: avatarStyles.fallbackMd,
  lg: avatarStyles.fallbackLg
};

export function getAvatarStyleProps({ size, shape, className, style }: GetAvatarStylePropsOptions) {
  return composeStyleProps(
    [avatarStyles.root, pickStyle(avatarSizeStyles, size), pickStyle(avatarShapeStyles, shape)],
    { className, style }
  );
}

export function getAvatarImageStyleProps() {
  return composeStyleProps([avatarStyles.image]);
}

export function getAvatarFallbackStyleProps({ size }: GetAvatarFallbackStylePropsOptions) {
  return composeStyleProps([avatarStyles.fallback, pickStyle(avatarFallbackSizeStyles, size)]);
}
