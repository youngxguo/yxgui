import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './Drawer';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs']
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BottomSheet: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerContent side="bottom">
        <DrawerHeader>
          <DrawerTitle>Update profile</DrawerTitle>
          <DrawerDescription>Edit your public profile details.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>Done</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open drawer' }));
    expect(await within(document.body).findByRole('dialog')).toBeInTheDocument();
  }
};

export const RightPanel: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger>Open panel</DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>Manage notification channels.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
};
