import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { AspectRatio } from './AspectRatio';

describe('AspectRatio', () => {
  it('renders a ratio wrapper with spacer and content containers', () => {
    render(
      <AspectRatio ratio={4 / 3} data-testid="root">
        <div data-testid="child">Media</div>
      </AspectRatio>
    );

    const root = screen.getByTestId('root');
    const spacer = root.querySelector('[data-aspect-ratio-spacer]');
    const content = root.querySelector('[data-aspect-ratio-content]');

    expect(root.tagName).toBe('DIV');
    expect(root).toHaveAttribute('data-aspect-ratio', String(4 / 3));
    expect(spacer).not.toBeNull();
    expect(spacer).toHaveAttribute('aria-hidden', 'true');
    expect(spacer).toHaveStyle({ paddingTop: '75%' });
    expect(content).not.toBeNull();
    expect(content?.firstElementChild).toBe(screen.getByTestId('child'));
  });

  it('defaults to 16/9 and preserves custom content', () => {
    render(
      <AspectRatio data-testid="ratio">
        <img alt="Preview" src="/preview.png" />
      </AspectRatio>
    );

    const root = screen.getByTestId('ratio');
    const spacer = root.querySelector('[data-aspect-ratio-spacer]');

    expect(root).toHaveAttribute('data-aspect-ratio', String(16 / 9));
    expect(spacer).toHaveStyle({ paddingTop: '56.25%' });
    expect(screen.getByRole('img', { name: 'Preview' })).toBeInTheDocument();
  });

  it('falls back to 16/9 when ratio is invalid and accepts a ref', () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <AspectRatio ref={ref} ratio={0} data-testid="ratio">
        Content
      </AspectRatio>
    );

    const root = screen.getByTestId('ratio');
    const spacer = root.querySelector('[data-aspect-ratio-spacer]');

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(spacer).toHaveStyle({ paddingTop: '56.25%' });
  });
});
