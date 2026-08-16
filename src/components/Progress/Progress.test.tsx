import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Progress } from './Progress';

describe('Progress', () => {
  it('clamps determinate values and exposes the range', () => {
    render(<Progress aria-label="Upload" max={80} value={120} />);
    const progress = screen.getByRole('progressbar', { name: 'Upload' });

    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '80');
    expect(progress).toHaveAttribute('aria-valuenow', '80');
    expect(progress.firstElementChild).toHaveStyle({ width: '100%' });
  });

  it('supports indeterminate progress and native refs', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Progress aria-label="Loading" ref={ref} />);

    expect(ref.current).toBe(screen.getByRole('progressbar', { name: 'Loading' }));
    expect(ref.current).not.toHaveAttribute('aria-valuenow');
    expect(ref.current).toHaveAttribute('data-state', 'indeterminate');
  });
});
