import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { Toaster, toast } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toaster,
  tags: ['autodocs']
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button
        onClick={() =>
          toast.success('Settings saved', {
            description: 'Your notification preferences were updated.'
          })
        }
      >
        Show success toast
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Show success toast' }));
    expect(await within(document.body).findByText('Settings saved')).toBeInTheDocument();
  }
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Toaster />
      <Button
        variant="secondary"
        onClick={() => toast.info('New release available', { description: 'Version 0.0.2' })}
      >
        Info
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.warning('Storage almost full', { description: 'Only 5% remaining.' })}
      >
        Warning
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.error('Upload failed', {
            description: 'Check your connection and try again.'
          })
        }
      >
        Error
      </Button>
    </div>
  )
};
