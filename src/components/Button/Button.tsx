import type { ButtonHTMLAttributes, Ref } from 'react';
import * as stylex from '@stylexjs/stylex';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const buttonStyles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 'var(--yx-radius-pill)',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: 'var(--yx-palette-foreground)',
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: 'var(--yx-typography-font-family)',
    fontWeight: 'var(--yx-typography-font-weight-strong)',
    gap: 'var(--yx-spacing-xs)',
    justifyContent: 'center',
    lineHeight: 'var(--yx-typography-line-height-tight)',
    transitionDuration: '120ms',
    transitionProperty: 'transform, box-shadow, background-color, border-color',
    transitionTimingFunction: 'ease'
  },
  focusVisible: {
    ':focus-visible': {
      outlineColor: 'var(--yx-palette-focus-ring)',
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineWidth: '2px'
    }
  },
  disabled: {
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 'var(--yx-components-button-disabled-opacity)'
    }
  },
  active: {
    ':not(:disabled):active': {
      transform: 'translateY(var(--yx-components-button-active-offset))'
    }
  },
  primary: {
    backgroundColor: 'var(--yx-components-button-primary-background)',
    color: 'var(--yx-components-button-primary-foreground)'
  },
  primaryHover: {
    ':not(:disabled):hover': {
      boxShadow: 'var(--yx-components-button-primary-hover-shadow)'
    }
  },
  secondary: {
    backgroundColor: 'var(--yx-components-button-secondary-background)',
    borderColor: 'var(--yx-components-button-secondary-border)',
    color: 'var(--yx-components-button-secondary-foreground)'
  },
  secondaryHover: {
    ':not(:disabled):hover': {
      borderColor: 'var(--yx-components-button-secondary-hover-border)'
    }
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--yx-components-button-ghost-foreground)'
  },
  ghostHover: {
    ':not(:disabled):hover': {
      backgroundColor: 'var(--yx-components-button-ghost-hover-background)'
    }
  },
  sm: {
    fontSize: 'var(--yx-typography-font-size-sm)',
    minHeight: 'var(--yx-components-button-min-height-sm)',
    padding: 'var(--yx-components-button-padding-sm)'
  },
  md: {
    fontSize: 'var(--yx-typography-font-size-md)',
    minHeight: 'var(--yx-components-button-min-height-md)',
    padding: 'var(--yx-components-button-padding-md)'
  },
  lg: {
    fontSize: 'var(--yx-typography-font-size-lg)',
    minHeight: 'var(--yx-components-button-min-height-lg)',
    padding: 'var(--yx-components-button-padding-lg)'
  }
});

function getVariantStyle(variant: NonNullable<ButtonProps['variant']>) {
  switch (variant) {
    case 'secondary':
      return buttonStyles.secondary;
    case 'ghost':
      return buttonStyles.ghost;
    case 'primary':
    default:
      return buttonStyles.primary;
  }
}

function getVariantHoverStyle(variant: NonNullable<ButtonProps['variant']>) {
  switch (variant) {
    case 'secondary':
      return buttonStyles.secondaryHover;
    case 'ghost':
      return buttonStyles.ghostHover;
    case 'primary':
    default:
      return buttonStyles.primaryHover;
  }
}

function getSizeStyle(size: NonNullable<ButtonProps['size']>) {
  switch (size) {
    case 'sm':
      return buttonStyles.sm;
    case 'lg':
      return buttonStyles.lg;
    case 'md':
    default:
      return buttonStyles.md;
  }
}

export function Button({
  ref,
  variant = 'primary',
  size = 'md',
  className,
  style,
  type = 'button',
  ...props
}: ButtonProps) {
  const stylexResult = stylex.props(
    buttonStyles.root,
    buttonStyles.focusVisible,
    buttonStyles.disabled,
    buttonStyles.active,
    getVariantStyle(variant),
    getVariantHoverStyle(variant),
    getSizeStyle(size)
  );
  const mergedClassName = [stylexResult.className, className].filter(Boolean).join(' ');
  const mergedStyle =
    stylexResult.style != null || style != null ? { ...stylexResult.style, ...style } : undefined;

  return (
    <button
      {...props}
      {...stylexResult}
      ref={ref}
      type={type}
      className={mergedClassName}
      style={mergedStyle}
    />
  );
}
