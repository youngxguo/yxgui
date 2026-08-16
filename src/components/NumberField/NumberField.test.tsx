import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { NumberField } from './NumberField';

describe('NumberField', () => {
  it('increments and decrements within the configured range', () => {
    const onValueChange = vi.fn();
    render(
      <NumberField defaultValue={2} label="Seats" max={3} min={0} onValueChange={onValueChange} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Increase' }));
    expect(screen.getByRole('textbox', { name: 'Seats' })).toHaveValue('3');
    expect(onValueChange).toHaveBeenCalled();
  });

  it('forwards root and input refs', () => {
    const ref = createRef<HTMLDivElement>();
    const inputRef = createRef<HTMLInputElement>();
    render(<NumberField inputRef={inputRef} label="Seats" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
  });
});
