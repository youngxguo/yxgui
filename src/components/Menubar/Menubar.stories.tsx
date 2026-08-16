import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from '../Menu';
import { Menubar } from './Menubar';

const meta = {
  title: 'Components/Menubar',
  component: Menubar,
  render: (args) => (
    <Menubar {...args} aria-label="Application menu">
      <Menu>
        <MenuTrigger variant="menubar">File</MenuTrigger>
        <MenuContent sideOffset={4}>
          <MenuItem>New document</MenuItem>
          <MenuItem>Open…</MenuItem>
          <MenuSeparator />
          <MenuItem>Save</MenuItem>
        </MenuContent>
      </Menu>
      <Menu>
        <MenuTrigger variant="menubar">Edit</MenuTrigger>
        <MenuContent sideOffset={4}>
          <MenuItem>Undo</MenuItem>
          <MenuItem>Redo</MenuItem>
        </MenuContent>
      </Menu>
      <Menu>
        <MenuTrigger variant="menubar">View</MenuTrigger>
        <MenuContent sideOffset={4}>
          <MenuItem>Zoom in</MenuItem>
          <MenuItem>Zoom out</MenuItem>
        </MenuContent>
      </Menu>
    </Menubar>
  )
} satisfies Meta<typeof Menubar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
