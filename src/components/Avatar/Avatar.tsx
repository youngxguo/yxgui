import * as stylex from '@stylexjs/stylex';
import { createContext, useContext, useState, type ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import { fontFamilies, fontSizes, fontWeights, radii } from '../../theme/foundations.stylex';

export type AvatarShape = 'circle' | 'rounded';
export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarProps = Omit<ComponentProps<'span'>, 'children' | 'className' | 'style'> & {
  alt: string;
  fallback?: string;
  loading?: 'eager' | 'lazy';
  onImageError?: ComponentProps<'img'>['onError'];
  shape?: AvatarShape;
  size?: AvatarSize;
  src?: string;
};
export type AvatarGroupProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  shape?: AvatarShape;
  size?: AvatarSize;
};
export type AvatarGroupOverflowProps = Omit<
  ComponentProps<'span'>,
  'children' | 'className' | 'style'
> & {
  count: number;
};

type AvatarGroupContextValue = { grouped: boolean; shape: AvatarShape; size: AvatarSize };

const AvatarGroupContext = createContext<AvatarGroupContextValue>({
  grouped: false,
  shape: 'circle',
  size: 'md'
});

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
  },
  grouped: { boxShadow: `0 0 0 2px ${colors.surfaceElevated}` },
  group: { alignItems: 'center', display: 'inline-flex' },
  groupSm: { paddingInlineStart: '6px' },
  groupMd: { paddingInlineStart: '8px' },
  groupLg: { paddingInlineStart: '10px' },
  memberSm: { marginInlineStart: '-6px' },
  memberMd: { marginInlineStart: '-8px' },
  memberLg: { marginInlineStart: '-10px' }
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
  shape,
  size,
  src,
  ...props
}: AvatarProps) {
  const group = useContext(AvatarGroupContext);
  const [failedSrc, setFailedSrc] = useState<string>();
  const showImage = src !== undefined && failedSrc !== src;
  const resolvedShape = shape ?? group.shape;
  const resolvedSize = size ?? group.size;

  return (
    <span
      {...props}
      aria-label={showImage ? undefined : alt}
      role={showImage ? undefined : 'img'}
      {...stylex.props(
        styles.root,
        styles[resolvedShape],
        styles[resolvedSize],
        group.grouped && styles.grouped,
        group.grouped && styles[`member${capitalize(resolvedSize)}`]
      )}
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

function capitalize(value: AvatarSize) {
  return `${value[0].toUpperCase()}${value.slice(1)}` as 'Sm' | 'Md' | 'Lg';
}

export function AvatarGroup({
  shape = 'circle',
  size = 'md',
  role = 'group',
  ...props
}: AvatarGroupProps) {
  return (
    <AvatarGroupContext.Provider value={{ grouped: true, shape, size }}>
      <div
        {...props}
        role={role}
        {...stylex.props(styles.group, styles[`group${capitalize(size)}`])}
      />
    </AvatarGroupContext.Provider>
  );
}

export function AvatarGroupOverflow({
  'aria-label': ariaLabel,
  count,
  role = 'img',
  ...props
}: AvatarGroupOverflowProps) {
  const group = useContext(AvatarGroupContext);
  return (
    <span
      {...props}
      aria-label={ariaLabel ?? `${count} more`}
      role={role}
      {...stylex.props(
        styles.root,
        styles[group.shape],
        styles[group.size],
        group.grouped && styles.grouped,
        group.grouped && styles[`member${capitalize(group.size)}`]
      )}
    >
      <span aria-hidden="true">+{count}</span>
    </span>
  );
}
