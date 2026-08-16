import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from '../Popover';
import { Theme } from './Theme';

describe('Theme', () => {
  it('contains portalled overlays and preserves its external ref', async () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Theme data-testid="theme" mode="dark" ref={ref}>
        <Popover defaultOpen>
          <PopoverTrigger>Details</PopoverTrigger>
          <PopoverContent>
            <PopoverTitle>Theme-aware content</PopoverTitle>
          </PopoverContent>
        </Popover>
      </Theme>
    );

    const theme = screen.getByTestId('theme');
    const popup = await screen.findByRole('dialog', { name: 'Theme-aware content' });
    expect(ref.current).toBe(theme);
    expect(theme).toContainElement(popup);
  });
});
