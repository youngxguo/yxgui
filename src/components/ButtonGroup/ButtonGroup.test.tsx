import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup', () => {
  it('groups native buttons without changing their event behavior', () => {
    const onArchive = vi.fn();
    render(
      <ButtonGroup aria-label="Document actions">
        <Button type="button">Save</Button>
        <Button type="button" onClick={onArchive}>
          Archive
        </Button>
      </ButtonGroup>
    );
    expect(screen.getByRole('group', { name: 'Document actions' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Archive' }));
    expect(onArchive).toHaveBeenCalledOnce();
  });

  it('propagates group-level disabled state to every button', () => {
    render(
      <ButtonGroup disabled>
        <Button>Save</Button>
        <Button>Archive</Button>
      </ButtonGroup>
    );
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Archive' })).toBeDisabled();
  });
});
