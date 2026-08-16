import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Carousel } from './Carousel';

describe('Carousel', () => {
  it('navigates slides and announces the current position', () => {
    const onIndexChange = vi.fn();
    render(
      <Carousel aria-label="Projects" onIndexChange={onIndexChange}>
        <div>Alpha</div>
        <div>Beta</div>
        <div>Gamma</div>
      </Carousel>
    );

    expect(screen.getByText('1 of 3')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByText('2 of 3')).toBeVisible();
    expect(onIndexChange).toHaveBeenCalledWith(1);
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeEnabled();
  });

  it('supports keyboard navigation from the viewport', () => {
    render(
      <Carousel aria-label="Projects">
        <div>Alpha</div>
        <div>Beta</div>
      </Carousel>
    );

    fireEvent.keyDown(screen.getByRole('group', { name: 'Projects slides' }), {
      key: 'End'
    });
    expect(screen.getByText('2 of 2')).toBeVisible();
  });
});
