import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Separator } from './Separator';

describe('Separator', () => {
  it('renders an accessible separator by default', () => {
    render(<Separator />);

    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('changes style class composition with orientation', () => {
    const { rerender } = render(<Separator orientation="horizontal" />);

    const separator = screen.getByRole('separator');
    const baseClassName = separator.className;

    rerender(<Separator orientation="vertical" />);

    expect(separator.className).not.toEqual(baseClassName);
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('supports decorative separators', () => {
    render(<Separator decorative data-testid="decorative" />);

    expect(screen.getByTestId('decorative')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Separator ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
