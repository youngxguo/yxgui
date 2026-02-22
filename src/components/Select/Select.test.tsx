import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Select } from './Select';

describe('Select', () => {
  it('renders a combobox and forwards native props', () => {
    render(
      <Select defaultValue="pro" name="plan">
        <option value="free">Free</option>
        <option value="pro">Pro</option>
      </Select>
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('name', 'plan');
    expect(select).toHaveValue('pro');
  });

  it('changes style class composition with size and invalid state', () => {
    const { rerender } = render(
      <Select size="sm" aria-label="Plan">
        <option>Starter</option>
      </Select>
    );

    const select = screen.getByRole('combobox', { name: 'Plan' });
    const baseClassName = select.className;

    rerender(
      <Select size="lg" invalid aria-label="Plan">
        <option>Starter</option>
      </Select>
    );

    expect(select.className).not.toEqual(baseClassName);
    expect(select).toHaveAttribute('aria-invalid', 'true');
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select ref={ref} aria-label="Plan">
        <option>Starter</option>
      </Select>
    );

    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
});
