import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Launch</Button>);

    expect(screen.getByRole('button', { name: 'Launch' })).toBeInTheDocument();
  });

  it('calls onClick when enabled', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Launch</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Launch' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Launch
      </Button>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Launch' }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('changes style class composition with variant and size', () => {
    const { rerender } = render(
      <Button variant="primary" size="md">
        Launch
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Launch' });
    const baseClassName = button.className;

    rerender(
      <Button variant="secondary" size="lg">
        Launch
      </Button>
    );

    expect(button.className).not.toEqual(baseClassName);
  });

  it('forwards native button props', () => {
    render(
      <Button type="submit" data-testid="submit-btn">
        Submit
      </Button>
    );

    expect(screen.getByTestId('submit-btn')).toHaveAttribute('type', 'submit');
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Launch</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
