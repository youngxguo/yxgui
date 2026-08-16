import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  it('supports keyboard value changes', () => {
    const onValueChange = vi.fn();
    render(<Slider defaultValue={40} label="Volume" onValueChange={onValueChange} />);
    const slider = screen.getByRole('slider', { name: 'Volume' });
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(onValueChange).toHaveBeenCalled();
    expect(slider).toHaveAttribute('aria-valuenow', '41');
  });

  it('labels both thumbs in a range', () => {
    render(
      <Slider defaultValue={[20, 75]} label="Price range" thumbLabels={['Minimum', 'Maximum']} />
    );
    expect(screen.getByRole('slider', { name: 'Minimum' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Maximum' })).toBeInTheDocument();
  });
});
