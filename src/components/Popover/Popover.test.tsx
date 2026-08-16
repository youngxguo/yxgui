import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger
} from './Popover';

describe('Popover', () => {
  it('opens a labelled non-modal popup', () => {
    render(
      <Popover>
        <PopoverTrigger>Workspace details</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Personal workspace</PopoverTitle>
          <PopoverDescription>Only you can access it.</PopoverDescription>
          <PopoverClose>Done</PopoverClose>
        </PopoverContent>
      </Popover>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Workspace details' }));
    expect(screen.getByRole('dialog', { name: 'Personal workspace' })).toHaveAccessibleDescription(
      'Only you can access it.'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Done' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
