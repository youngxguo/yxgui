import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { OTPField } from './OTPField';

describe('OTPField', () => {
  it('wires its label, description, slots, and root ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <OTPField
        description="Enter the code we sent."
        label="Verification code"
        length={4}
        ref={ref}
      />
    );

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
    expect(inputs[0]).toHaveAccessibleName('Verification code');
    expect(inputs[0]).toHaveAccessibleDescription('Enter the code we sent.');
    expect(inputs[1]).toHaveAccessibleName('Character 2 of 4');
    expect(ref.current).toContainElement(inputs[0]);
  });

  it('normalizes numeric values and reports completion', () => {
    const onValueChange = vi.fn();
    const onValueComplete = vi.fn();
    render(
      <OTPField
        label="Verification code"
        length={4}
        onValueChange={onValueChange}
        onValueComplete={onValueComplete}
      />
    );

    const firstInput = screen.getAllByRole('textbox')[0];
    fireEvent.change(firstInput, { target: { value: '12a34' } });
    expect(onValueChange).toHaveBeenLastCalledWith('1234', expect.any(Object));
    expect(onValueComplete).toHaveBeenCalledWith('1234', expect.any(Object));
  });
});
