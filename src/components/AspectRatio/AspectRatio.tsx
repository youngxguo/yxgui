import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';

export type AspectRatioProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  ratio?: number;
};

const styles = stylex.create({
  root: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  },
  content: {
    inset: 0,
    position: 'absolute'
  }
});

export function AspectRatio({ children, ratio = 16 / 9, ...props }: AspectRatioProps) {
  const safeRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 16 / 9;

  return (
    <div
      {...props}
      data-aspect-ratio={safeRatio}
      {...stylex.props(styles.root)}
      style={{ aspectRatio: String(safeRatio) }}
    >
      <div data-aspect-ratio-content="" {...stylex.props(styles.content)}>
        {children}
      </div>
    </div>
  );
}
