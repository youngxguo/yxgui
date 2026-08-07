import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';

export type ButtonProps = Omit<ComponentProps<'button'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    boxSizing: 'border-box'
  }
});

export function Button(props: ButtonProps) {
  return <button {...props} {...stylex.props(styles.root)} />;
}
