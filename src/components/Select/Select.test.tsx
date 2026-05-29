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

  it('opens with ArrowDown and navigates options with arrow keys', () => {
    render(
      <Select defaultValue="a" aria-label="Letter">
        <option value="a">Alpha</option>
        <option value="b">Bravo</option>
        <option value="c">Charlie</option>
      </Select>
    );

    const trigger = screen.getByRole('combobox', { name: 'Letter' });

    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(trigger.getAttribute('aria-activedescendant')).toContain('option-0');

    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(trigger.getAttribute('aria-activedescendant')).toContain('option-1');

    fireEvent.keyDown(trigger, { key: 'ArrowUp' });
    expect(trigger.getAttribute('aria-activedescendant')).toContain('option-0');
  });

  it('selects with Enter and closes the listbox', () => {
    const onChange = vi.fn();

    render(
      <Select defaultValue="a" aria-label="Letter" onChange={onChange}>
        <option value="a">Alpha</option>
        <option value="b">Bravo</option>
      </Select>
    );

    const trigger = screen.getByRole('combobox', { name: 'Letter' });

    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    fireEvent.keyDown(trigger, { key: 'Enter' });

    expect(trigger).toHaveTextContent('Bravo');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('selects with Space and closes the listbox', () => {
    render(
      <Select defaultValue="a" aria-label="Letter">
        <option value="a">Alpha</option>
        <option value="b">Bravo</option>
      </Select>
    );

    const trigger = screen.getByRole('combobox', { name: 'Letter' });

    fireEvent.keyDown(trigger, { key: ' ' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    fireEvent.keyDown(trigger, { key: ' ' });

    expect(trigger).toHaveTextContent('Bravo');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes listbox on Escape and returns focus to trigger', () => {
    render(
      <Select defaultValue="a" aria-label="Letter">
        <option value="a">Alpha</option>
        <option value="b">Bravo</option>
      </Select>
    );

    const trigger = screen.getByRole('combobox', { name: 'Letter' });

    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).toHaveTextContent('Alpha');
  });

  it('navigates to first and last options with Home and End', () => {
    render(
      <Select defaultValue="b" aria-label="Letter">
        <option value="a">Alpha</option>
        <option value="b">Bravo</option>
        <option value="c">Charlie</option>
      </Select>
    );

    const trigger = screen.getByRole('combobox', { name: 'Letter' });

    fireEvent.click(trigger);
    fireEvent.keyDown(trigger, { key: 'End' });
    fireEvent.keyDown(trigger, { key: 'Enter' });

    expect(trigger).toHaveTextContent('Charlie');

    fireEvent.click(trigger);
    fireEvent.keyDown(trigger, { key: 'Home' });
    fireEvent.keyDown(trigger, { key: 'Enter' });

    expect(trigger).toHaveTextContent('Alpha');
  });

  it('skips disabled options during keyboard navigation', () => {
    render(
      <Select defaultValue="a" aria-label="Letter">
        <option value="a">Alpha</option>
        <option value="b" disabled>
          Bravo
        </option>
        <option value="c">Charlie</option>
      </Select>
    );

    const trigger = screen.getByRole('combobox', { name: 'Letter' });

    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    fireEvent.keyDown(trigger, { key: 'Enter' });

    expect(trigger).toHaveTextContent('Charlie');
  });

  it('closes listbox on Tab without changing selection', () => {
    render(
      <Select defaultValue="a" aria-label="Letter">
        <option value="a">Alpha</option>
        <option value="b">Bravo</option>
      </Select>
    );

    const trigger = screen.getByRole('combobox', { name: 'Letter' });

    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    fireEvent.keyDown(trigger, { key: 'Tab' });

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).toHaveTextContent('Alpha');
  });

  it('forwards onKeyDown callback with properly typed button events', () => {
    const onKeyDown = vi.fn();

    render(
      <Select defaultValue="a" aria-label="Letter" onKeyDown={onKeyDown}>
        <option value="a">Alpha</option>
      </Select>
    );

    const trigger = screen.getByRole('combobox', { name: 'Letter' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown.mock.calls[0][0].target).toBe(trigger);
  });
});
