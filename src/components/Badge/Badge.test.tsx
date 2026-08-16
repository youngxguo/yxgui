import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders content and forwards native props and refs', () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Badge ref={ref} title="Published" variant="success">
        Published
      </Badge>
    );

    expect(ref.current).toBe(screen.getByText('Published'));
    expect(ref.current).toHaveAttribute('title', 'Published');
  });

  it('composes distinct variant and size styles', () => {
    const { rerender } = render(<Badge>New</Badge>);
    const badge = screen.getByText('New');
    const defaultClass = badge.className;

    rerender(
      <Badge size="sm" variant="danger">
        New
      </Badge>
    );
    expect(badge.className).not.toBe(defaultClass);
  });
});
