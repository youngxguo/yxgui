import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger
} from './Popover';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>Workspace details</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Personal workspace</PopoverTitle>
        <PopoverDescription>Only you can access projects in this workspace.</PopoverDescription>
        <PopoverClose>Done</PopoverClose>
      </PopoverContent>
    </Popover>
  )
} satisfies Meta<typeof Popover>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
