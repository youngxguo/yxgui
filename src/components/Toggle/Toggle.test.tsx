import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('toggles pressed state and updates aria-pressed', () => {
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Bold</Toggle>);

    const button = screen.getByRole('button', { name: 'Bold' });
    expect(button).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it('supports controlled usage and disabled state', () => {
    const onPressedChange = vi.fn();
    const { rerender } = render(
      <Toggle pressed={false} onPressedChange={onPressedChange}>
        Mute
      </Toggle>
    );

    const button = screen.getByRole('button', { name: 'Mute' });
    fireEvent.click(button);

    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(button).toHaveAttribute('aria-pressed', 'false');

    rerender(
      <Toggle pressed onPressedChange={onPressedChange} disabled>
        Mute
      </Toggle>
    );

    fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(onPressedChange).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard activation', async () => {
    const user = userEvent.setup();
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Italic</Toggle>);

    const button = screen.getByRole('button', { name: 'Italic' });

    await user.tab();
    expect(button).toHaveFocus();

    await user.keyboard('[Space]');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(onPressedChange).toHaveBeenLastCalledWith(true);

    await user.keyboard('[Enter]');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(onPressedChange).toHaveBeenLastCalledWith(false);
  });

  it('changes style class composition with variant and size', () => {
    const { rerender } = render(
      <Toggle variant="secondary" size="md">
        Underline
      </Toggle>
    );

    const button = screen.getByRole('button', { name: 'Underline' });
    const baseClassName = button.className;

    rerender(
      <Toggle variant="ghost" size="lg" defaultPressed>
        Underline
      </Toggle>
    );

    expect(button.className).not.toEqual(baseClassName);
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Toggle ref={ref}>Code</Toggle>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
