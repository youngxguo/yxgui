import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Radio, RadioGroup } from './RadioGroup';

describe('RadioGroup', () => {
  it('renders radios and updates selection in uncontrolled mode', () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup defaultValue="pro" onValueChange={onValueChange}>
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
      </RadioGroup>
    );

    const free = screen.getByRole('radio', { name: 'Free' });
    const pro = screen.getByRole('radio', { name: 'Pro' });

    expect(pro).toBeChecked();
    fireEvent.click(free);
    expect(free).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith('free');
  });

  it('supports controlled usage and invalid state', () => {
    const { rerender } = render(
      <RadioGroup value="a" invalid>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>
    );

    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('aria-invalid', 'true');

    rerender(
      <RadioGroup value="b">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>
    );

    expect(screen.getByRole('radio', { name: 'B' })).toBeChecked();
  });

  it('accepts ref props for group and radio', () => {
    const groupRef = createRef<HTMLDivElement>();
    const radioRef = createRef<HTMLInputElement>();

    render(
      <RadioGroup ref={groupRef}>
        <Radio ref={radioRef} value="one">
          One
        </Radio>
      </RadioGroup>
    );

    expect(groupRef.current).toBeInstanceOf(HTMLDivElement);
    expect(radioRef.current).toBeInstanceOf(HTMLInputElement);
  });
});
