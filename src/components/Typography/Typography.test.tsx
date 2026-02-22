import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Typography } from './Typography';

describe('Typography', () => {
  it('renders body text as a paragraph by default', () => {
    render(<Typography>Body copy</Typography>);

    const text = screen.getByText('Body copy');
    expect(text.tagName).toBe('P');
  });

  it('supports semantic element overrides and changes style composition with variant', () => {
    const { rerender } = render(
      <Typography as="h2" variant="h1">
        Documentation
      </Typography>
    );

    const heading = screen.getByRole('heading', { level: 2, name: 'Documentation' });
    const baseClassName = heading.className;

    rerender(
      <Typography as="h2" variant="lead">
        Documentation
      </Typography>
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Documentation' })).toBeInTheDocument();
    expect(heading.className).not.toEqual(baseClassName);
  });

  it('renders code and blockquote variants with expected text content', () => {
    render(
      <>
        <Typography variant="code">pnpm install</Typography>
        <Typography variant="blockquote">Ship small, composable UI primitives.</Typography>
      </>
    );

    const code = screen.getByText('pnpm install');
    const quote = screen.getByText('Ship small, composable UI primitives.');

    expect(code.tagName).toBe('CODE');
    expect(quote.tagName).toBe('BLOCKQUOTE');
    expect(quote).toHaveTextContent('Ship small, composable UI primitives.');
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLElement>();
    render(<Typography ref={ref}>Ref text</Typography>);

    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });
});
