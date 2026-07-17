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
    paddingInline: tokens['--yxg-control-padding-inline'],
    alignItems: 'center',
    backgroundColor: {
      default: tokens['--yxg-color-accent'],
      ':disabled': tokens['--yxg-color-border'],
      ':hover': tokens['--yxg-color-accent-hover']
    },
    boxSizing: 'border-box',
    color: {
      default: tokens['--yxg-color-on-accent'],
      ':disabled': tokens['--yxg-color-text-muted']
    },
    cursor: {
      default: 'pointer',
      ':disabled': 'not-allowed'
    },
    display: 'inline-flex',
    fontFamily: tokens['--yxg-font-body'],
    fontSize: '0.9375rem',
    fontWeight: 650,
    justifyContent: 'center',
    outlineColor: {
      default: 'transparent',
      ':focus-visible': tokens['--yxg-color-focus']
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
