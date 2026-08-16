import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { AspectRatio } from './AspectRatio';

describe('AspectRatio', () => {
  it('applies a valid ratio and preserves content', () => {
    render(
      <AspectRatio data-testid="ratio" ratio={4 / 3}>
        <span>Preview</span>
      </AspectRatio>
    );

    const ratio = screen.getByTestId('ratio');
    expect(ratio).toHaveAttribute('data-aspect-ratio', String(4 / 3));
    expect(ratio).toHaveStyle({ aspectRatio: String(4 / 3) });
    expect(ratio.querySelector('[data-aspect-ratio-content]')).toHaveTextContent('Preview');
  });

  it('falls back to 16:9 and forwards refs', () => {
    const ref = createRef<HTMLDivElement>();
    render(<AspectRatio data-testid="ratio" ratio={0} ref={ref} />);

    expect(ref.current).toBe(screen.getByTestId('ratio'));
    expect(ref.current).toHaveAttribute('data-aspect-ratio', String(16 / 9));
  });
});
