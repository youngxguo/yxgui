import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScrollArea, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from './ScrollArea';

describe('ScrollArea', () => {
  it('renders viewport content with native scrolling', () => {
    render(
      <ScrollArea data-testid="root" style={{ height: 120, width: 180 }}>
        <ScrollAreaViewport
          data-testid="viewport"
          aria-label="Scrollable notes"
          style={{ height: 120 }}
        >
          <div style={{ height: 320 }}>Long content</div>
        </ScrollAreaViewport>
      </ScrollArea>
    );

    expect(screen.getByTestId('root')).toBeInTheDocument();
    expect(screen.getByTestId('viewport')).toHaveAttribute('tabindex', '0');
    expect(screen.getByText('Long content')).toBeInTheDocument();
  });

  it('supports keyboard focus baseline and scroll events on viewport', () => {
    const onScroll = vi.fn();
    render(
      <ScrollArea>
        <ScrollAreaViewport data-testid="viewport" aria-label="Files" onScroll={onScroll}>
          <div>Item</div>
        </ScrollAreaViewport>
      </ScrollArea>
    );

    const viewport = screen.getByTestId('viewport');
    viewport.focus();
    fireEvent.scroll(viewport);
    expect(viewport).toHaveFocus();
    expect(onScroll).toHaveBeenCalledTimes(1);
  });

  it('keeps scrollbar primitives as hidden compatibility elements', () => {
    render(
      <ScrollArea>
        <ScrollAreaViewport aria-label="Scrollable notes">
          <div style={{ height: 320 }}>Long content</div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar data-testid="scrollbar" orientation="horizontal">
          <ScrollAreaThumb data-testid="thumb" />
        </ScrollAreaScrollbar>
      </ScrollArea>
    );

    const scrollbar = screen.getByTestId('scrollbar');
    const thumb = screen.getByTestId('thumb');

    expect(scrollbar).toHaveAttribute('data-orientation', 'horizontal');
    expect(scrollbar).toHaveAttribute('hidden');
    expect(scrollbar).toHaveAttribute('aria-hidden', 'true');
    expect(thumb).toHaveAttribute('hidden');
    expect(thumb).toHaveAttribute('aria-hidden', 'true');
  });
});
