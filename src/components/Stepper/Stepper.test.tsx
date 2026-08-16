import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Stepper, type StepperStep } from './Stepper';

const steps: StepperStep[] = [
  { id: 'details', label: 'Details' },
  { id: 'review', label: 'Review' },
  { disabled: true, id: 'publish', label: 'Publish' }
];

describe('Stepper', () => {
  it('tracks progress and reports interactive step changes', () => {
    const onStepChange = vi.fn();
    render(
      <Stepper defaultStep={1} label="Publish workflow" onStepChange={onStepChange} steps={steps} />
    );
    expect(screen.getByText('Review').closest('li')).toHaveAttribute('aria-current', 'step');
    fireEvent.click(screen.getByRole('button', { name: 'Details' }));
    expect(onStepChange).toHaveBeenCalledWith(0);
    expect(screen.getByText('Details').closest('li')).toHaveAttribute('aria-current', 'step');
  });

  it('keeps disabled steps inert', () => {
    const onStepChange = vi.fn();
    render(<Stepper label="Publish workflow" onStepChange={onStepChange} steps={steps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Publish' }));
    expect(onStepChange).not.toHaveBeenCalled();
  });
});
