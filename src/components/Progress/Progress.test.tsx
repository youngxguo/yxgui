import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders a determinate progressbar with accessible attributes', () => {
    render(<Progress value={25} max={80} aria-label="Upload progress" />);

    const progress = screen.getByRole('progressbar', { name: 'Upload progress' });
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '80');
    expect(progress).toHaveAttribute('aria-valuenow', '25');
  });

  it('clamps out-of-range values and changes size class composition', () => {
    const { rerender } = render(<Progress value={200} max={100} size="sm" aria-label="Build" />);
    const progress = screen.getByRole('progressbar', { name: 'Build' });
    const baseClass = progress.className;

    expect(progress).toHaveAttribute('aria-valuenow', '100');

    rerender(<Progress value={10} size="lg" aria-label="Build" />);
    expect(progress.className).not.toEqual(baseClass);
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={50} aria-label="Sync" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
