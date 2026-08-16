import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogActions,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from './AlertDialog';

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger>Delete project</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete project?</AlertDialogTitle>
        <AlertDialogDescription>
          This permanently removes the project and its saved settings.
        </AlertDialogDescription>
        <AlertDialogActions>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogActions>
      </AlertDialogContent>
    </AlertDialog>
  )
} satisfies Meta<typeof AlertDialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
