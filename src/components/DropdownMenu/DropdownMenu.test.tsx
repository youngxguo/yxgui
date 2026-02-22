import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './DropdownMenu';

describe('DropdownMenu', () => {
  it('opens and supports keyboard navigation that skips disabled items', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Open</DropdownMenuItem>
          <DropdownMenuItem disabled>Archive</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByRole('button', { name: 'Actions' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });

    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());
    expect(screen.getByRole('menuitem', { name: 'Open' })).toHaveFocus();

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
  });

  it('closes after selecting an item and calls onSelect', async () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>More</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Rename</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    fireEvent.click(screen.getByRole('menuitem', { name: 'Rename' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('accepts a ref prop on content', async () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent ref={ref}>Menu</DropdownMenuContent>
      </DropdownMenu>
    );

    await screen.findByRole('menu');
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
