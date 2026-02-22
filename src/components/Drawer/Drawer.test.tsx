import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './Drawer';

describe('Drawer', () => {
  it('opens, renders labels, and closes on escape', async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription>Adjust search filters.</DrawerDescription>
          </DrawerHeader>
          <input aria-label="Keyword" />
          <DrawerFooter>
            <DrawerClose>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

    const trigger = screen.getByRole('button', { name: 'Open drawer' });
    fireEvent.click(trigger);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('supports side variants', async () => {
    render(
      <Drawer defaultOpen>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent side="right">Panel</DrawerContent>
      </Drawer>
    );

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveAttribute('data-side', 'right');
  });
});
