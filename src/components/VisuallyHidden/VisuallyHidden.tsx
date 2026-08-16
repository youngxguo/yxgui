import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';

export type VisuallyHiddenProps = Omit<ComponentProps<'span'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    borderWidth: 0,
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px'
  }
});

export function VisuallyHidden(props: VisuallyHiddenProps) {
  return <span {...props} {...stylex.props(styles.root)} />;
}
