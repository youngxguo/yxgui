import {
  createContext,
  useContext,
  type CSSProperties,
  type HTMLAttributes,
  type Ref
} from 'react';
import { assignRef } from '../_internal/refs';
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

const ScrollbarOrientationContext = createContext<ScrollbarOrientation>('vertical');

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
  onScroll,
  ...props
}: ScrollAreaViewportProps) {
  const styleProps = getScrollAreaViewportStyleProps(getStyleOptions({ className, style }));
  return (
    <div
      {...props}
      {...styleProps}
      ref={(node) => {
        assignRef(ref, node);
      }}
      tabIndex={tabIndex}
      onScroll={onScroll}
    />
  );
}

export function ScrollAreaScrollbar({
  ref,
  className,
  style,
  orientation = 'vertical',
  'aria-hidden': ariaHidden = true,
  hidden = true,
  ...props
}: ScrollAreaScrollbarProps) {
  const styleProps = getScrollAreaScrollbarStyleProps(
    orientation,
    getStyleOptions({ className, style })
  );

  return (
    <ScrollbarOrientationContext.Provider value={orientation}>
      <div
        {...props}
        {...styleProps}
        ref={ref}
        aria-hidden={ariaHidden}
        data-orientation={orientation}
        hidden={hidden}
      />
    </ScrollbarOrientationContext.Provider>
  );
}

export function ScrollAreaThumb({
  ref,
  className,
  style,
  hidden = true,
  'aria-hidden': ariaHidden = true,
  ...props
}: ScrollAreaThumbProps) {
  const orientation = useContext(ScrollbarOrientationContext);
  const styleProps = getScrollAreaThumbStyleProps(
    orientation,
    getStyleOptions({ className, style })
  );

  return <div {...props} {...styleProps} ref={ref} hidden={hidden} aria-hidden={ariaHidden} />;
}
