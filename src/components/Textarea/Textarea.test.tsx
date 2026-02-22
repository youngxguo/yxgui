import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders a textbox and forwards native props', () => {
    render(<Textarea placeholder="Details" rows={6} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Details');
    expect(textarea).toHaveAttribute('rows', '6');
  });

  it('changes style class composition with size and invalid state', () => {
    const { rerender } = render(<Textarea size="sm" placeholder="Details" />);

    const textarea = screen.getByRole('textbox');
    const baseClassName = textarea.className;

    rerender(<Textarea size="lg" invalid placeholder="Details" />);

    expect(textarea.className).not.toEqual(baseClassName);
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} placeholder="Details" />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
