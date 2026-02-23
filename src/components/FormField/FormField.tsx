import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useId,
  type CSSProperties,
  type HTMLAttributes,
  type LabelHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref
} from 'react';
import { getDataPresenceAttribute, isAriaBooleanTrue } from '../_internal/dataAttributes';
import { Label } from '../Label/Label';
import { Typography } from '../Typography/Typography';
import {
  getFormFieldControlStyleProps,
  getFormFieldDescriptionStyleProps,
  getFormFieldErrorStyleProps,
  getFormFieldRootStyleProps
} from './FormField.styles';

interface FormFieldContextValue {
  controlId: string;
  descriptionId: string;
  errorId: string;
  invalid: boolean;
  required: boolean;
  hasDescription: boolean;
  hasError: boolean;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

function useFormFieldContext(componentName: string) {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error(`${componentName} must be used within FormField`);
  }
  return context;
}

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
  id?: string;
  invalid?: boolean;
  required?: boolean;
  children?: ReactNode;
}

export interface FormFieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement>, BaseStyleProps {
  ref?: Ref<HTMLLabelElement>;
}

export interface FormFieldControlProps extends BaseStyleProps {
  children: ReactElement<Record<string, unknown>>;
}

export interface FormFieldDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement>, BaseStyleProps {
  ref?: Ref<HTMLParagraphElement>;
}

export interface FormFieldErrorProps extends HTMLAttributes<HTMLParagraphElement>, BaseStyleProps {
  ref?: Ref<HTMLParagraphElement>;
}

function buildDescribedByIds(context: FormFieldContextValue) {
  const ids = [
    context.hasDescription ? context.descriptionId : null,
    context.hasError ? context.errorId : null
  ]
    .filter(Boolean)
    .join(' ');

  return ids || undefined;
}

export function FormField({
  ref,
  id,
  invalid = false,
  required = false,
  className,
  style,
  children,
  ...props
}: FormFieldProps) {
  const generatedId = useId();
  const baseId = id ?? generatedId;
  const childArray = Array.isArray(children) ? children : [children];
  const hasDescription = childArray.some(
    (child) => isValidElement(child) && child.type === FormFieldDescription
  );
  const hasError = childArray.some(
    (child) => isValidElement(child) && child.type === FormFieldError
  );

  const contextValue: FormFieldContextValue = {
    controlId: `${baseId}-control`,
    descriptionId: `${baseId}-description`,
    errorId: `${baseId}-error`,
    invalid,
    required,
    hasDescription,
    hasError
  };

  const styleProps = getFormFieldRootStyleProps({ className, style });

  return (
    <FormFieldContext.Provider value={contextValue}>
      <div {...props} {...styleProps} ref={ref} data-invalid={getDataPresenceAttribute(invalid)}>
        {children}
      </div>
    </FormFieldContext.Provider>
  );
}

export function FormFieldLabel({ ref, className, style, ...props }: FormFieldLabelProps) {
  const context = useFormFieldContext('FormFieldLabel');

  return (
    <Label
      {...props}
      ref={ref}
      htmlFor={props.htmlFor ?? context.controlId}
      required={context.required}
      className={className}
      style={style}
    />
  );
}

export function FormFieldControl({ children, className, style }: FormFieldControlProps) {
  const context = useFormFieldContext('FormFieldControl');
  const styleProps = getFormFieldControlStyleProps({ className, style });

  if (!isValidElement(children)) {
    return children;
  }

  const childProps = children.props as Record<string, unknown>;
  const describedBy = [childProps['aria-describedby'], buildDescribedByIds(context)]
    .filter(Boolean)
    .join(' ')
    .trim();

  return cloneElement(children as ReactElement<Record<string, unknown>>, {
    ...styleProps,
    id: (childProps.id as string | undefined) ?? context.controlId,
    required: (childProps.required as boolean | undefined) ?? context.required,
    invalid: (childProps.invalid as boolean | undefined) ?? context.invalid,
    'aria-invalid':
      context.invalid ||
      isAriaBooleanTrue(childProps['aria-invalid'] as boolean | string | undefined)
        ? true
        : undefined,
    'aria-describedby': describedBy || undefined
  });
}

export function FormFieldDescription({
  ref,
  className,
  style,
  ...props
}: FormFieldDescriptionProps) {
  const context = useFormFieldContext('FormFieldDescription');
  const styleProps = getFormFieldDescriptionStyleProps({ className, style });

  return (
    <Typography
      {...props}
      {...styleProps}
      ref={ref as Ref<HTMLElement>}
      as="p"
      variant="muted"
      id={props.id ?? context.descriptionId}
    />
  );
}

export function FormFieldError({ ref, className, style, ...props }: FormFieldErrorProps) {
  const context = useFormFieldContext('FormFieldError');
  const styleProps = getFormFieldErrorStyleProps({ className, style });

  return (
    <Typography
      {...props}
      {...styleProps}
      ref={ref as Ref<HTMLElement>}
      as="p"
      variant="small"
      id={props.id ?? context.errorId}
      role="alert"
    />
  );
}
