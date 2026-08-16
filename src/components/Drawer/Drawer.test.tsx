import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger
} from './Drawer';

describe('Drawer', () => {
  it('labels, opens, and closes a modal drawer', () => {
    render(
      <Drawer>
        <DrawerTrigger>Open settings</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Workspace settings</DrawerTitle>
          <DrawerDescription>Change workspace defaults.</DrawerDescription>
          <DrawerClose>Done</DrawerClose>
        </DrawerContent>
      </Drawer>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open settings' }));
    const drawer = screen.getByRole('dialog', { name: 'Workspace settings' });
    expect(drawer).toHaveAccessibleDescription('Change workspace defaults.');
    expect(drawer).toHaveAttribute('data-swipe-direction', 'right');
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('maps a bottom side to a downward dismiss gesture', () => {
    render(
      <Drawer defaultOpen side="bottom">
        <DrawerContent>
          <DrawerTitle>Mobile actions</DrawerTitle>
        </DrawerContent>
      </Drawer>
    );

    expect(screen.getByRole('dialog', { name: 'Mobile actions' })).toHaveAttribute(
      'data-swipe-direction',
      'down'
    );
  });
});
