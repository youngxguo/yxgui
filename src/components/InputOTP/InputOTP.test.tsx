import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './InputOTP';

describe('InputOTP', () => {
  it('supports keyboard input and onValueChange contract', () => {
    const onValueChange = vi.fn();
    render(<InputOTP length={4} onValueChange={onValueChange} />);

    const first = screen.getByRole('textbox', { name: 'Digit 1' });
    const second = screen.getByRole('textbox', { name: 'Digit 2' });

    fireEvent.change(first, { target: { value: '1' } });

    expect(first).toHaveValue('1');
    expect(second).toHaveFocus();
    expect(onValueChange).toHaveBeenCalledWith('1');
  });

  it('supports backspace navigation and clearing', () => {
    render(<InputOTP length={4} defaultValue="12" />);

    const second = screen.getByRole('textbox', { name: 'Digit 2' });
    second.focus();
    fireEvent.keyDown(second, { key: 'Backspace' });
    expect(second).toHaveValue('');

    fireEvent.keyDown(second, { key: 'Backspace' });
    expect(screen.getByRole('textbox', { name: 'Digit 1' })).toHaveFocus();
  });

  it('distributes pasted values across slots', () => {
    render(<InputOTP length={6} />);

    const first = screen.getByRole('textbox', { name: 'Digit 1' });
    fireEvent.paste(first, {
      clipboardData: {
        getData: () => '123456'
      }
    });

    expect(screen.getByRole('textbox', { name: 'Digit 1' })).toHaveValue('1');
    expect(screen.getByRole('textbox', { name: 'Digit 6' })).toHaveValue('6');
  });

  it('supports composed slots and disabled state', () => {
    render(
      <InputOTP length={4} disabled>
        <InputOTPGroup>
          <InputOTPSlot index={0} aria-label="Code 1" />
          <InputOTPSlot index={1} aria-label="Code 2" />
          <InputOTPSeparator />
          <InputOTPSlot index={2} aria-label="Code 3" />
          <InputOTPSlot index={3} aria-label="Code 4" />
        </InputOTPGroup>
      </InputOTP>
    );

    expect(screen.getByRole('textbox', { name: 'Code 1' })).toBeDisabled();
    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
