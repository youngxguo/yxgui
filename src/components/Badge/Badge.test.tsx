import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('changes style class composition with variant and size', () => {
    const { rerender } = render(
      <Badge variant="success" size="sm">
        New
      </Badge>
    );

    const badge = screen.getByText('New');
    const baseClassName = badge.className;

    rerender(
      <Badge variant="error" size="md">
        New
      </Badge>
    );

    expect(badge.className).not.toEqual(baseClassName);
  });

  it('forwards native span props', () => {
    render(
      <Badge data-testid="status" title="Published">
        New
      </Badge>
    );

    expect(screen.getByTestId('status')).toHaveAttribute('title', 'Published');
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>New</Badge>);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
