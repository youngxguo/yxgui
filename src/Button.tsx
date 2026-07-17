import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef } from 'react';
import { tokens } from './tokens.stylex';

export type ButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    borderColor: 'transparent',
    borderRadius: tokens['--yxg-radius-control'],
    borderStyle: 'solid',
    borderWidth: 1,
    gap: tokens['--yxg-control-gap'],
    paddingInline: tokens['--yxg-control-padding-inline'],
    alignItems: 'center',
    backgroundColor: {
      default: tokens['--yxg-color-accent-solid'],
      ':active:not(:disabled)': tokens['--yxg-color-accent-solid-pressed'],
      ':hover:not(:disabled)': tokens['--yxg-color-accent-solid-hover']
    },
    boxSizing: 'border-box',
    color: tokens['--yxg-color-accent-contrast'],
    cursor: {
      default: 'pointer',
      ':disabled': 'not-allowed'
    },
    display: 'inline-flex',
    fontFamily: tokens['--yxg-font-label-family'],
    fontSize: tokens['--yxg-font-label-size'],
    fontWeight: tokens['--yxg-font-label-weight'],
    justifyContent: 'center',
    letterSpacing: tokens['--yxg-font-label-letter-spacing'],
    lineHeight: tokens['--yxg-font-label-line-height'],
    opacity: {
      default: 1,
      ':disabled': tokens['--yxg-opacity-disabled']
    },
    outlineColor: {
      default: 'transparent',
      ':focus-visible': tokens['--yxg-color-focus-ring']
    },
    outlineOffset: 3,
    outlineStyle: 'solid',
    outlineWidth: 2,
    transitionDuration: tokens['--yxg-duration-fast'],
    transitionProperty: 'background-color, color',
    transitionTimingFunction: tokens['--yxg-ease-standard'],
    userSelect: 'none',
    height: tokens['--yxg-control-height']
  }
});

export function Button({ type = 'button', ...props }: ButtonProps) {
  return <button type={type} {...props} {...stylex.props(styles.root)} />;
}
