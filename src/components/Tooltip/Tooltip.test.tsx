import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('opens on hover and closes on mouse leave', async () => {
    render(
      <Tooltip content="More info">
        <button type="button">Help</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Help' });
    fireEvent.mouseEnter(trigger);

    expect(await screen.findByRole('tooltip')).toHaveTextContent('More info');
    expect(trigger).toHaveAttribute('aria-describedby');

    fireEvent.mouseLeave(trigger);
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('opens on focus and closes on escape', async () => {
    render(
      <Tooltip content="Shortcut: ?">
        <button type="button">Keyboard help</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Keyboard help' });
    fireEvent.focus(trigger);
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });
});
