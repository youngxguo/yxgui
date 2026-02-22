import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref
} from 'react';
import { Portal } from '../_internal/Portal';
import { useControllableState } from '../_internal/useControllableState';
import {
  getDialogCloseStyleProps,
  getDialogContentStyleProps,
  getDialogDescriptionStyleProps,
  getDialogFooterStyleProps,
  getDialogOverlayStyleProps,
  getDialogTitleStyleProps
} from './Dialog.styles';

const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  setTriggerNode: (node: HTMLButtonElement | null) => void;
  contentId: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(componentName: string) {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(`${componentName} must be used within Dialog`);
  }
  return context;
}

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export interface DialogTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>, BaseStyleProps {
  ref?: Ref<HTMLButtonElement>;
}

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
  closeOnOverlayClick?: boolean;
}

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement>, BaseStyleProps {
  ref?: Ref<HTMLHeadingElement>;
}

export interface DialogDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement>, BaseStyleProps {
  ref?: Ref<HTMLParagraphElement>;
}

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

export interface DialogCloseProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>, BaseStyleProps {
  ref?: Ref<HTMLButtonElement>;
}

function assignRef<T>(ref: Ref<T> | undefined, value: T) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    (ref as { current: T }).current = value;
  }
}

export function Dialog({ open, defaultOpen = false, onOpenChange, children }: DialogProps) {
  const contentId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });

  return (
    <DialogContext.Provider
      value={{
        open: isOpen,
        setOpen: setIsOpen,
        triggerRef,
        setTriggerNode: (node) => {
          triggerRef.current = node;
        },
        contentId
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ ref, onClick, ...props }: DialogTriggerProps) {
  const context = useDialogContext('DialogTrigger');

  return (
    <button
      {...props}
      ref={(node) => {
        context.setTriggerNode(node);
        assignRef(ref, node);
      }}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={context.open}
      aria-controls={context.contentId}
      onClick={(event) => {
        context.setOpen(!context.open);
        onClick?.(event);
      }}
    />
  );
}

export function DialogContent({
  ref,
  className,
  style,
  closeOnOverlayClick = true,
  onKeyDown,
  onMouseDown,
  children,
  ...props
}: DialogContentProps) {
  const context = useDialogContext('DialogContent');
  const contentRef = useRef<HTMLDivElement>(null);
  const previousFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!context.open) {
      return;
    }

    previousFocusedRef.current = document.activeElement as HTMLElement | null;
    const content = contentRef.current;
    const focusTarget = content?.querySelector<HTMLElement>(focusableSelector) ?? content;
    focusTarget?.focus();

    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        context.setOpen(false);
      }
    };

    document.addEventListener('keydown', handleDocumentKeyDown);
    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
      if (context.triggerRef.current) {
        context.triggerRef.current.focus();
        return;
      }

      const previous = previousFocusedRef.current;
      if (previous && previous.isConnected) {
        previous.focus();
      }
    };
  }, [context]);

  if (!context.open) {
    return null;
  }

  const overlayStyleProps = getDialogOverlayStyleProps();
  const contentStyleProps = getDialogContentStyleProps({ className, style });

  return (
    <Portal>
      <div
        {...overlayStyleProps}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget && closeOnOverlayClick) {
            context.setOpen(false);
          }
        }}
      >
        <div
          {...props}
          {...contentStyleProps}
          ref={(node) => {
            contentRef.current = node;
            assignRef(ref, node);
          }}
          id={context.contentId}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onKeyDown={onKeyDown}
          onMouseDown={onMouseDown}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}

export function DialogTitle({ ref, className, style, ...props }: DialogTitleProps) {
  const styleProps = getDialogTitleStyleProps({ className, style });
  return <h2 {...props} {...styleProps} ref={ref} />;
}

export function DialogDescription({ ref, className, style, ...props }: DialogDescriptionProps) {
  const styleProps = getDialogDescriptionStyleProps({ className, style });
  return <p {...props} {...styleProps} ref={ref} />;
}

export function DialogFooter({ ref, className, style, ...props }: DialogFooterProps) {
  const styleProps = getDialogFooterStyleProps({ className, style });
  return <div {...props} {...styleProps} ref={ref} />;
}

export function DialogClose({ ref, className, style, onClick, ...props }: DialogCloseProps) {
  const context = useDialogContext('DialogClose');
  const styleProps = getDialogCloseStyleProps({ className, style });

  return (
    <button
      {...props}
      {...styleProps}
      ref={ref}
      type="button"
      onClick={(event) => {
        context.setOpen(false);
        onClick?.(event);
      }}
    />
  );
}
