import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Radio, RadioGroup, RadioGroupLegend } from './RadioGroup';

describe('RadioGroup', () => {
  it('uses native mutually exclusive radio behavior', () => {
    render(
      <RadioGroup>
        <RadioGroupLegend>Plan</RadioGroupLegend>
        <Radio label="Personal" name="plan" value="personal" />
        <Radio label="Team" name="plan" value="team" />
      </RadioGroup>
    );
    const personal = screen.getByRole('radio', { name: 'Personal' });
    const team = screen.getByRole('radio', { name: 'Team' });
    fireEvent.click(personal);
    fireEvent.click(team);
    expect(personal).not.toBeChecked();
    expect(team).toBeChecked();
    expect(screen.getByRole('group', { name: 'Plan' })).toBeInTheDocument();
  });
});
