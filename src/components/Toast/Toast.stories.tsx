import { useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { ToastProvider, useToast } from './Toast';

function Demo({ open = false }: { open?: boolean }) {
  const toast = useToast();
  const opened = useRef(false);

  useEffect(() => {
    if (open && !opened.current) {
      opened.current = true;
      toast.add({
        action: { label: 'Undo', onClick: () => undefined },
        description: 'Your changes are available across devices.',
        timeout: 0,
        title: 'Project saved',
        variant: 'success'
      });
    }
  }, [open, toast]);

  return (
    <Button
      type="button"
      onClick={() =>
        toast.add({
          description: 'Your changes are available across devices.',
          title: 'Project saved',
          variant: 'success'
        })
      }
    >
      Show notification
    </Button>
  );
}

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  args: { children: null },
  render: () => (
    <ToastProvider timeout={0}>
      <Demo />
    </ToastProvider>
  )
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  render: () => (
    <ToastProvider timeout={0}>
      <Demo open />
    </ToastProvider>
  )
};
