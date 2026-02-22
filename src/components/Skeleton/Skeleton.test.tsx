import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders text, rect, and circle placeholders', () => {
    const { rerender } = render(<Skeleton data-testid="skeleton" variant="text" width={120} />);
    const skeleton = screen.getByTestId('skeleton');
    const textClass = skeleton.className;

    rerender(<Skeleton data-testid="skeleton" variant="rect" width={160} height={80} />);
    expect(skeleton.className).not.toEqual(textClass);

    rerender(<Skeleton data-testid="skeleton" variant="circle" />);
    expect(skeleton).toHaveAttribute('data-animated', 'true');
  });

  it('supports disabling animation for reduced-motion usage', () => {
    render(<Skeleton data-testid="skeleton" animated={false} />);
    expect(screen.getByTestId('skeleton')).toHaveAttribute('data-animated', 'false');
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
