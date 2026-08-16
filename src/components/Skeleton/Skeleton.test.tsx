import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('is decorative and forwards refs', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Skeleton data-testid="skeleton" ref={ref} />);

    expect(ref.current).toBe(screen.getByTestId('skeleton'));
    expect(ref.current).toHaveAttribute('aria-hidden', 'true');
  });

  it('composes distinct shape and size styles', () => {
    const { rerender } = render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    const textClass = skeleton.className;

    rerender(<Skeleton data-testid="skeleton" size="lg" variant="avatar" />);
    expect(skeleton.className).not.toBe(textClass);
  });
});
