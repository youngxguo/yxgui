import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Dialog,
  DialogActions,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from './Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger>Edit profile</DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Update the name shown across your personal applications.
        </DialogDescription>
        <label htmlFor="dialog-name">Name</label>
        <input id="dialog-name" defaultValue="Young" />
        <DialogActions>
          <DialogClose>Cancel</DialogClose>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
} satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
