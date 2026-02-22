import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

describe('ToggleGroup', () => {
  it('supports single selection mode', () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="single" onValueChange={onValueChange}>
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>
    );

    const bold = screen.getByRole('button', { name: 'Bold' });
    fireEvent.click(bold);

    expect(bold).toHaveAttribute('aria-pressed', 'true');
    expect(onValueChange).toHaveBeenCalledWith('bold');
  });

  it('supports multiple mode and disabled items', () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="multiple" onValueChange={onValueChange}>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center" disabled>
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Left' }));
    fireEvent.click(screen.getByRole('button', { name: 'Right' }));
    fireEvent.click(screen.getByRole('button', { name: 'Center' }));

    expect(onValueChange).toHaveBeenNthCalledWith(1, ['left']);
    expect(onValueChange).toHaveBeenNthCalledWith(2, ['left', 'right']);
    expect(onValueChange).toHaveBeenCalledTimes(2);
  });

  it('moves focus with arrow keys across enabled items', () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b" disabled>
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="c">C</ToggleGroupItem>
      </ToggleGroup>
    );

    const a = screen.getByRole('button', { name: 'A' });
    const c = screen.getByRole('button', { name: 'C' });
    a.focus();
    fireEvent.keyDown(a, { key: 'ArrowRight' });

    expect(c).toHaveFocus();
  });
});
