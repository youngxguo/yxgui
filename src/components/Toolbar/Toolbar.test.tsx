import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Toolbar, ToolbarButton, ToolbarSeparator } from './Toolbar';

describe('Toolbar', () => {
  it('groups operable controls with toolbar semantics', () => {
    const onClick = vi.fn();
    render(
      <Toolbar aria-label="Editor">
        <ToolbarButton onClick={onClick}>Undo</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton>Redo</ToolbarButton>
      </Toolbar>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole('toolbar', { name: 'Editor' })).toBeInTheDocument();
  });
});
