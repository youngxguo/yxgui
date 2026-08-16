import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { ScrollArea } from './ScrollArea';

describe('ScrollArea', () => {
  it('renders its content inside the scroll area root', () => {
    render(
      <ScrollArea data-testid="scroll-area" orientation="both">
        Content
      </ScrollArea>
    );

    const root = screen.getByTestId('scroll-area');
    expect(root).toHaveTextContent('Content');
    expect(root.firstElementChild).toHaveTextContent('Content');
  });

  it('forwards root refs and native attributes', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <ScrollArea aria-label="Updates" data-testid="scroll-area" ref={ref}>
        Update
      </ScrollArea>
    );

    expect(ref.current).toBe(screen.getByTestId('scroll-area'));
    expect(ref.current).toHaveAttribute('aria-label', 'Updates');
  });
});
