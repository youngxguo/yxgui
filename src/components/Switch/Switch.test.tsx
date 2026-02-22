import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('toggles unchecked and checked state', () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Email notifications" onCheckedChange={onCheckedChange} />);

    const control = screen.getByRole('switch', { name: 'Email notifications' });
    expect(control).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(control);

    expect(control).toHaveAttribute('aria-checked', 'true');
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('supports controlled usage and disabled state', () => {
    const onCheckedChange = vi.fn();
    const { rerender } = render(
      <Switch aria-label="Dark mode" checked={false} onCheckedChange={onCheckedChange} />
    );

    const control = screen.getByRole('switch', { name: 'Dark mode' });
    const baseClass = control.className;

    fireEvent.click(control);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(control).toHaveAttribute('aria-checked', 'false');

    rerender(<Switch aria-label="Dark mode" checked disabled />);
    expect(control).toBeDisabled();
    expect(control.className).not.toEqual(baseClass);
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Switch ref={ref} aria-label="Auto save" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
