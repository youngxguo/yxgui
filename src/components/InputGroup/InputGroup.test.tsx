import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from './InputGroup';

describe('InputGroup', () => {
  it('preserves native input and action behavior', () => {
    const ref = createRef<HTMLInputElement>();
    const onAction = vi.fn();
    render(
      <InputGroup aria-label="Website field">
        <InputGroupAddon>https://</InputGroupAddon>
        <InputGroupInput aria-label="Website" name="website" ref={ref} />
        <InputGroupButton onClick={onAction}>Visit</InputGroupButton>
      </InputGroup>
    );

    const input = screen.getByRole('textbox', { name: 'Website' });
    expect(ref.current).toBe(input);
    expect(input).toHaveAttribute('name', 'website');
    fireEvent.change(input, { target: { value: 'example.com' } });
    expect(input).toHaveValue('example.com');
    fireEvent.click(screen.getByRole('button', { name: 'Visit' }));
    expect(onAction).toHaveBeenCalledOnce();
  });

  it('propagates disabled and invalid group state to controls', () => {
    render(
      <InputGroup disabled invalid>
        <InputGroupInput aria-label="Amount" />
        <InputGroupButton>Apply</InputGroupButton>
      </InputGroup>
    );
    expect(screen.getByRole('textbox', { name: 'Amount' })).toBeDisabled();
    expect(screen.getByRole('textbox', { name: 'Amount' })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('button', { name: 'Apply' })).toBeDisabled();
  });

  it('supports native multiline input and controls embedded in block addons', () => {
    const ref = createRef<HTMLTextAreaElement>();
    const onSend = vi.fn();
    render(
      <InputGroup>
        <InputGroupTextarea aria-label="Message" name="message" ref={ref} />
        <InputGroupAddon align="block-end">
          <InputGroupText>Markdown supported</InputGroupText>
          <InputGroupButton onClick={onSend}>Send</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );

    const textarea = screen.getByRole('textbox', { name: 'Message' });
    expect(ref.current).toBe(textarea);
    fireEvent.change(textarea, { target: { value: 'Hello from yxgui' } });
    expect(textarea).toHaveValue('Hello from yxgui');
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSend).toHaveBeenCalledOnce();
  });
});
