import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselViewport
} from './Carousel';

function renderCarousel(props?: Partial<Parameters<typeof Carousel>[0]>) {
  return render(
    <Carousel aria-label="Gallery" {...props}>
      <CarouselViewport data-testid="viewport">
        <CarouselContent data-testid="content">
          <CarouselItem>
            <div>Slide one</div>
          </CarouselItem>
          <CarouselItem>
            <div>Slide two</div>
          </CarouselItem>
          <CarouselItem>
            <div>Slide three</div>
          </CarouselItem>
        </CarouselContent>
      </CarouselViewport>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

describe('Carousel', () => {
  it('renders items with slide semantics and active state', () => {
    renderCarousel();

    const slides = screen.getAllByRole('group');
    expect(slides).toHaveLength(3);
    expect(slides[0]).toHaveAttribute('aria-label', '1 of 3');
    expect(slides[0]).toHaveAttribute('data-state', 'active');
    expect(slides[1]).toHaveAttribute('data-state', 'inactive');
    expect(screen.getByText('Slide three')).toBeInTheDocument();
  });

  it('navigates with controls and disables previous/next at the bounds', async () => {
    const user = userEvent.setup();
    const onIndexChange = vi.fn();
    renderCarousel({ onIndexChange });

    const previous = screen.getByRole('button', { name: 'Previous slide' });
    const next = screen.getByRole('button', { name: 'Next slide' });
    const slides = screen.getAllByRole('group');

    expect(previous).toBeDisabled();
    expect(next).toBeEnabled();

    await user.click(next);
    expect(onIndexChange).toHaveBeenLastCalledWith(1);
    expect(previous).toBeEnabled();
    expect(slides[1]).toHaveAttribute('data-state', 'active');

    await user.click(next);
    expect(onIndexChange).toHaveBeenLastCalledWith(2);
    expect(next).toBeDisabled();
    expect(slides[2]).toHaveAttribute('data-state', 'active');
  });

  it('supports keyboard navigation from the viewport', () => {
    renderCarousel();

    const viewport = screen.getByTestId('viewport');
    const slides = screen.getAllByRole('group');
    const content = screen.getByTestId('content');

    viewport.focus();
    fireEvent.keyDown(viewport, { key: 'ArrowRight' });
    expect(slides[1]).toHaveAttribute('data-state', 'active');
    expect(content).toHaveAttribute('data-current-index', '1');

    fireEvent.keyDown(viewport, { key: 'End' });
    expect(slides[2]).toHaveAttribute('data-state', 'active');

    fireEvent.keyDown(viewport, { key: 'Home' });
    expect(slides[0]).toHaveAttribute('data-state', 'active');
  });
});
