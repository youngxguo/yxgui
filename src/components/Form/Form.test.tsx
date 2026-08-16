import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';
import { Field, FieldError, FieldLabel } from '../Field';
import { Input } from '../Input';
import { Form } from './Form';

describe('Form', () => {
  it('connects server errors to named fields', () => {
    render(
      <Form errors={{ email: 'That email is already registered.' }}>
        <Field name="email">
          <FieldLabel>Email</FieldLabel>
          <Input />
          <FieldError />
        </Field>
      </Form>
    );

    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('That email is already registered.');
    expect(screen.getByRole('alert')).toHaveTextContent('That email is already registered.');
  });

  it('submits consolidated field values', () => {
    const onFormSubmit = vi.fn();
    render(
      <Form<{ email: string }> onFormSubmit={onFormSubmit}>
        <Field name="email">
          <FieldLabel>Email</FieldLabel>
          <Input defaultValue="person@example.com" />
        </Field>
        <Button type="submit">Continue</Button>
      </Form>
    );

    fireEvent.submit(screen.getByRole('button', { name: 'Continue' }).closest('form')!);
    expect(onFormSubmit).toHaveBeenCalledWith({ email: 'person@example.com' }, expect.any(Object));
  });
});
