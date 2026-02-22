import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import {
  getCardContentStyleProps,
  getCardDescriptionStyleProps,
  getCardFooterStyleProps,
  getCardHeaderStyleProps,
  getCardRootStyleProps,
  getCardTitleStyleProps
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
  const styleProps = getCardTitleStyleProps(slotStyleOptions({ className, style }));
  return <h3 {...props} {...styleProps} ref={ref} />;
}

export function CardDescription({ ref, className, style, ...props }: CardDescriptionProps) {
  const styleProps = getCardDescriptionStyleProps(slotStyleOptions({ className, style }));
  return <p {...props} {...styleProps} ref={ref} />;
}

export function CardContent({ ref, className, style, ...props }: CardContentProps) {
  const styleProps = getCardContentStyleProps(slotStyleOptions({ className, style }));
  return <div {...props} {...styleProps} ref={ref} />;
}

export function CardFooter({ ref, className, style, ...props }: CardFooterProps) {
  const styleProps = getCardFooterStyleProps(slotStyleOptions({ className, style }));
  return <div {...props} {...styleProps} ref={ref} />;
}
