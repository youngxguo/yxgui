import type { Meta, StoryObj } from '@storybook/react-vite';
import { TreeView, type TreeViewNode } from './TreeView';

const nodes: TreeViewNode[] = [
  {
    children: [
      { description: 'Primary action primitive', id: 'button', label: 'Button' },
      { description: 'Single-value choice', id: 'select', label: 'Select' },
      {
        children: [
          { id: 'dialog', label: 'Dialog' },
          { id: 'drawer', label: 'Drawer' }
        ],
        id: 'overlays',
        label: 'Overlays'
      }
    ],
    id: 'components',
    label: 'Components'
  },
  { id: 'examples', label: 'Examples' },
  { disabled: true, id: 'internal', label: 'Internal' }
];

const meta = {
  title: 'Components/TreeView',
  component: TreeView,
  args: {
    defaultExpandedIds: ['components', 'overlays'],
    defaultSelectedId: 'dialog',
    label: 'Library files',
    nodes
  }
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Collapsed: Story = { args: { defaultExpandedIds: [], defaultSelectedId: undefined } };
export const Empty: Story = { args: { nodes: [] } };
