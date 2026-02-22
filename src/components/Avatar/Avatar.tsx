import type { HTMLAttributes, Ref } from 'react';
import { useState } from 'react';
import {
  getAvatarFallbackStyleProps,
  getAvatarImageStyleProps,
  getAvatarStyleProps,
  type AvatarShape,
  type AvatarSize
} from './Avatar.styles';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
}

function getInitials(text?: string): string | null {
  const trimmed = text?.trim();

  if (!trimmed) {
    return null;
  }

  const initials = trimmed
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return initials || null;
}

export function Avatar({
  ref,
  src,
  alt,
  size = 'md',
  shape = 'circle',
  className,
  style,
  children,
  ...props
}: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src) && failedSrc !== src;
  const fallbackContent = children ?? getInitials(alt);
  const rootStyleProps = getAvatarStyleProps({ size, shape, className, style });
  const imageStyleProps = getAvatarImageStyleProps();
  const fallbackStyleProps = getAvatarFallbackStyleProps({ size });

  return (
    <span {...props} {...rootStyleProps} ref={ref}>
      {showImage ? (
        <img
          {...imageStyleProps}
          src={src}
          alt={alt ?? ''}
          onError={() => {
            setFailedSrc(src ?? null);
          }}
        />
      ) : (
        <span {...fallbackStyleProps}>{fallbackContent}</span>
      )}
    </span>
  );
}
