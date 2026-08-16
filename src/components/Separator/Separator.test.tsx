import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Separator } from './Separator';

describe('Separator', () => {
  it('exposes orientation to assistive technology', () => {
    render(<Separator orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('supports a decorative mode and native refs', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Separator decorative data-testid="separator" ref={ref} />);

    expect(ref.current).toBe(screen.getByTestId('separator'));
    expect(ref.current).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  });
});
