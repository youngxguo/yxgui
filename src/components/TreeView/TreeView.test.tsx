import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TreeView, type TreeViewNode } from './TreeView';

const nodes: TreeViewNode[] = [
  {
    children: [
      { id: 'button', label: 'Button' },
      { disabled: true, id: 'internal', label: 'Internal' }
    ],
    id: 'components',
    label: 'Components'
  },
  { id: 'docs', label: 'Documentation' }
];

describe('TreeView', () => {
  it('expands branches and reports selection', () => {
    const onExpandedIdsChange = vi.fn();
    const onSelectedIdChange = vi.fn();
    render(
      <TreeView
        label="Project"
        nodes={nodes}
        onExpandedIdsChange={onExpandedIdsChange}
        onSelectedIdChange={onSelectedIdChange}
      />
    );

    expect(screen.queryByRole('treeitem', { name: 'Button' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Expand Components' }));
    expect(onExpandedIdsChange).toHaveBeenCalledWith(['components']);
    fireEvent.click(screen.getByRole('treeitem', { name: 'Button' }));
    expect(onSelectedIdChange).toHaveBeenCalledWith('button');
  });

  it('supports tree keyboard navigation and skips disabled selection', () => {
    const onSelectedIdChange = vi.fn();
    render(
      <TreeView
        defaultExpandedIds={['components']}
        label="Project"
        nodes={nodes}
        onSelectedIdChange={onSelectedIdChange}
      />
    );

    const root = screen.getByRole('treeitem', { name: 'Components' });
    root.focus();
    fireEvent.keyDown(root, { key: 'ArrowRight' });
    expect(screen.getByRole('treeitem', { name: 'Button' })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('treeitem', { name: 'Button' }), { key: 'ArrowDown' });
    const disabled = screen.getByRole('treeitem', { name: 'Internal' });
    expect(disabled).toHaveFocus();
    fireEvent.keyDown(disabled, { key: 'Enter' });
    expect(onSelectedIdChange).not.toHaveBeenCalled();
  });
});
