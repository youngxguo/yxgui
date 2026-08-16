import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ItemButton, ItemContent, ItemDescription, ItemLink, ItemTitle } from './Item';

describe('Item', () => {
  it('preserves native link semantics', () => {
    render(
      <ItemLink href="/settings">
        <ItemContent>
          <ItemTitle>Settings</ItemTitle>
          <ItemDescription>Manage your workspace.</ItemDescription>
        </ItemContent>
      </ItemLink>
    );
    expect(screen.getByRole('link', { name: /settings manage your workspace/i })).toHaveAttribute(
      'href',
      '/settings'
    );
  });

  it('preserves native button behavior and disabled state', () => {
    const onClick = vi.fn();
    const { rerender } = render(<ItemButton onClick={onClick}>Choose workspace</ItemButton>);
    fireEvent.click(screen.getByRole('button', { name: 'Choose workspace' }));
    expect(onClick).toHaveBeenCalledOnce();

    rerender(
      <ItemButton disabled onClick={onClick}>
        Choose workspace
      </ItemButton>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Choose workspace' }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole('button', { name: 'Choose workspace' })).toBeDisabled();
  });
});
