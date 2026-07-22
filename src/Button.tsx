import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef } from 'react';

export type ButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    borderColor: 'transparent',
    borderRadius: 'var(--yxg-radius-control)',
    borderStyle: 'solid',
    borderWidth: 1,
    gap: 'var(--yxg-control-gap)',
    paddingInline: 'var(--yxg-control-padding-inline)',
    alignItems: 'center',
    backgroundColor: {
      default: 'var(--yxg-color-accent-solid)',
      ':active:not(:disabled)': 'var(--yxg-color-accent-solid-pressed)',
      ':hover:not(:disabled)': 'var(--yxg-color-accent-solid-hover)'
    },
    boxSizing: 'border-box',
    color: 'var(--yxg-color-accent-contrast)',
    cursor: {
      default: 'pointer',
      ':disabled': 'not-allowed'
    },
    display: 'inline-flex',
    fontFamily: 'var(--yxg-font-label-family)',
    fontSize: 'var(--yxg-font-label-size)',
    fontWeight: 'var(--yxg-font-label-weight)',
    justifyContent: 'center',
    letterSpacing: 'var(--yxg-font-label-letter-spacing)',
    lineHeight: 'var(--yxg-font-label-line-height)',
    opacity: {
      default: 1,
      ':disabled': 'var(--yxg-opacity-disabled)'
    },
    outlineColor: {
      default: 'transparent',
      ':focus-visible': 'var(--yxg-color-focus-ring)'
    },
    outlineOffset: 3,
    outlineStyle: 'solid',
    outlineWidth: 2,
    transitionDuration: 'var(--yxg-duration-fast)',
    transitionProperty: 'background-color, color',
    transitionTimingFunction: 'var(--yxg-ease-standard)',
    userSelect: 'none',
    height: 'var(--yxg-control-height)'
  }
});

export function Button({ type = 'button', ...props }: ButtonProps) {
  return <button type={type} {...props} {...stylex.props(styles.root)} />;
}
