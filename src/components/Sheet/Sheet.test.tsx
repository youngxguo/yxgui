import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './Sheet';

describe('Sheet', () => {
  it('opens, renders labels, and closes on escape', async () => {
    render(
      <Sheet>
        <SheetTrigger>Open sheet</SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Adjust search filters.</SheetDescription>
          </SheetHeader>
          <input aria-label="Keyword" />
          <SheetFooter>
            <SheetClose>Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    const trigger = screen.getByRole('button', { name: 'Open sheet' });
    fireEvent.click(trigger);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
    expect(dialog).toHaveAttribute('data-side', 'right');

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('supports common side variants', async () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side="left">Panel</SheetContent>
      </Sheet>
    );

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveAttribute('data-side', 'left');
  });
});
