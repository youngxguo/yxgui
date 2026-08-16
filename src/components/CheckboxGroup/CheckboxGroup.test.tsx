import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CheckboxGroup, CheckboxGroupLegend, CheckboxItem } from './CheckboxGroup';

describe('CheckboxGroup', () => {
  it('groups independently selectable native checkboxes', () => {
    render(
      <CheckboxGroup>
        <CheckboxGroupLegend>Notifications</CheckboxGroupLegend>
        <CheckboxItem label="Product" name="notifications" />
        <CheckboxItem label="Security" name="notifications" />
      </CheckboxGroup>
    );
    fireEvent.click(screen.getByRole('checkbox', { name: 'Product' }));
    expect(screen.getByRole('checkbox', { name: 'Product' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Security' })).not.toBeChecked();
    expect(screen.getByRole('group', { name: 'Notifications' })).toBeInTheDocument();
  });
});
