import type {
  AnchorHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  LiHTMLAttributes,
  Ref
} from 'react';
import {
  getPaginationEllipsisStyleProps,
  getPaginationItemStyleProps,
  getPaginationLinkStyleProps,
  getPaginationListStyleProps,
  getPaginationNavStyleProps
} from './Pagination.styles';

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

function getStyleOptions({ className, style }: BaseStyleProps) {
  return { className, style };
}

export interface PaginationProps extends HTMLAttributes<HTMLElement>, BaseStyleProps {
  ref?: Ref<HTMLElement>;
}

export interface PaginationContentProps extends HTMLAttributes<HTMLUListElement>, BaseStyleProps {
  ref?: Ref<HTMLUListElement>;
}

export interface PaginationItemProps extends LiHTMLAttributes<HTMLLIElement>, BaseStyleProps {
  ref?: Ref<HTMLLIElement>;
}

export interface PaginationLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>, BaseStyleProps {
  ref?: Ref<HTMLAnchorElement>;
  isActive?: boolean;
}

export interface PaginationEllipsisProps extends HTMLAttributes<HTMLSpanElement>, BaseStyleProps {
  ref?: Ref<HTMLSpanElement>;
}

export function Pagination({
  ref,
  className,
  style,
  'aria-label': ariaLabel = 'Pagination',
  ...props
}: PaginationProps) {
  const styleProps = getPaginationNavStyleProps(getStyleOptions({ className, style }));
  return <nav {...props} {...styleProps} ref={ref} aria-label={ariaLabel} />;
}

export function PaginationContent({ ref, className, style, ...props }: PaginationContentProps) {
  const styleProps = getPaginationListStyleProps(getStyleOptions({ className, style }));
  return <ul {...props} {...styleProps} ref={ref} />;
}

export function PaginationItem({ ref, className, style, ...props }: PaginationItemProps) {
  const styleProps = getPaginationItemStyleProps(getStyleOptions({ className, style }));
  return <li {...props} {...styleProps} ref={ref} />;
}

export function PaginationLink({
  ref,
  className,
  style,
  isActive = false,
  'aria-current': ariaCurrentProp,
  'aria-disabled': ariaDisabledProp,
  onClick,
  ...props
}: PaginationLinkProps) {
  const disabled = ariaDisabledProp === true || ariaDisabledProp === 'true';
  const styleProps = getPaginationLinkStyleProps(
    isActive,
    disabled,
    getStyleOptions({ className, style })
  );
  const ariaCurrent = isActive ? 'page' : ariaCurrentProp;

  return (
    <a
      {...props}
      {...styleProps}
      ref={ref}
      aria-current={ariaCurrent}
      aria-disabled={ariaDisabledProp}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
    />
  );
}

export function PaginationPrevious(props: PaginationLinkProps) {
  return (
    <PaginationLink aria-label={props['aria-label'] ?? 'Go to previous page'} {...props}>
      ‹ Prev
    </PaginationLink>
  );
}

export function PaginationNext(props: PaginationLinkProps) {
  return (
    <PaginationLink aria-label={props['aria-label'] ?? 'Go to next page'} {...props}>
      Next ›
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  ref,
  className,
  style,
  children = '...',
  'aria-hidden': ariaHidden = true,
  ...props
}: PaginationEllipsisProps) {
  const styleProps = getPaginationEllipsisStyleProps(getStyleOptions({ className, style }));
  return (
    <span {...props} {...styleProps} ref={ref} aria-hidden={ariaHidden}>
      {children}
    </span>
  );
}
