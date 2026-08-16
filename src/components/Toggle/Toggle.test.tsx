import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('toggles its uncontrolled pressed state', () => {
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Bold</Toggle>);
    fireEvent.click(screen.getByRole('button', { name: 'Bold' }));
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    expect(onPressedChange.mock.calls[0]?.[0]).toBe(true);
  });

  it('allows pressed changes to be canceled', () => {
    render(<Toggle onPressedChange={(_pressed, details) => details.cancel()}>Bold</Toggle>);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });
});
