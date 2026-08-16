import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VisuallyHidden } from './VisuallyHidden';

describe('VisuallyHidden', () => {
  it('adds an accessible name without visible text', () => {
    render(
      <button type="button">
        ?<VisuallyHidden>Help</VisuallyHidden>
      </button>
    );
    expect(screen.getByRole('button', { name: '?Help' })).toBeVisible();
    expect(screen.getByText('Help').tagName).toBe('SPAN');
  });
});
