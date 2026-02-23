import type { CSSProperties, Ref } from 'react';
import {
  Toaster as SonnerToasterPrimitive,
  toast as sonnerToastPrimitive,
  useSonner,
  type ExternalToast,
  type ToastClassnames,
  type ToasterProps as SonnerPrimitiveToasterProps
} from 'sonner';
import { mergeStylexProps } from '../../styles/mergeStylexProps';
import { spacingTokens } from '../../theme/tokens.stylex';
import {
  getSonnerButtonStyles,
  getSonnerThemeVariables,
  getSonnerToastBaseStyle,
  getSonnerToastClassNames,
  getSonnerToasterClassName
} from './Toast.styles';

export type ToastOptions = ExternalToast;
export type ToasterProps = SonnerPrimitiveToasterProps & {
  ref?: Ref<HTMLElement>;
};

function mergeClassNames(
  defaults: ToastClassnames,
  overrides?: ToastClassnames
): ToastClassnames | undefined {
  if (!overrides) {
    return defaults;
  }

  return {
    ...defaults,
    ...overrides
  };
}

export function Toaster({
  ref,
  className,
  style,
  theme = 'light',
  position = 'top-right',
  richColors = true,
  closeButton = true,
  visibleToasts = 4,
  expand = false,
  containerAriaLabel = 'Notifications',
  offset = spacingTokens.xxl,
  mobileOffset = spacingTokens.xl,
  toastOptions,
  ...props
}: ToasterProps) {
  const toasterStylexProps = mergeStylexProps(
    { className: getSonnerToasterClassName(), style: undefined },
    { className }
  );
  const themeVariables = getSonnerThemeVariables();
  const buttonStyles = getSonnerButtonStyles();
  const defaultToastClassNames = getSonnerToastClassNames();

  const mergedToastOptions = {
    duration: 4000,
    ...toastOptions,
    style: {
      ...getSonnerToastBaseStyle(),
      ...(toastOptions?.style ?? {})
    },
    actionButtonStyle: {
      ...buttonStyles.action,
      ...(toastOptions?.actionButtonStyle ?? {})
    },
    cancelButtonStyle: {
      ...buttonStyles.cancel,
      ...(toastOptions?.cancelButtonStyle ?? {})
    },
    classNames: mergeClassNames(defaultToastClassNames, toastOptions?.classNames),
    closeButtonAriaLabel: toastOptions?.closeButtonAriaLabel ?? 'Dismiss notification'
  } satisfies ToasterProps['toastOptions'];

  const mergedStyle = {
    ...(toasterStylexProps.style as CSSProperties | undefined),
    ...(themeVariables as CSSProperties),
    ...style
  };

  return (
    <SonnerToasterPrimitive
      {...props}
      ref={ref}
      className={toasterStylexProps.className}
      style={mergedStyle}
      theme={theme}
      position={position}
      richColors={richColors}
      closeButton={closeButton}
      visibleToasts={visibleToasts}
      expand={expand}
      containerAriaLabel={containerAriaLabel}
      offset={offset}
      mobileOffset={mobileOffset}
      toastOptions={mergedToastOptions}
    />
  );
}

export const toast = sonnerToastPrimitive;
export const useToasts = useSonner;
