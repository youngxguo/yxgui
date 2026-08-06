import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';

export type ButtonProps = ComponentProps<'button'>;

const styles = stylex.create({
  root: {
    boxSizing: 'border-box'
  }
});

export function Button({ className, style, ...props }: ButtonProps) {
  const stylexProps = stylex.props(styles.root);

  return (
    <button
      {...props}
      className={[stylexProps.className, className].filter(Boolean).join(' ')}
      style={{ ...stylexProps.style, ...style }}
    />
  );
}
