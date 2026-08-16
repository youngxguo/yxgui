import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('toggles uncontrolled state and reports changes', () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Notifications" onCheckedChange={onCheckedChange} />);
    const control = screen.getByRole('switch', { name: 'Notifications' });

    expect(control).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(control);
    expect(control).toHaveAttribute('aria-checked', 'true');
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('keeps controlled state external and respects prevented clicks', () => {
    const onCheckedChange = vi.fn();
    render(
      <Switch
        aria-label="Dark mode"
        checked={false}
        onCheckedChange={onCheckedChange}
        onClick={(event) => event.preventDefault()}
      />
    );

    fireEvent.click(screen.getByRole('switch', { name: 'Dark mode' }));
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('supports disabled state and native refs', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Switch aria-label="Auto save" disabled ref={ref} />);

    expect(ref.current).toBe(screen.getByRole('switch', { name: 'Auto save' }));
    expect(ref.current).toBeDisabled();
  });
});
