import type { Meta, StoryObj } from '@storybook/react-vite';
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
  render: (args) => (
    <ContextMenu {...args}>
      <ContextMenuTrigger>Right click for project actions</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>Duplicate</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem danger>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
} satisfies Meta<typeof ContextMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
