import type {
  CSSProperties,
  HTMLAttributes,
  Ref,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes
} from 'react';
import {
  getTableBodyStyleProps,
  getTableCaptionStyleProps,
  getTableCellStyleProps,
  getTableFooterStyleProps,
  getTableHeadCellStyleProps,
  getTableHeaderStyleProps,
  getTableRootStyleProps,
  getTableRowStyleProps
} from './Table.styles';

interface TableBaseProps {
  className?: string;
  style?: CSSProperties;
}

function slotStyleOptions({ className, style }: TableBaseProps) {
  return { className, style };
}

export interface TableProps extends TableHTMLAttributes<HTMLTableElement>, TableBaseProps {
  ref?: Ref<HTMLTableElement>;
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement>, TableBaseProps {
  ref?: Ref<HTMLTableSectionElement>;
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement>, TableBaseProps {
  ref?: Ref<HTMLTableSectionElement>;
}

export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement>, TableBaseProps {
  ref?: Ref<HTMLTableSectionElement>;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement>, TableBaseProps {
  ref?: Ref<HTMLTableRowElement>;
}

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement>, TableBaseProps {
  ref?: Ref<HTMLTableCellElement>;
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement>, TableBaseProps {
  ref?: Ref<HTMLTableCellElement>;
}

export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement>, TableBaseProps {
  ref?: Ref<HTMLTableCaptionElement>;
}

export function Table({ ref, className, style, ...props }: TableProps) {
  const styleProps = getTableRootStyleProps(slotStyleOptions({ className, style }));
  return <table {...props} {...styleProps} ref={ref} />;
}

export function TableHeader({ ref, className, style, ...props }: TableHeaderProps) {
  const styleProps = getTableHeaderStyleProps(slotStyleOptions({ className, style }));
  return <thead {...props} {...styleProps} ref={ref} />;
}

export function TableBody({ ref, className, style, ...props }: TableBodyProps) {
  const styleProps = getTableBodyStyleProps(slotStyleOptions({ className, style }));
  return <tbody {...props} {...styleProps} ref={ref} />;
}

export function TableFooter({ ref, className, style, ...props }: TableFooterProps) {
  const styleProps = getTableFooterStyleProps(slotStyleOptions({ className, style }));
  return <tfoot {...props} {...styleProps} ref={ref} />;
}

export function TableRow({ ref, className, style, ...props }: TableRowProps) {
  const styleProps = getTableRowStyleProps(slotStyleOptions({ className, style }));
  return <tr {...props} {...styleProps} ref={ref} />;
}

export function TableHead({ ref, className, style, ...props }: TableHeadProps) {
  const styleProps = getTableHeadCellStyleProps(slotStyleOptions({ className, style }));
  return <th {...props} {...styleProps} ref={ref} />;
}

export function TableCell({ ref, className, style, ...props }: TableCellProps) {
  const styleProps = getTableCellStyleProps(slotStyleOptions({ className, style }));
  return <td {...props} {...styleProps} ref={ref} />;
}

export function TableCaption({ ref, className, style, ...props }: TableCaptionProps) {
  const styleProps = getTableCaptionStyleProps(slotStyleOptions({ className, style }));
  return <caption {...props} {...styleProps} ref={ref} />;
}
