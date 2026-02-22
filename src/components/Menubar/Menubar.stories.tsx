import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from './Menubar';

const meta = {
  title: 'Components/Menubar',
  component: Menubar,
  tags: ['autodocs']
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New</MenubarItem>
          <MenubarItem>Open</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const file = canvas.getByRole('menuitem', { name: 'File' });
    await userEvent.click(file);
    expect(await within(document.body).findByRole('menu')).toBeInTheDocument();
  }
};
