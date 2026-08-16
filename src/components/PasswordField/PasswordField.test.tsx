import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { PasswordField } from './PasswordField';

describe('PasswordField', () => {
  it('toggles visibility without replacing the native input', () => {
    const inputRef = createRef<HTMLInputElement>();
    const onVisibleChange = vi.fn();
    render(
      <PasswordField
        defaultValue="secret"
        inputRef={inputRef}
        label="Password"
        onVisibleChange={onVisibleChange}
      />
    );
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveValue('secret');
    expect(inputRef.current).toBe(input);
    expect(onVisibleChange).toHaveBeenCalledWith(true);
  });

  it('keeps controlled visibility authoritative', () => {
    const onVisibleChange = vi.fn();
    render(<PasswordField label="Password" onVisibleChange={onVisibleChange} visible={false} />);
    fireEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(onVisibleChange).toHaveBeenCalledWith(true);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });
});
