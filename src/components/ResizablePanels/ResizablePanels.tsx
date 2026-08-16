import * as stylex from '@stylexjs/stylex';
import {
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode
} from 'react';
import { colors } from '../../theme/colors.stylex';
import { radii, spacing } from '../../theme/foundations.stylex';

export type ResizablePanelsOrientation = 'horizontal' | 'vertical';

export type ResizablePanelsProps = Omit<
  ComponentProps<'div'>,
  'children' | 'className' | 'style'
> & {
  defaultSize?: number;
  first: ReactNode;
  firstLabel?: string;
  handleLabel?: string;
  maxSize?: number;
  minSize?: number;
  onSizeChange?: (size: number) => void;
  orientation?: ResizablePanelsOrientation;
  second: ReactNode;
  secondLabel?: string;
  size?: number;
  step?: number;
};

type SplitStyle = CSSProperties & { '--split-size': string };

const styles = stylex.create({
  root: {
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'grid',
    maxWidth: '100%',
    minHeight: '240px',
    overflow: 'hidden',
    width: '100%'
  },
  horizontal: { gridTemplateColumns: 'var(--split-size) 7px minmax(0, 1fr)' },
  vertical: { gridTemplateRows: 'var(--split-size) 7px minmax(0, 1fr)', height: '420px' },
  panel: { minHeight: 0, minWidth: 0, overflow: 'auto', padding: spacing.lg },
  handle: {
    alignItems: 'center',
    backgroundColor: { default: colors.surfaceSubtle, ':hover': colors.borderMuted },
    display: 'flex',
    justifyContent: 'center',
    outline: { default: 'none', ':focus-visible': `2px solid ${colors.primary}` },
    outlineOffset: '-2px',
    touchAction: 'none',
    userSelect: 'none'
  },
  horizontalHandle: { cursor: 'col-resize' },
  verticalHandle: { cursor: 'row-resize' },
  activeHandle: { backgroundColor: colors.primary },
  horizontalGrip: {
    backgroundColor: colors.textMuted,
    borderRadius: radii.full,
    height: '28px',
    width: '2px'
  },
  verticalGrip: {
    backgroundColor: colors.textMuted,
    borderRadius: radii.full,
    height: '2px',
    width: '28px'
  }
});

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ResizablePanels({
  defaultSize = 40,
  first,
  firstLabel,
  handleLabel = 'Resize panels',
  maxSize = 80,
  minSize = 20,
  onSizeChange,
  orientation = 'horizontal',
  second,
  secondLabel,
  size,
  step = 5,
  ...props
}: ResizablePanelsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [uncontrolledSize, setUncontrolledSize] = useState(() =>
    clamp(defaultSize, minSize, maxSize)
  );
  const [dragging, setDragging] = useState(false);
  const currentSize = clamp(size ?? uncontrolledSize, minSize, maxSize);

  const changeSize = (nextSize: number) => {
    const constrainedSize = Math.round(clamp(nextSize, minSize, maxSize) * 10) / 10;
    if (size === undefined) setUncontrolledSize(constrainedSize);
    onSizeChange?.(constrainedSize);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging || !rootRef.current) return;
    const bounds = rootRef.current.getBoundingClientRect();
    const position =
      orientation === 'horizontal'
        ? (event.clientX - bounds.left) / bounds.width
        : (event.clientY - bounds.top) / bounds.height;
    changeSize(position * 100);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextSize = currentSize;
    if (event.key === 'Home') nextSize = minSize;
    else if (event.key === 'End') nextSize = maxSize;
    else if (
      (orientation === 'horizontal' && event.key === 'ArrowLeft') ||
      (orientation === 'vertical' && event.key === 'ArrowUp')
    )
      nextSize -= step;
    else if (
      (orientation === 'horizontal' && event.key === 'ArrowRight') ||
      (orientation === 'vertical' && event.key === 'ArrowDown')
    )
      nextSize += step;
    else return;

    event.preventDefault();
    changeSize(nextSize);
  };

  return (
    <div
      {...props}
      ref={rootRef}
      style={{ '--split-size': `${currentSize}%` } as SplitStyle}
      {...stylex.props(
        styles.root,
        orientation === 'horizontal' ? styles.horizontal : styles.vertical
      )}
    >
      <div
        aria-label={firstLabel}
        role={firstLabel ? 'region' : undefined}
        {...stylex.props(styles.panel)}
      >
        {first}
      </div>
      <div
        aria-label={handleLabel}
        aria-orientation={orientation}
        aria-valuemax={maxSize}
        aria-valuemin={minSize}
        aria-valuenow={currentSize}
        role="separator"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
          setDragging(false);
        }}
        {...stylex.props(
          styles.handle,
          orientation === 'horizontal' ? styles.horizontalHandle : styles.verticalHandle,
          dragging && styles.activeHandle
        )}
      >
        <span
          aria-hidden="true"
          {...stylex.props(
            orientation === 'horizontal' ? styles.horizontalGrip : styles.verticalGrip
          )}
        />
      </div>
      <div
        aria-label={secondLabel}
        role={secondLabel ? 'region' : undefined}
        {...stylex.props(styles.panel)}
      >
        {second}
      </div>
    </div>
  );
}
