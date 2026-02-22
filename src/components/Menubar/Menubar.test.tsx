import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from './Menubar';

describe('Menubar', () => {
  it('moves focus across top-level triggers with arrow keys', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );

    const file = screen.getByRole('menuitem', { name: 'File' });
    const edit = screen.getByRole('menuitem', { name: 'Edit' });

    file.focus();
    fireEvent.keyDown(file, { key: 'ArrowRight' });
    expect(edit).toHaveFocus();
  });

  it('opens menus and supports disabled items', async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Zoom in</MenubarItem>
            <MenubarSeparator />
            <MenubarItem disabled>Reset layout</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );

    const trigger = screen.getByRole('menuitem', { name: 'View' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });

    expect(await screen.findByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Zoom in' })).toHaveFocus();
    expect(screen.getByRole('menuitem', { name: 'Reset layout' })).toBeDisabled();

    fireEvent.click(screen.getByRole('menuitem', { name: 'Zoom in' }));
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });
});
