import {
  createContext,
  useContext,
  useId,
  type CSSProperties,
  type HTMLAttributes,
  type Ref
} from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  type DialogCloseProps,
  type DialogContentProps,
  type DialogDescriptionProps,
  type DialogFooterProps,
  type DialogProps,
  type DialogTitleProps,
  type DialogTriggerProps
} from '../Dialog/Dialog';
import { getAlertDialogHeaderStyleProps } from './AlertDialog.styles';

interface AlertDialogIdsContextValue {
  titleId: string;
  descriptionId: string;
}

const AlertDialogIdsContext = createContext<AlertDialogIdsContextValue | null>(null);

function useAlertDialogIdsContext(componentName: string) {
  const context = useContext(AlertDialogIdsContext);
  if (!context) {
    throw new Error(`${componentName} must be used within AlertDialog`);
  }
  return context;
}

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

export type AlertDialogProps = DialogProps;

export type AlertDialogTriggerProps = DialogTriggerProps;

export type AlertDialogContentProps = DialogContentProps;

export interface AlertDialogHeaderProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

export type AlertDialogTitleProps = DialogTitleProps;

export type AlertDialogDescriptionProps = DialogDescriptionProps;

export type AlertDialogFooterProps = DialogFooterProps;

export type AlertDialogCancelProps = DialogCloseProps;

export interface AlertDialogActionProps extends DialogCloseProps {
  destructive?: boolean;
}

export function AlertDialog(props: AlertDialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <AlertDialogIdsContext.Provider value={{ titleId, descriptionId }}>
      <Dialog {...props} />
    </AlertDialogIdsContext.Provider>
  );
}

export function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  return <DialogTrigger {...props} />;
}

export function AlertDialogContent(props: AlertDialogContentProps) {
  const ids = useAlertDialogIdsContext('AlertDialogContent');
  return (
    <DialogContent
      {...props}
      role={props.role ?? 'alertdialog'}
      aria-labelledby={props['aria-labelledby'] ?? ids.titleId}
      aria-describedby={props['aria-describedby'] ?? ids.descriptionId}
    />
  );
}

export function AlertDialogHeader({ ref, className, style, ...props }: AlertDialogHeaderProps) {
  const styleProps = getAlertDialogHeaderStyleProps({ className, style });
  return <div {...props} {...styleProps} ref={ref} />;
}

export function AlertDialogTitle(props: AlertDialogTitleProps) {
  const ids = useAlertDialogIdsContext('AlertDialogTitle');
  return <DialogTitle {...props} id={props.id ?? ids.titleId} />;
}

export function AlertDialogDescription(props: AlertDialogDescriptionProps) {
  const ids = useAlertDialogIdsContext('AlertDialogDescription');
  return <DialogDescription {...props} id={props.id ?? ids.descriptionId} />;
}

export function AlertDialogFooter({ className, style, ...props }: AlertDialogFooterProps) {
  return <DialogFooter {...props} className={className} style={style} />;
}

export function AlertDialogCancel({ className, style, ...props }: AlertDialogCancelProps) {
  return (
    <DialogClose
      {...props}
      autoAlign={false}
      variant={props.variant ?? 'secondary'}
      size={props.size ?? 'md'}
      className={className}
      style={style}
    />
  );
}

export function AlertDialogAction({
  destructive = false,
  className,
  style,
  ...props
}: AlertDialogActionProps) {
  return (
    <DialogClose
      {...props}
      autoAlign={false}
      variant={props.variant ?? (destructive ? 'destructive' : 'primary')}
      size={props.size ?? 'md'}
      className={className}
      style={style}
    />
  );
}
