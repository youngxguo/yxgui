import type {
  AnchorHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  LiHTMLAttributes,
  OlHTMLAttributes,
  Ref
} from 'react';
import {
  getBreadcrumbEllipsisStyleProps,
  getBreadcrumbItemStyleProps,
  getBreadcrumbLinkStyleProps,
  getBreadcrumbListStyleProps,
  getBreadcrumbPageStyleProps,
  getBreadcrumbRootStyleProps,
  getBreadcrumbSeparatorStyleProps
} from './Breadcrumb.styles';

interface BreadcrumbStyleProps {
  className?: string;
  style?: CSSProperties;
}

function getStyleOptions({ className, style }: BreadcrumbStyleProps) {
  return { className, style };
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement>, BreadcrumbStyleProps {
  ref?: Ref<HTMLElement>;
}

export interface BreadcrumbListProps
  extends OlHTMLAttributes<HTMLOListElement>, BreadcrumbStyleProps {
  ref?: Ref<HTMLOListElement>;
}

export interface BreadcrumbItemProps extends LiHTMLAttributes<HTMLLIElement>, BreadcrumbStyleProps {
  ref?: Ref<HTMLLIElement>;
}

export interface BreadcrumbLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>, BreadcrumbStyleProps {
  ref?: Ref<HTMLAnchorElement>;
}

export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement>, BreadcrumbStyleProps {
  ref?: Ref<HTMLSpanElement>;
}

export interface BreadcrumbSeparatorProps
  extends LiHTMLAttributes<HTMLLIElement>, BreadcrumbStyleProps {
  ref?: Ref<HTMLLIElement>;
}

export interface BreadcrumbEllipsisProps
  extends LiHTMLAttributes<HTMLLIElement>, BreadcrumbStyleProps {
  ref?: Ref<HTMLLIElement>;
}

export function Breadcrumb({
  ref,
  className,
  style,
  'aria-label': ariaLabel = 'Breadcrumb',
  ...props
}: BreadcrumbProps) {
  const styleProps = getBreadcrumbRootStyleProps(getStyleOptions({ className, style }));

  return <nav {...props} {...styleProps} ref={ref} aria-label={ariaLabel} />;
}

export function BreadcrumbList({ ref, className, style, ...props }: BreadcrumbListProps) {
  const styleProps = getBreadcrumbListStyleProps(getStyleOptions({ className, style }));

  return <ol {...props} {...styleProps} ref={ref} />;
}

export function BreadcrumbItem({ ref, className, style, ...props }: BreadcrumbItemProps) {
  const styleProps = getBreadcrumbItemStyleProps(getStyleOptions({ className, style }));

  return <li {...props} {...styleProps} ref={ref} />;
}

export function BreadcrumbLink({ ref, className, style, ...props }: BreadcrumbLinkProps) {
  const styleProps = getBreadcrumbLinkStyleProps(getStyleOptions({ className, style }));

  return <a {...props} {...styleProps} ref={ref} />;
}

export function BreadcrumbPage({
  ref,
  className,
  style,
  'aria-current': ariaCurrent = 'page',
  ...props
}: BreadcrumbPageProps) {
  const styleProps = getBreadcrumbPageStyleProps(getStyleOptions({ className, style }));

  return <span {...props} {...styleProps} ref={ref} aria-current={ariaCurrent} />;
}

export function BreadcrumbSeparator({
  ref,
  className,
  style,
  children = '/',
  role = 'presentation',
  'aria-hidden': ariaHidden = true,
  ...props
}: BreadcrumbSeparatorProps) {
  const styleProps = getBreadcrumbSeparatorStyleProps(getStyleOptions({ className, style }));

  return (
    <li {...props} {...styleProps} ref={ref} role={role} aria-hidden={ariaHidden}>
      {children}
    </li>
  );
}

export function BreadcrumbEllipsis({
  ref,
  className,
  style,
  children = '...',
  role = 'presentation',
  'aria-hidden': ariaHidden = true,
  ...props
}: BreadcrumbEllipsisProps) {
  const styleProps = getBreadcrumbEllipsisStyleProps(getStyleOptions({ className, style }));

  return (
    <li {...props} {...styleProps} ref={ref} role={role} aria-hidden={ariaHidden}>
      {children}
    </li>
  );
}
