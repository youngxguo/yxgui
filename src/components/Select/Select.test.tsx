import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Select } from './Select';

function mockElementRect(
  element: HTMLElement,
  rect: { bottom: number; height: number; left: number }
) {
  Object.defineProperty(element, 'getBoundingClientRect', {
    value: () =>
      ({
        x: rect.left,
        y: rect.bottom - rect.height,
        top: rect.bottom - rect.height,
        right: rect.left,
        bottom: rect.bottom,
        left: rect.left,
        width: 0,
        height: rect.height,
        toJSON: () => ({})
      }) as DOMRect,
    configurable: true
  });
}

describe('Select', () => {
  it('renders a combobox trigger and updates value through menu selection', () => {
    const onChange = vi.fn();

    render(
      <Select defaultValue="free" name="plan" onChange={onChange}>
        <option value="free">Free</option>
        <option value="pro">Pro</option>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('name', 'plan');
    expect(trigger).toHaveTextContent('Free');

    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole('option', { name: 'Pro' }));

    expect(trigger).toHaveTextContent('Pro');
    expect(onChange).toHaveBeenCalledTimes(1);
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
      <Select ref={ref} defaultValue="starter" aria-label="Plan">
        <option value="starter">Starter</option>
      </Select>
    );

    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    expect(ref.current?.value).toBe('starter');
  });

  it('uses the compact default offset for listbox content', async () => {
    render(
      <Select aria-label="Plan">
        <option value="starter">Starter</option>
      </Select>
    );

    const trigger = screen.getByRole('combobox', { name: 'Plan' });
    mockElementRect(trigger, { bottom: 72, height: 32, left: 16 });

    fireEvent.click(trigger);

    const listbox = await screen.findByRole('listbox');
    await waitFor(() => expect(listbox).toHaveStyle({ left: '16px', top: '78px' }));
  });
});
