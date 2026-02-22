import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import {
  getAlertDescriptionStyleProps,
  getAlertRootStyleProps,
  getAlertTitleStyleProps,
  type AlertVariant
} from './Alert.styles';

interface AlertSlotBaseProps {
  className?: string;
  style?: CSSProperties;
}

export interface AlertProps extends HTMLAttributes<HTMLDivElement>, AlertSlotBaseProps {
  ref?: Ref<HTMLDivElement>;
  variant?: AlertVariant;
}

export interface AlertTitleProps extends HTMLAttributes<HTMLParagraphElement>, AlertSlotBaseProps {
  ref?: Ref<HTMLParagraphElement>;
}

export interface AlertDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement>, AlertSlotBaseProps {
  ref?: Ref<HTMLParagraphElement>;
}

function slotOptions({ className, style }: AlertSlotBaseProps) {
  return { className, style };
}

export function Alert({
  ref,
  variant = 'info',
  className,
  style,
  role = variant === 'error' ? 'alert' : 'status',
  ...props
}: AlertProps) {
  const styleProps = getAlertRootStyleProps(variant, slotOptions({ className, style }));

  return <div {...props} {...styleProps} ref={ref} role={role} />;
}

export function AlertTitle({ ref, className, style, ...props }: AlertTitleProps) {
  const styleProps = getAlertTitleStyleProps(slotOptions({ className, style }));
  return <p {...props} {...styleProps} ref={ref} />;
}

export function AlertDescription({ ref, className, style, ...props }: AlertDescriptionProps) {
  const styleProps = getAlertDescriptionStyleProps(slotOptions({ className, style }));
  return <p {...props} {...styleProps} ref={ref} />;
}
