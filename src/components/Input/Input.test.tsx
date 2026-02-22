import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders a textbox and forwards native props', () => {
    render(<Input placeholder="Email" type="email" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Email');
  });

  it('changes style class composition with size and invalid state', () => {
    const { rerender } = render(<Input size="sm" placeholder="Name" />);

    const input = screen.getByRole('textbox');
    const baseClassName = input.className;

    rerender(<Input size="lg" invalid placeholder="Name" />);

    expect(input.className).not.toEqual(baseClassName);
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Email" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
