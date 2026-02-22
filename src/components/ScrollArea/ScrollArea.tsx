import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import {
  getScrollAreaRootStyleProps,
  getScrollAreaScrollbarStyleProps,
  getScrollAreaThumbStyleProps,
  getScrollAreaViewportStyleProps,
  type ScrollbarOrientation
} from './ScrollArea.styles';

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

export interface ScrollAreaViewportProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

export interface ScrollAreaScrollbarProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
  orientation?: ScrollbarOrientation;
}

export interface ScrollAreaThumbProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

function getStyleOptions({ className, style }: BaseStyleProps) {
  return { className, style };
}

export function ScrollArea({ ref, className, style, ...props }: ScrollAreaProps) {
  const styleProps = getScrollAreaRootStyleProps(getStyleOptions({ className, style }));
  return <div {...props} {...styleProps} ref={ref} />;
}

export function ScrollAreaViewport({
  ref,
  className,
  style,
  tabIndex = 0,
  ...props
}: ScrollAreaViewportProps) {
  const styleProps = getScrollAreaViewportStyleProps(getStyleOptions({ className, style }));
  return <div {...props} {...styleProps} ref={ref} tabIndex={tabIndex} />;
}

export function ScrollAreaScrollbar({
  ref,
  className,
  style,
  orientation = 'vertical',
  'aria-hidden': ariaHidden = true,
  ...props
}: ScrollAreaScrollbarProps) {
  const styleProps = getScrollAreaScrollbarStyleProps(
    orientation,
    getStyleOptions({ className, style })
  );
  return (
    <div
      {...props}
      {...styleProps}
      ref={ref}
      aria-hidden={ariaHidden}
      data-orientation={orientation}
    />
  );
}

export function ScrollAreaThumb({ ref, className, style, ...props }: ScrollAreaThumbProps) {
  const styleProps = getScrollAreaThumbStyleProps(getStyleOptions({ className, style }));
  return <div {...props} {...styleProps} ref={ref} />;
}
