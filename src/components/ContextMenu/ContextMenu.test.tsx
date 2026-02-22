import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from './ContextMenu';

describe('ContextMenu', () => {
  it('opens on right click and supports keyboard navigation', async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Canvas</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem disabled>Paste</ContextMenuItem>
          <ContextMenuItem>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    const trigger = screen.getByText('Canvas');
    fireEvent.contextMenu(trigger, { clientX: 20, clientY: 30 });

    const menu = await screen.findByRole('menu');
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
  });

  it('renders separators and closes on selection', async () => {
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>Open</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Rename</ContextMenuItem>
          <ContextMenuSeparator data-testid="sep" />
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    expect(await screen.findByRole('menu')).toBeInTheDocument();
    expect(screen.getByTestId('sep')).toHaveAttribute('role', 'separator');
    fireEvent.click(screen.getByRole('menuitem', { name: 'Share' }));
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });
});
