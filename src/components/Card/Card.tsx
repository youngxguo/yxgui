import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import { Typography } from '../Typography/Typography';
import {
  getCardContentStyleProps,
  getCardFooterStyleProps,
  getCardHeaderStyleProps,
  getCardRootStyleProps
} from './Card.styles';

interface CardBaseProps {
  className?: string;
  style?: CSSProperties;
}

export interface CardProps extends HTMLAttributes<HTMLDivElement>, CardBaseProps {
  ref?: Ref<HTMLDivElement>;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement>, CardBaseProps {
  ref?: Ref<HTMLDivElement>;
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement>, CardBaseProps {
  ref?: Ref<HTMLHeadingElement>;
}

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement>, CardBaseProps {
  ref?: Ref<HTMLParagraphElement>;
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement>, CardBaseProps {
  ref?: Ref<HTMLDivElement>;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement>, CardBaseProps {
  ref?: Ref<HTMLDivElement>;
}

function slotStyleOptions({ className, style }: CardBaseProps) {
  return { className, style };
}

export function Card({ ref, className, style, ...props }: CardProps) {
  const styleProps = getCardRootStyleProps(slotStyleOptions({ className, style }));
  return <div {...props} {...styleProps} ref={ref} />;
}

export function CardHeader({ ref, className, style, ...props }: CardHeaderProps) {
  const styleProps = getCardHeaderStyleProps(slotStyleOptions({ className, style }));
  return <div {...props} {...styleProps} ref={ref} />;
}

export function CardTitle({ ref, className, style, ...props }: CardTitleProps) {
  return (
    <Typography
      {...props}
      ref={ref as Ref<HTMLElement>}
      as="h3"
      variant="h4"
      className={className}
      style={style}
    />
  );
}

export function CardDescription({ ref, className, style, ...props }: CardDescriptionProps) {
  return (
    <Typography
      {...props}
      ref={ref as Ref<HTMLElement>}
      as="p"
      variant="muted"
      className={className}
      style={style}
    />
  );
}

export function CardContent({ ref, className, style, ...props }: CardContentProps) {
  const styleProps = getCardContentStyleProps(slotStyleOptions({ className, style }));
  return <div {...props} {...styleProps} ref={ref} />;
}

export function CardFooter({ ref, className, style, ...props }: CardFooterProps) {
  const styleProps = getCardFooterStyleProps(slotStyleOptions({ className, style }));
  return <div {...props} {...styleProps} ref={ref} />;
}
