import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Checkbox } from '../Checkbox/Checkbox';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { Textarea } from '../Textarea/Textarea';
import {
  FormField,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
  FormFieldLabel
} from './FormField';

describe('FormField', () => {
  it('connects label, description, and error text to an input', () => {
    render(
      <FormField invalid required>
        <FormFieldLabel>Email</FormFieldLabel>
        <FormFieldControl>
          <Input />
        </FormFieldControl>
        <FormFieldDescription>We only use this for receipts.</FormFieldDescription>
        <FormFieldError>Enter a valid email address.</FormFieldError>
      </FormField>
    );

    const input = screen.getByRole('textbox', { name: 'Email' });
    const description = screen.getByText('We only use this for receipts.');
    const error = screen.getByRole('alert');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', `${description.id} ${error.id}`);
  });

  it('works with select, textarea, and checkbox controls', () => {
    render(
      <div>
        <FormField>
          <FormFieldLabel>Plan</FormFieldLabel>
          <FormFieldControl>
            <Select>
              <option>Free</option>
            </Select>
          </FormFieldControl>
        </FormField>
        <FormField>
          <FormFieldLabel>Notes</FormFieldLabel>
          <FormFieldControl>
            <Textarea />
          </FormFieldControl>
        </FormField>
        <FormField>
          <FormFieldLabel htmlFor="terms">Accept terms</FormFieldLabel>
          <FormFieldControl>
            <Checkbox id="terms" />
          </FormFieldControl>
        </FormField>
      </div>
    );

    expect(screen.getByRole('combobox', { name: 'Plan' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Notes' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });

  it('accepts a ref prop on the root', () => {
    const ref = createRef<HTMLDivElement>();
    render(<FormField ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
