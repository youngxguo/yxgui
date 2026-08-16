import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '../Menu';
import { Menubar } from './Menubar';

describe('Menubar', () => {
  it('coordinates menus with roving keyboard focus', async () => {
    render(
      <Menubar aria-label="Application menu">
        <Menu>
          <MenuTrigger variant="menubar">File</MenuTrigger>
          <MenuContent>
            <MenuItem>New</MenuItem>
          </MenuContent>
        </Menu>
        <Menu>
          <MenuTrigger variant="menubar">Edit</MenuTrigger>
          <MenuContent>
            <MenuItem>Undo</MenuItem>
          </MenuContent>
        </Menu>
      </Menubar>
    );

    const file = screen.getByRole('menuitem', { name: 'File' });
    file.focus();
    fireEvent.keyDown(file, { key: 'ArrowRight' });
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus());
  });
});
