import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Drawer,
  DrawerActions,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger
} from './Drawer';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  args: { side: 'right' },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger>Open workspace drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Workspace settings</DrawerTitle>
        <DrawerDescription>
          Configure the defaults used when you create a personal project.
        </DrawerDescription>
        <label htmlFor="drawer-name">Workspace name</label>
        <input id="drawer-name" defaultValue="Personal" />
        <DrawerActions>
          <DrawerClose>Done</DrawerClose>
        </DrawerActions>
      </DrawerContent>
    </Drawer>
  )
} satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
export const BottomSheet: Story = { args: { defaultOpen: true, side: 'bottom' } };
