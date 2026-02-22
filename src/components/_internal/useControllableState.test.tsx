import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useControllableState } from './useControllableState';

interface HookHarnessProps {
  value?: string;
  defaultValue: string;
  onChange?: (value: string) => void;
}

function HookHarness({ value, defaultValue, onChange }: HookHarnessProps) {
  const [currentValue, setCurrentValue] = useControllableState({
    value,
    defaultValue,
    onChange
  });

  return (
    <div>
      <output data-testid="value">{currentValue}</output>
      <button type="button" onClick={() => setCurrentValue('next')}>
        Set next
      </button>
      <button type="button" onClick={() => setCurrentValue('final')}>
        Set final
      </button>
    </div>
  );
}

describe('useControllableState', () => {
  it('uses defaultValue for uncontrolled state and updates internal state', () => {
    const onChange = vi.fn();

    render(<HookHarness defaultValue="initial" onChange={onChange} />);

    expect(screen.getByTestId('value')).toHaveTextContent('initial');

    fireEvent.click(screen.getByRole('button', { name: 'Set next' }));

    expect(screen.getByTestId('value')).toHaveTextContent('next');
    expect(onChange).toHaveBeenCalledWith('next');
  });

  it('supports controlled usage by calling onChange without mutating visible value until rerender', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <HookHarness value="controlled" defaultValue="fallback" onChange={onChange} />
    );

    expect(screen.getByTestId('value')).toHaveTextContent('controlled');

    fireEvent.click(screen.getByRole('button', { name: 'Set next' }));

    expect(onChange).toHaveBeenCalledWith('next');
    expect(screen.getByTestId('value')).toHaveTextContent('controlled');

    rerender(<HookHarness value="next" defaultValue="fallback" onChange={onChange} />);
    expect(screen.getByTestId('value')).toHaveTextContent('next');
  });

  it('does not reset uncontrolled state when defaultValue changes after mount', () => {
    const { rerender } = render(<HookHarness defaultValue="initial" />);

    fireEvent.click(screen.getByRole('button', { name: 'Set final' }));
    expect(screen.getByTestId('value')).toHaveTextContent('final');

    rerender(<HookHarness defaultValue="new-default" />);
    expect(screen.getByTestId('value')).toHaveTextContent('final');
  });
});
