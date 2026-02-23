import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScrollArea, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from './ScrollArea';

describe('ScrollArea', () => {
  const getTranslateY = (transform: string) => {
    const match = transform.match(/translateY\(([-\d.]+)px\)/);
    return match ? Number.parseFloat(match[1]) : Number.NaN;
  };

  it('renders viewport content and decorative scrollbar primitives', () => {
    render(
      <ScrollArea data-testid="root" style={{ height: 120, width: 180 }}>
        <ScrollAreaViewport
          data-testid="viewport"
          aria-label="Scrollable notes"
          style={{ height: 120 }}
        >
          <div style={{ height: 320 }}>Long content</div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar data-testid="scrollbar">
          <ScrollAreaThumb data-testid="thumb" />
        </ScrollAreaScrollbar>
      </ScrollArea>
    );

    expect(screen.getByTestId('root')).toBeInTheDocument();
    expect(screen.getByTestId('viewport')).toHaveAttribute('tabindex', '0');
    expect(screen.getByText('Long content')).toBeInTheDocument();
    expect(screen.getByTestId('scrollbar')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('thumb')).toBeInTheDocument();
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

  it('syncs custom thumb size and position with viewport scroll state', async () => {
    render(
      <ScrollArea style={{ height: 120, width: 180 }}>
        <ScrollAreaViewport data-testid="viewport" aria-label="Scrollable notes">
          <div style={{ height: 400 }}>Long content</div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar data-testid="scrollbar" orientation="vertical">
          <ScrollAreaThumb data-testid="thumb" />
        </ScrollAreaScrollbar>
      </ScrollArea>
    );

    const viewport = screen.getByTestId('viewport');
    const scrollbar = screen.getByTestId('scrollbar');
    const thumb = screen.getByTestId('thumb');

    let scrollTop = 0;

    Object.defineProperty(viewport, 'clientHeight', {
      configurable: true,
      get: () => 100
    });
    Object.defineProperty(viewport, 'scrollHeight', {
      configurable: true,
      get: () => 400
    });
    Object.defineProperty(viewport, 'scrollTop', {
      configurable: true,
      get: () => scrollTop,
      set: (value: number) => {
        scrollTop = value;
      }
    });
    Object.defineProperty(scrollbar, 'clientHeight', {
      configurable: true,
      get: () => 100
    });

    fireEvent.scroll(viewport);

    await waitFor(() => {
      expect(Number.parseFloat(thumb.style.height)).toBeGreaterThan(0);
      expect(getTranslateY(thumb.style.transform)).toBeCloseTo(0, 3);
    });

    const initialThumbHeight = Number.parseFloat(thumb.style.height);

    scrollTop = 150;
    fireEvent.scroll(viewport);

    await waitFor(() => {
      expect(Number.parseFloat(thumb.style.height)).toBeCloseTo(initialThumbHeight, 3);
      expect(getTranslateY(thumb.style.transform)).toBeGreaterThan(0);
    });
  });
});
