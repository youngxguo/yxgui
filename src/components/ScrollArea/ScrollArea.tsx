import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useRef,
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

interface ScrollAreaContextValue {
  registerViewport: (node: HTMLDivElement | null) => void;
  registerScrollbar: (orientation: ScrollbarOrientation, node: HTMLDivElement | null) => void;
  registerThumb: (orientation: ScrollbarOrientation, node: HTMLDivElement | null) => void;
  scheduleSync: () => void;
}

const ScrollAreaContext = createContext<ScrollAreaContextValue | null>(null);
const ScrollbarOrientationContext = createContext<ScrollbarOrientation | null>(null);

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

function getNumericStyleValue(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getTrackInnerSize(track: HTMLDivElement, orientation: ScrollbarOrientation) {
  const computed = window.getComputedStyle(track);
  const totalPadding =
    orientation === 'vertical'
      ? getNumericStyleValue(computed.paddingTop) + getNumericStyleValue(computed.paddingBottom)
      : getNumericStyleValue(computed.paddingLeft) + getNumericStyleValue(computed.paddingRight);
  const rawSize = orientation === 'vertical' ? track.clientHeight : track.clientWidth;
  return Math.max(0, rawSize - totalPadding);
}

function syncThumb(
  viewport: HTMLDivElement,
  track: HTMLDivElement,
  thumb: HTMLDivElement,
  orientation: ScrollbarOrientation
) {
  const viewportSize = orientation === 'vertical' ? viewport.clientHeight : viewport.clientWidth;
  const scrollSize = orientation === 'vertical' ? viewport.scrollHeight : viewport.scrollWidth;
  const scrollOffset = orientation === 'vertical' ? viewport.scrollTop : viewport.scrollLeft;
  const trackInnerSize = getTrackInnerSize(track, orientation);

  if (viewportSize <= 0 || scrollSize <= 0 || trackInnerSize <= 0) {
    if (orientation === 'vertical') {
      thumb.style.height = '0px';
      thumb.style.transform = 'translateY(0px)';
    } else {
      thumb.style.width = '0px';
      thumb.style.transform = 'translateX(0px)';
    }
    return;
  }

  const overflowRange = Math.max(0, scrollSize - viewportSize);
  const visibleRatio = Math.min(1, viewportSize / scrollSize);
  const minThumbSize = 16;
  const thumbSize =
    overflowRange === 0 ? trackInnerSize : Math.max(minThumbSize, trackInnerSize * visibleRatio);
  const boundedThumbSize = Math.min(trackInnerSize, thumbSize);
  const maxThumbOffset = Math.max(0, trackInnerSize - boundedThumbSize);
  const progress = overflowRange === 0 ? 0 : Math.min(1, Math.max(0, scrollOffset / overflowRange));
  const thumbOffset = maxThumbOffset * progress;

  if (orientation === 'vertical') {
    thumb.style.height = `${boundedThumbSize}px`;
    thumb.style.transform = `translateY(${thumbOffset}px)`;
  } else {
    thumb.style.width = `${boundedThumbSize}px`;
    thumb.style.transform = `translateX(${thumbOffset}px)`;
  }
}

export function ScrollArea({ ref, className, style, ...props }: ScrollAreaProps) {
  const styleProps = getScrollAreaRootStyleProps(getStyleOptions({ className, style }));
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const scrollbarRefs = useRef<Record<ScrollbarOrientation, HTMLDivElement | null>>({
    vertical: null,
    horizontal: null
  });
  const thumbRefs = useRef<Record<ScrollbarOrientation, HTMLDivElement | null>>({
    vertical: null,
    horizontal: null
  });
  const frameRef = useRef<number | null>(null);

  const syncAllThumbs = useCallback(() => {
    const viewport = viewportRef.current;
    if (viewport == null) {
      return;
    }

    (['vertical', 'horizontal'] as const).forEach((orientation) => {
      const track = scrollbarRefs.current[orientation];
      const thumb = thumbRefs.current[orientation];

      if (track != null && thumb != null) {
        syncThumb(viewport, track, thumb, orientation);
      }
    });
  }, []);

  const scheduleSync = useCallback(() => {
    if (typeof window === 'undefined') {
      syncAllThumbs();
      return;
    }

    if (frameRef.current != null) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      syncAllThumbs();
    });
  }, [syncAllThumbs]);

  useEffect(() => {
    scheduleSync();
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => scheduleSync();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current != null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [scheduleSync]);

  const contextValue: ScrollAreaContextValue = {
    registerViewport: (node) => {
      viewportRef.current = node;
      scheduleSync();
    },
    registerScrollbar: (orientation, node) => {
      scrollbarRefs.current[orientation] = node;
      scheduleSync();
    },
    registerThumb: (orientation, node) => {
      thumbRefs.current[orientation] = node;
      scheduleSync();
    },
    scheduleSync
  };

  return (
    <ScrollAreaContext.Provider value={contextValue}>
      <div {...props} {...styleProps} ref={ref} />
    </ScrollAreaContext.Provider>
  );
}

export function ScrollAreaViewport({
  ref,
  className,
  style,
  tabIndex = 0,
  onScroll,
  ...props
}: ScrollAreaViewportProps) {
  const scrollAreaContext = useContext(ScrollAreaContext);
  const styleProps = getScrollAreaViewportStyleProps(getStyleOptions({ className, style }));
  return (
    <div
      {...props}
      {...styleProps}
      ref={(node) => {
        assignRef(ref, node);
        scrollAreaContext?.registerViewport(node);
      }}
      tabIndex={tabIndex}
      onScroll={(event) => {
        scrollAreaContext?.scheduleSync();
        onScroll?.(event);
      }}
    />
  );
}

export function ScrollAreaScrollbar({
  ref,
  className,
  style,
  orientation = 'vertical',
  'aria-hidden': ariaHidden = true,
  ...props
}: ScrollAreaScrollbarProps) {
  const scrollAreaContext = useContext(ScrollAreaContext);
  const styleProps = getScrollAreaScrollbarStyleProps(
    orientation,
    getStyleOptions({ className, style })
  );
  return (
    <ScrollbarOrientationContext.Provider value={orientation}>
      <div
        {...props}
        {...styleProps}
        ref={(node) => {
          assignRef(ref, node);
          scrollAreaContext?.registerScrollbar(orientation, node);
        }}
        aria-hidden={ariaHidden}
        data-orientation={orientation}
      />
    </ScrollbarOrientationContext.Provider>
  );
}

export function ScrollAreaThumb({ ref, className, style, ...props }: ScrollAreaThumbProps) {
  const scrollAreaContext = useContext(ScrollAreaContext);
  const orientation = useContext(ScrollbarOrientationContext) ?? 'vertical';
  const styleProps = getScrollAreaThumbStyleProps(
    orientation,
    getStyleOptions({ className, style })
  );
  return (
    <div
      {...props}
      {...styleProps}
      ref={(node) => {
        assignRef(ref, node);
        scrollAreaContext?.registerThumb(orientation, node);
      }}
    />
  );
}
