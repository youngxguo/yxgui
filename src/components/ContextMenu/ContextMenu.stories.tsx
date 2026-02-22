import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from './ContextMenu';

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs']
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger
        style={{ border: '1px dashed #cfcec5', borderRadius: 8, padding: '2rem' }}
      >
        Right-click this area
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Right-click this area')).toBeInTheDocument();
  }
};
