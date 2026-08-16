import * as stylex from '@stylexjs/stylex';
import { useState, type ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import { fontFamilies, fontSizes, fontWeights, radii } from '../../theme/foundations.stylex';

export type AvatarProps = Omit<ComponentProps<'span'>, 'children' | 'className' | 'style'> & {
  alt: string;
  fallback?: string;
  loading?: 'eager' | 'lazy';
  onImageError?: ComponentProps<'img'>['onError'];
  shape?: 'circle' | 'rounded';
  size?: 'sm' | 'md' | 'lg';
  src?: string;
};

const styles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderColor: colors.borderMuted,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: colors.textMuted,
    display: 'inline-flex',
    flexShrink: 0,
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.semibold,
    justifyContent: 'center',
    overflow: 'hidden',
    userSelect: 'none'
  },
  circle: {
    borderRadius: radii.full
  },
  rounded: {
    borderRadius: radii.md
  },
  sm: {
    fontSize: fontSizes.xs,
    height: '24px',
    width: '24px'
  },
  md: {
    fontSize: fontSizes.sm,
    height: '32px',
    width: '32px'
  },
  lg: {
    fontSize: fontSizes.md,
    height: '40px',
    width: '40px'
  },
  image: {
    display: 'block',
    height: '100%',
    objectFit: 'cover',
    width: '100%'
  }
});

function getInitials(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function Avatar({
  alt,
  fallback,
  loading = 'lazy',
  onImageError,
  shape = 'circle',
  size = 'md',
  src,
  ...props
}: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const showImage = src !== undefined && failedSrc !== src;

  return (
    <span
      {...props}
      aria-label={showImage ? undefined : alt}
      role={showImage ? undefined : 'img'}
      {...stylex.props(styles.root, styles[shape], styles[size])}
    >
      {showImage ? (
        <img
          alt={alt}
          loading={loading}
          src={src}
          onError={(event) => {
            setFailedSrc(src);
            onImageError?.(event);
          }}
          {...stylex.props(styles.image)}
        />
      ) : (
        <span aria-hidden="true">{fallback ?? getInitials(alt)}</span>
      )}
    </span>
  );
}
