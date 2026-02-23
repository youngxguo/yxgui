import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import { Typography } from '../Typography/Typography';
import {
  getEmptyActionsStyleProps,
  getEmptyDescriptionStyleProps,
  getEmptyHeaderStyleProps,
  getEmptyMediaStyleProps,
  getEmptyRootStyleProps,
  getEmptyTitleStyleProps
} from './Empty.styles';

interface EmptyBaseProps {
  className?: string;
  style?: CSSProperties;
}

export interface EmptyProps extends HTMLAttributes<HTMLDivElement>, EmptyBaseProps {
  ref?: Ref<HTMLDivElement>;
}

export interface EmptyMediaProps extends HTMLAttributes<HTMLDivElement>, EmptyBaseProps {
  ref?: Ref<HTMLDivElement>;
}

export interface EmptyHeaderProps extends HTMLAttributes<HTMLDivElement>, EmptyBaseProps {
  ref?: Ref<HTMLDivElement>;
}

export interface EmptyTitleProps extends HTMLAttributes<HTMLHeadingElement>, EmptyBaseProps {
  ref?: Ref<HTMLHeadingElement>;
}

export interface EmptyDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement>, EmptyBaseProps {
  ref?: Ref<HTMLParagraphElement>;
}

export interface EmptyActionsProps extends HTMLAttributes<HTMLDivElement>, EmptyBaseProps {
  ref?: Ref<HTMLDivElement>;
}

function slotStyleOptions({ className, style }: EmptyBaseProps) {
  return { className, style };
}

export function Empty({ ref, className, style, ...props }: EmptyProps) {
  const styleProps = getEmptyRootStyleProps(slotStyleOptions({ className, style }));
  return <div {...props} {...styleProps} ref={ref} />;
}

export function EmptyMedia({ ref, className, style, ...props }: EmptyMediaProps) {
  const styleProps = getEmptyMediaStyleProps(slotStyleOptions({ className, style }));
  return <div {...props} {...styleProps} ref={ref} />;
}

export function EmptyHeader({ ref, className, style, ...props }: EmptyHeaderProps) {
  const styleProps = getEmptyHeaderStyleProps(slotStyleOptions({ className, style }));
  return <div {...props} {...styleProps} ref={ref} />;
}

export function EmptyTitle({ ref, className, style, ...props }: EmptyTitleProps) {
  const styleProps = getEmptyTitleStyleProps(slotStyleOptions({ className, style }));
  return (
    <Typography {...props} {...styleProps} ref={ref as Ref<HTMLElement>} as="h3" variant="h4" />
  );
}

export function EmptyDescription({ ref, className, style, ...props }: EmptyDescriptionProps) {
  const styleProps = getEmptyDescriptionStyleProps(slotStyleOptions({ className, style }));
  return (
    <Typography {...props} {...styleProps} ref={ref as Ref<HTMLElement>} as="p" variant="muted" />
  );
}

export function EmptyActions({ ref, className, style, ...props }: EmptyActionsProps) {
  const styleProps = getEmptyActionsStyleProps(slotStyleOptions({ className, style }));
  return <div {...props} {...styleProps} ref={ref} />;
}
