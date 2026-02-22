import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './HoverCard';

describe('HoverCard', () => {
  it('opens on pointer hover and closes on leave', async () => {
    render(
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardContent>Preview</HoverCardContent>
      </HoverCard>
    );

    const trigger = screen.getByRole('button', { name: 'Profile' });
    fireEvent.mouseEnter(trigger);
    expect(await screen.findByRole('dialog')).toHaveTextContent('Preview');
    expect(trigger).toHaveAttribute('aria-describedby');

    fireEvent.mouseLeave(trigger);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('opens on focus and closes on escape', async () => {
    render(
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger>Keyboard trigger</HoverCardTrigger>
        <HoverCardContent>Info</HoverCardContent>
      </HoverCard>
    );

    const trigger = screen.getByRole('button', { name: 'Keyboard trigger' });
    fireEvent.focus(trigger);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('accepts a ref prop on content', async () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <HoverCard defaultOpen>
        <HoverCardTrigger>Open</HoverCardTrigger>
        <HoverCardContent ref={ref}>Body</HoverCardContent>
      </HoverCard>
    );

    await screen.findByRole('dialog');
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
