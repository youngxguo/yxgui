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
import {
  getDrawerContentStyleProps,
  getDrawerFooterStyleProps,
  getDrawerHeaderStyleProps,
  type DrawerSide
} from './Drawer.styles';

interface DrawerIdsContextValue {
  titleId: string;
  descriptionId: string;
}

const DrawerIdsContext = createContext<DrawerIdsContextValue | null>(null);

function useDrawerIdsContext(componentName: string) {
  const context = useContext(DrawerIdsContext);
  if (!context) {
    throw new Error(`${componentName} must be used within Drawer`);
  }
  return context;
}

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

export type DrawerProps = DialogProps;
export type DrawerTriggerProps = DialogTriggerProps;

export interface DrawerContentProps extends DialogContentProps {
  side?: DrawerSide;
}

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

export type DrawerTitleProps = DialogTitleProps;
export type DrawerDescriptionProps = DialogDescriptionProps;
export type DrawerFooterProps = DialogFooterProps;
export type DrawerCloseProps = DialogCloseProps;

export function Drawer(props: DrawerProps) {
  const titleId = useId();
  const descriptionId = useId();
  return (
    <DrawerIdsContext.Provider value={{ titleId, descriptionId }}>
      <Dialog {...props} />
    </DrawerIdsContext.Provider>
  );
}

export function DrawerTrigger(props: DrawerTriggerProps) {
  return <DialogTrigger {...props} />;
}

export function DrawerContent({ side = 'bottom', className, style, ...props }: DrawerContentProps) {
  const ids = useDrawerIdsContext('DrawerContent');
  const styleProps = getDrawerContentStyleProps(side, { className, style });
  return (
    <DialogContent
      {...props}
      {...styleProps}
      data-side={side}
      aria-labelledby={props['aria-labelledby'] ?? ids.titleId}
      aria-describedby={props['aria-describedby'] ?? ids.descriptionId}
    />
  );
}

export function DrawerHeader({ ref, className, style, ...props }: DrawerHeaderProps) {
  const styleProps = getDrawerHeaderStyleProps({ className, style });
  return <div {...props} {...styleProps} ref={ref} />;
}

export function DrawerTitle(props: DrawerTitleProps) {
  const ids = useDrawerIdsContext('DrawerTitle');
  return <DialogTitle {...props} id={props.id ?? ids.titleId} />;
}

export function DrawerDescription(props: DrawerDescriptionProps) {
  const ids = useDrawerIdsContext('DrawerDescription');
  return <DialogDescription {...props} id={props.id ?? ids.descriptionId} />;
}

export function DrawerFooter({ className, style, ...props }: DrawerFooterProps) {
  const styleProps = getDrawerFooterStyleProps({ className, style });
  return <DialogFooter {...props} {...styleProps} />;
}

export function DrawerClose(props: DrawerCloseProps) {
  return <DialogClose {...props} />;
}
