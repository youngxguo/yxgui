import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Label } from './Label';

describe('Label', () => {
  it('renders label text and forwards native props', () => {
    render(
      <div>
        <Label htmlFor="email" title="Email label">
          Email
        </Label>
        <input id="email" />
      </div>
    );

    const label = screen.getByText('Email');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'email');
    expect(label).toHaveAttribute('title', 'Email label');
  });

  it('changes style class composition with size', () => {
    const { rerender } = render(<Label size="sm">Name</Label>);

    const label = screen.getByText('Name');
    const baseClassName = label.className;

    rerender(<Label size="md">Name</Label>);

    expect(label.className).not.toEqual(baseClassName);
  });

  it('renders a required indicator when requested', () => {
    render(<Label required>Email</Label>);

    expect(screen.getByText(/Email/)).toHaveTextContent('Email *');
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Email</Label>);

    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });
});
