import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ResizablePanels } from './ResizablePanels';

describe('ResizablePanels', () => {
  it('resizes with orientation-aware keyboard controls', () => {
    const onSizeChange = vi.fn();
    render(
      <ResizablePanels
        defaultSize={40}
        first="Navigation"
        onSizeChange={onSizeChange}
        second="Content"
      />
    );
    const handle = screen.getByRole('separator', { name: 'Resize panels' });
    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    expect(handle).toHaveAttribute('aria-valuenow', '45');
    expect(onSizeChange).toHaveBeenLastCalledWith(45);
    fireEvent.keyDown(handle, { key: 'Home' });
    expect(handle).toHaveAttribute('aria-valuenow', '20');
  });

  it('reports controlled changes without changing the supplied value', () => {
    const onSizeChange = vi.fn();
    render(
      <ResizablePanels
        first="Top"
        onSizeChange={onSizeChange}
        orientation="vertical"
        second="Bottom"
        size={60}
      />
    );
    const handle = screen.getByRole('separator', { name: 'Resize panels' });
    fireEvent.keyDown(handle, { key: 'ArrowUp' });
    expect(onSizeChange).toHaveBeenCalledWith(55);
    expect(handle).toHaveAttribute('aria-valuenow', '60');
  });
});
