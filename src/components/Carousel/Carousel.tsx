import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref
} from 'react';
import { Button, type ButtonProps } from '../Button/Button';
import { getDataPresenceAttribute, getDataStateAttribute } from '../_internal/dataAttributes';
import { useControllableState } from '../_internal/useControllableState';
import {
  getCarouselContentStyleProps,
  getCarouselControlStyleProps,
  getCarouselItemStyleProps,
  getCarouselRootStyleProps,
  getCarouselViewportStyleProps,
  type CarouselOrientation
} from './Carousel.styles';

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

interface CarouselContextValue {
  baseId: string;
  orientation: CarouselOrientation;
  currentIndex: number;
  itemCount: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  registerItem: (id: string) => void;
  unregisterItem: (id: string) => void;
  getItemIndex: (id: string) => number;
  goToIndex: (index: number) => void;
  goToPrevious: () => void;
  goToNext: () => void;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarouselContext(componentName: string) {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error(`${componentName} must be used within Carousel`);
  }

  return context;
}

function getStyleOptions({ className, style }: BaseStyleProps) {
  return { className, style };
}

function clampIndex(index: number, itemCount: number) {
  if (!Number.isFinite(index)) {
    return 0;
  }

  const normalizedIndex = Math.max(0, Math.trunc(index));
  if (itemCount <= 0) {
    return 0;
  }

  return Math.min(normalizedIndex, itemCount - 1);
}

export interface CarouselProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  orientation?: CarouselOrientation;
}

export interface CarouselViewportProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

export interface CarouselContentProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

export interface CarouselPreviousProps extends Omit<ButtonProps, 'type'>, BaseStyleProps {
  ref?: Ref<HTMLButtonElement>;
}

export interface CarouselNextProps extends Omit<ButtonProps, 'type'>, BaseStyleProps {
  ref?: Ref<HTMLButtonElement>;
}

export function Carousel({
  ref,
  className,
  style,
  children,
  index,
  defaultIndex = 0,
  onIndexChange,
  orientation = 'horizontal',
  role = 'region',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-roledescription': ariaRoleDescription = 'carousel',
  ...props
}: CarouselProps) {
  const baseId = useId();
  const [itemIds, setItemIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useControllableState({
    value: index,
    defaultValue: Math.max(0, Math.trunc(defaultIndex) || 0),
    onChange: onIndexChange
  });
  const itemCount = itemIds.length;
  const boundedIndex = clampIndex(currentIndex, itemCount);
  const styleProps = getCarouselRootStyleProps(getStyleOptions({ className, style }));

  const registerItem = useCallback((id: string) => {
    setItemIds((previous) => (previous.includes(id) ? previous : [...previous, id]));
  }, []);

  const unregisterItem = useCallback((id: string) => {
    setItemIds((previous) => previous.filter((itemId) => itemId !== id));
  }, []);

  const goToIndex = useCallback(
    (nextIndex: number) => {
      setCurrentIndex(clampIndex(nextIndex, itemCount));
    },
    [itemCount, setCurrentIndex]
  );

  const goToPrevious = useCallback(() => {
    goToIndex(boundedIndex - 1);
  }, [boundedIndex, goToIndex]);

  const goToNext = useCallback(() => {
    goToIndex(boundedIndex + 1);
  }, [boundedIndex, goToIndex]);

  useEffect(() => {
    if (boundedIndex !== currentIndex) {
      setCurrentIndex(boundedIndex);
    }
  }, [boundedIndex, currentIndex, setCurrentIndex]);

  const contextValue: CarouselContextValue = {
    baseId,
    orientation,
    currentIndex: boundedIndex,
    itemCount,
    canGoPrevious: itemCount > 0 && boundedIndex > 0,
    canGoNext: itemCount > 0 && boundedIndex < itemCount - 1,
    registerItem,
    unregisterItem,
    getItemIndex: (id) => itemIds.indexOf(id),
    goToIndex,
    goToPrevious,
    goToNext
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        {...props}
        {...styleProps}
        ref={ref}
        role={role}
        aria-label={ariaLabel ?? (ariaLabelledBy ? undefined : 'Carousel')}
        aria-labelledby={ariaLabelledBy}
        aria-roledescription={ariaRoleDescription}
        data-orientation={orientation}
        data-current-index={boundedIndex}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselViewport({
  ref,
  className,
  style,
  id,
  tabIndex = 0,
  onKeyDown,
  ...props
}: CarouselViewportProps) {
  const context = useCarouselContext('CarouselViewport');
  const styleProps = getCarouselViewportStyleProps(getStyleOptions({ className, style }));
  const viewportId = id ?? `${context.baseId}-viewport`;

  return (
    <div
      {...props}
      {...styleProps}
      ref={ref}
      id={viewportId}
      tabIndex={tabIndex}
      data-orientation={context.orientation}
      onKeyDown={(event) => {
        if (event.defaultPrevented) {
          onKeyDown?.(event);
          return;
        }

        const nextKey = context.orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
        const previousKey = context.orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';

        if (event.key === nextKey) {
          context.goToNext();
          event.preventDefault();
        } else if (event.key === previousKey) {
          context.goToPrevious();
          event.preventDefault();
        } else if (event.key === 'Home') {
          context.goToIndex(0);
          event.preventDefault();
        } else if (event.key === 'End') {
          context.goToIndex(context.itemCount - 1);
          event.preventDefault();
        }

        onKeyDown?.(event);
      }}
    />
  );
}

export function CarouselContent({ ref, className, style, ...props }: CarouselContentProps) {
  const context = useCarouselContext('CarouselContent');
  const transform =
    context.orientation === 'horizontal'
      ? `translate3d(-${context.currentIndex * 100}%, 0, 0)`
      : `translate3d(0, -${context.currentIndex * 100}%, 0)`;
  const styleProps = getCarouselContentStyleProps(context.orientation, {
    className,
    style: { transform, ...style }
  });

  return (
    <div
      {...props}
      {...styleProps}
      ref={ref}
      data-orientation={context.orientation}
      data-current-index={context.currentIndex}
    />
  );
}

export function CarouselItem({
  ref,
  className,
  style,
  role = 'group',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-roledescription': ariaRoleDescription = 'slide',
  ...props
}: CarouselItemProps) {
  const context = useCarouselContext('CarouselItem');
  const { registerItem, unregisterItem } = context;
  const itemId = useId();
  const styleProps = getCarouselItemStyleProps(
    context.orientation,
    getStyleOptions({ className, style })
  );
  const itemIndex = context.getItemIndex(itemId);
  const slideNumber = itemIndex >= 0 ? itemIndex + 1 : undefined;
  const fallbackAriaLabel =
    ariaLabel ??
    (ariaLabelledBy || slideNumber == null ? undefined : `${slideNumber} of ${context.itemCount}`);
  const isActive = itemIndex === context.currentIndex;

  useEffect(() => {
    registerItem(itemId);

    return () => {
      unregisterItem(itemId);
    };
  }, [itemId, registerItem, unregisterItem]);

  return (
    <div
      {...props}
      {...styleProps}
      ref={ref}
      role={role}
      aria-label={fallbackAriaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-roledescription={ariaRoleDescription}
      id={props.id ?? `${context.baseId}-slide-${itemId}`}
      data-state={getDataStateAttribute(isActive, 'active', 'inactive')}
      data-carousel-item=""
      data-index={itemIndex >= 0 ? itemIndex : undefined}
      data-active={getDataPresenceAttribute(isActive)}
    />
  );
}

function CarouselControlIcon({ children }: { children: ReactNode }) {
  return <span aria-hidden="true">{children}</span>;
}

export function CarouselPrevious({
  ref,
  className,
  style,
  disabled = false,
  variant = 'secondary',
  size = 'sm',
  onClick,
  children,
  'aria-label': ariaLabel = 'Previous slide',
  ...props
}: CarouselPreviousProps) {
  const context = useCarouselContext('CarouselPrevious');
  const resolvedDisabled = disabled || !context.canGoPrevious;
  const styleProps = getCarouselControlStyleProps(
    'previous',
    getStyleOptions({ className, style })
  );

  return (
    <Button
      {...props}
      {...styleProps}
      variant={variant}
      size={size}
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      aria-controls={`${context.baseId}-viewport`}
      disabled={resolvedDisabled}
      data-direction="previous"
      data-disabled={getDataPresenceAttribute(resolvedDisabled)}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || resolvedDisabled) {
          return;
        }

        context.goToPrevious();
      }}
    >
      {children ?? <CarouselControlIcon>‹</CarouselControlIcon>}
    </Button>
  );
}

export function CarouselNext({
  ref,
  className,
  style,
  disabled = false,
  variant = 'secondary',
  size = 'sm',
  onClick,
  children,
  'aria-label': ariaLabel = 'Next slide',
  ...props
}: CarouselNextProps) {
  const context = useCarouselContext('CarouselNext');
  const resolvedDisabled = disabled || !context.canGoNext;
  const styleProps = getCarouselControlStyleProps('next', getStyleOptions({ className, style }));

  return (
    <Button
      {...props}
      {...styleProps}
      variant={variant}
      size={size}
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      aria-controls={`${context.baseId}-viewport`}
      disabled={resolvedDisabled}
      data-direction="next"
      data-disabled={getDataPresenceAttribute(resolvedDisabled)}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || resolvedDisabled) {
          return;
        }

        context.goToNext();
      }}
    >
      {children ?? <CarouselControlIcon>›</CarouselControlIcon>}
    </Button>
  );
}

export type { CarouselOrientation } from './Carousel.styles';
