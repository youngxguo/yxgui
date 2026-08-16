import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Fieldset, FieldsetDescription, FieldsetLegend } from './Fieldset';

describe('Fieldset', () => {
  it('groups controls with native semantics', () => {
    render(
      <Fieldset>
        <FieldsetLegend>Preferences</FieldsetLegend>
        <FieldsetDescription>Choose one.</FieldsetDescription>
        <input type="checkbox" />
      </Fieldset>
    );
    expect(screen.getByRole('group', { name: 'Preferences' })).toBeInTheDocument();
    expect(screen.getByText('Choose one.')).toBeInTheDocument();
  });
});
