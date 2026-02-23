import type { CSSProperties } from 'react';
import {
  getButtonLikeStyleProps,
  type ButtonLikeSize,
  type ButtonLikeVariant
} from '../../styles/buttonLike';

export type ButtonVariant = ButtonLikeVariant;
export type ButtonSize = ButtonLikeSize;

interface GetButtonStylePropsOptions {
  variant: ButtonVariant;
  size: ButtonSize;
  className?: string;
  style?: CSSProperties;
}

export function getButtonStyleProps({
  variant,
  size,
  className,
  style
}: GetButtonStylePropsOptions) {
  return getButtonLikeStyleProps({
    variant,
    size,
    focusRing: 'menuitemSafe',
    className,
    style
  });
}
