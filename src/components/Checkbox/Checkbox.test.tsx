import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders a checkbox and forwards native props', () => {
    render(<Checkbox name="terms" defaultChecked aria-label="Accept terms" />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox).toHaveAttribute('name', 'terms');
    expect(checkbox).toBeChecked();
  });

  it('calls onChange when toggled', () => {
    const onChange = vi.fn();
    render(<Checkbox aria-label="Newsletter" onChange={onChange} />);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Newsletter' }));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('changes style class composition with size and invalid state', () => {
    const { rerender } = render(<Checkbox size="sm" aria-label="Updates" />);

    const checkbox = screen.getByRole('checkbox', { name: 'Updates' });
    const baseClassName = checkbox.className;

    rerender(<Checkbox size="md" invalid aria-label="Updates" />);

    expect(checkbox.className).not.toEqual(baseClassName);
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} aria-label="Updates" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
