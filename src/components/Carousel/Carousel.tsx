import * as stylex from '@stylexjs/stylex';
import {
  Children,
  useCallback,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
  type UIEvent
} from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type CarouselProps = Omit<
  ComponentProps<'section'>,
  'children' | 'className' | 'onChange' | 'style'
> & {
  children: ReactNode;
  defaultIndex?: number;
  index?: number;
  itemSize?: 'full' | 'compact';
  loop?: boolean;
  onIndexChange?: (index: number) => void;
};

const styles = stylex.create({
  root: {
    color: colors.text,
    display: 'grid',
    fontFamily: fontFamilies.sans,
    gap: spacing.md,
    maxWidth: '100%'
  },
  controls: {
    alignItems: 'center',
    display: 'flex',
    gap: spacing.md,
    justifyContent: 'flex-end'
  },
  status: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    fontVariantNumeric: 'tabular-nums',
    lineHeight: lineHeights.sm,
    marginRight: 'auto'
  },
  button: {
    alignItems: 'center',
    backgroundColor: { default: colors.surfaceElevated, ':hover': colors.surfaceSubtle },
    borderColor: colors.borderMuted,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: { default: colors.text, ':disabled': colors.textDisabled },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    height: '36px',
    justifyContent: 'center',
    lineHeight: lineHeights.md,
    padding: 0,
    width: '36px'
  },
  viewport: {
    borderRadius: radii.md,
    outline: { default: 'none', ':focus-visible': `2px solid ${colors.primary}` },
    outlineOffset: '2px',
    overflowX: 'auto',
    overscrollBehaviorInline: 'contain',
    scrollBehavior: 'smooth',
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'none'
  },
  track: { display: 'flex', gap: spacing.md },
  slide: {
    boxSizing: 'border-box',
    flex: '0 0 100%',
    minWidth: 0,
    scrollSnapAlign: 'start',
    scrollSnapStop: 'always'
  },
  compactSlide: { flexBasis: '80%' },
  dots: {
    alignItems: 'center',
    display: 'flex',
    gap: spacing.sm,
    justifyContent: 'center'
  },
  dot: {
    backgroundColor: colors.borderMuted,
    borderRadius: radii.full,
    borderWidth: 0,
    cursor: 'pointer',
    height: '8px',
    padding: 0,
    width: '8px'
  },
  activeDot: { backgroundColor: colors.primary, width: '20px' }
});

function clampIndex(index: number, count: number) {
  return Math.max(0, Math.min(index, Math.max(0, count - 1)));
}

export function Carousel({
  'aria-label': ariaLabel = 'Carousel',
  children,
  defaultIndex = 0,
  index,
  itemSize = 'full',
  loop = false,
  onIndexChange,
  ...props
}: CarouselProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const viewportRef = useRef<HTMLDivElement>(null);
  const [uncontrolledIndex, setUncontrolledIndex] = useState(() => clampIndex(defaultIndex, count));
  const activeIndex = clampIndex(index ?? uncontrolledIndex, count);

  const select = useCallback(
    (nextIndex: number) => {
      if (count === 0) return;
      const resolvedIndex = loop ? (nextIndex + count) % count : clampIndex(nextIndex, count);

      if (index === undefined) setUncontrolledIndex(resolvedIndex);
      if (resolvedIndex !== activeIndex) onIndexChange?.(resolvedIndex);

      const viewport = viewportRef.current;
      const slide = viewport?.querySelector<HTMLElement>(
        `[data-carousel-index="${resolvedIndex}"]`
      );
      if (viewport && slide) {
        viewport.scrollTo?.({ behavior: 'smooth', left: slide.offsetLeft });
      }
    },
    [activeIndex, count, index, loop, onIndexChange]
  );

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;
    const slideElements = Array.from(
      viewport.querySelectorAll<HTMLElement>('[data-carousel-index]')
    );
    if (slideElements.length === 0) return;

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    slideElements.forEach((slide, slideIndex) => {
      const distance = Math.abs(slide.offsetLeft - viewport.scrollLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = slideIndex;
      }
    });

    if (nearestIndex !== activeIndex) {
      if (index === undefined) setUncontrolledIndex(nearestIndex);
      onIndexChange?.(nearestIndex);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      select(activeIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      select(activeIndex + 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      select(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      select(count - 1);
    }
  };

  const previousDisabled = !loop && activeIndex === 0;
  const nextDisabled = !loop && activeIndex === count - 1;

  return (
    <section
      {...props}
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      role="region"
      {...stylex.props(styles.root)}
    >
      <div {...stylex.props(styles.controls)}>
        <span aria-live="polite" {...stylex.props(styles.status)}>
          {count === 0 ? 'No slides' : `${activeIndex + 1} of ${count}`}
        </span>
        <button
          aria-label="Previous slide"
          disabled={count === 0 || previousDisabled}
          type="button"
          onClick={() => select(activeIndex - 1)}
          {...stylex.props(styles.button)}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          aria-label="Next slide"
          disabled={count === 0 || nextDisabled}
          type="button"
          onClick={() => select(activeIndex + 1)}
          {...stylex.props(styles.button)}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
      <div
        aria-label={`${ariaLabel} slides`}
        ref={viewportRef}
        role="group"
        tabIndex={count === 0 ? -1 : 0}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        {...stylex.props(styles.viewport)}
      >
        <div {...stylex.props(styles.track)}>
          {slides.map((slide, slideIndex) => (
            <div
              aria-label={`${slideIndex + 1} of ${count}`}
              aria-roledescription="slide"
              data-carousel-index={slideIndex}
              key={slideIndex}
              role="group"
              {...stylex.props(styles.slide, itemSize === 'compact' && styles.compactSlide)}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
      {count > 1 && (
        <div aria-label="Choose slide" role="group" {...stylex.props(styles.dots)}>
          {slides.map((_, slideIndex) => (
            <button
              aria-label={`Go to slide ${slideIndex + 1}`}
              aria-pressed={slideIndex === activeIndex}
              key={slideIndex}
              type="button"
              onClick={() => select(slideIndex)}
              {...stylex.props(styles.dot, slideIndex === activeIndex && styles.activeDot)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
