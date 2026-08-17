import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Checkbox } from '../Checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldTitle
} from './Field';

describe('Field', () => {
  it('composes grouped horizontal fields with native label behavior', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <FieldGroup ref={ref}>
        <Field orientation="horizontal">
          <Checkbox id="updates" />
          <FieldContent>
            <FieldLabel htmlFor="updates">Product updates</FieldLabel>
            <FieldDescription>Monthly release notes.</FieldDescription>
          </FieldContent>
        </Field>
        <FieldSeparator>Or</FieldSeparator>
        <Field orientation="responsive">
          <Checkbox aria-label="Touch ID" />
          <FieldContent>
            <FieldTitle>Touch ID</FieldTitle>
          </FieldContent>
        </Field>
      </FieldGroup>
    );

    expect(ref.current).toContainElement(screen.getByText('Monthly release notes.'));
    const updates = screen.getByRole('checkbox', { name: 'Product updates' });
    fireEvent.click(screen.getByText('Product updates'));
    expect(updates).toBeChecked();
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
    expect(screen.getByText('Touch ID')).toBeInTheDocument();
  });
});
