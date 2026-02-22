import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useControllableState } from './useControllableState';

interface HookProps {
  value?: string;
  defaultValue: string;
  onChange?: (value: string) => void;
}

describe('useControllableState', () => {
  it('uses defaultValue for uncontrolled state and updates internal state', () => {
    const onChange = vi.fn();
    const { result } = renderHook(
      ({ value, defaultValue, onChange: onChangeProp }: HookProps) =>
        useControllableState({
          value,
          defaultValue,
          onChange: onChangeProp
        }),
      {
        initialProps: {
          defaultValue: 'initial',
          onChange
        }
      }
    );

    expect(result.current[0]).toBe('initial');
    act(() => {
      result.current[1]('next');
    });

    expect(result.current[0]).toBe('next');
    expect(onChange).toHaveBeenCalledWith('next');
  });

  it('supports controlled usage by calling onChange without mutating visible value until rerender', () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value, defaultValue, onChange: onChangeProp }: HookProps) =>
        useControllableState({
          value,
          defaultValue,
          onChange: onChangeProp
        }),
      {
        initialProps: {
          value: 'controlled',
          defaultValue: 'fallback',
          onChange
        }
      }
    );

    expect(result.current[0]).toBe('controlled');
    act(() => {
      result.current[1]('next');
    });

    expect(onChange).toHaveBeenCalledWith('next');
    expect(result.current[0]).toBe('controlled');

    rerender({
      value: 'next',
      defaultValue: 'fallback',
      onChange
    });
    expect(result.current[0]).toBe('next');
  });

  it('does not reset uncontrolled state when defaultValue changes after mount', () => {
    const { result, rerender } = renderHook(
      ({ value, defaultValue, onChange }: HookProps) =>
        useControllableState({
          value,
          defaultValue,
          onChange
        }),
      {
        initialProps: {
          defaultValue: 'initial'
        }
      }
    );

    act(() => {
      result.current[1]('final');
    });
    expect(result.current[0]).toBe('final');

    rerender({
      defaultValue: 'new-default'
    });
    expect(result.current[0]).toBe('final');
  });
});
