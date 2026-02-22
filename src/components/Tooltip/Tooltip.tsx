import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref
} from 'react';
import { Portal } from '../_internal/Portal';
import { useFloatingPosition } from '../_internal/useFloatingPosition';
import { getTooltipContentStyleProps, getTooltipTriggerWrapStyleProps } from './Tooltip.styles';

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement<Record<string, unknown>>;
  openDelay?: number;
}

export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  style?: CSSProperties;
}

export function Tooltip({ content, children, openDelay = 0 }: TooltipProps) {
  const id = useId();
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const position = useFloatingPosition({
    open,
    anchorRef: wrapperRef,
    offset: 8,
    matchWidth: false
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const clearScheduledOpen = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const openTooltip = () => {
    clearScheduledOpen();
    if (openDelay > 0) {
      timeoutRef.current = window.setTimeout(() => setOpen(true), openDelay);
      return;
    }
    setOpen(true);
  };

  const closeTooltip = () => {
    clearScheduledOpen();
    setOpen(false);
  };

  if (!isValidElement(children)) {
    return children;
  }

  const childProps = children.props as Record<string, unknown>;
  const describedBy =
    [childProps['aria-describedby'], open ? id : null].filter(Boolean).join(' ') || undefined;

  const wrappedChild = cloneElement(children, {
    'aria-describedby': describedBy,
    onMouseEnter: (event: MouseEvent) => {
      const original = childProps.onMouseEnter as ((event: MouseEvent) => void) | undefined;
      original?.(event);
    },
    onMouseLeave: (event: MouseEvent) => {
      const original = childProps.onMouseLeave as ((event: MouseEvent) => void) | undefined;
      original?.(event);
    },
    onFocus: (event: FocusEvent) => {
      const original = childProps.onFocus as ((event: FocusEvent) => void) | undefined;
      original?.(event);
    },
    onBlur: (event: FocusEvent) => {
      const original = childProps.onBlur as ((event: FocusEvent) => void) | undefined;
      original?.(event);
    }
  });

  const wrapStyleProps = getTooltipTriggerWrapStyleProps();
  const contentStyleProps = getTooltipContentStyleProps({
    style: {
      top: `${position.top}px`,
      left: `${position.left}px`
    }
  });

  return (
    <>
      <span
        {...wrapStyleProps}
        ref={wrapperRef}
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
        onFocus={openTooltip}
        onBlur={closeTooltip}
      >
        {wrappedChild}
      </span>
      {open ? (
        <Portal>
          <div {...contentStyleProps} id={id} role="tooltip">
            {content}
          </div>
        </Portal>
      ) : null}
    </>
  );
}

export function TooltipContent({ ref, className, style, ...props }: TooltipContentProps) {
  const styleProps = getTooltipContentStyleProps({ className, style });
  return <div {...props} {...styleProps} ref={ref} role={props.role ?? 'tooltip'} />;
}
