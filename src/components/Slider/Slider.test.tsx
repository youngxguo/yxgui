import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  it('updates value from change events and calls onValueChange', () => {
    const onValueChange = vi.fn();
    render(<Slider aria-label="Volume" defaultValue={10} onValueChange={onValueChange} />);

    const slider = screen.getByRole('slider', { name: 'Volume' });
    fireEvent.change(slider, { target: { value: '35' } });

    expect(slider).toHaveValue('35');
    expect(onValueChange).toHaveBeenCalledWith(35);
  });

  it('supports keyboard updates', () => {
    render(<Slider aria-label="Brightness" defaultValue={50} step={10} />);

    const slider = screen.getByRole('slider', { name: 'Brightness' });
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider).toHaveValue('60');

    fireEvent.keyDown(slider, { key: 'Home' });
    expect(slider).toHaveValue('0');
  });

  it('supports controlled and disabled state', () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <Slider aria-label="Zoom" value={20} onValueChange={onValueChange} disabled />
    );

    const slider = screen.getByRole('slider', { name: 'Zoom' });
    expect(slider).toBeDisabled();

    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(onValueChange).toHaveBeenCalledWith(21);

    rerender(<Slider aria-label="Zoom" value={40} />);
    expect(slider).toHaveValue('40');
  });
});
