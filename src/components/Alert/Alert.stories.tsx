import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Alert, AlertDescription, AlertTitle } from './Alert';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    variant: 'info'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error']
    }
  }
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: ComponentProps<typeof Alert>) => (
    <Alert {...args} style={{ maxWidth: 420 }}>
      <AlertTitle>Profile updated</AlertTitle>
      <AlertDescription>Your account settings were saved successfully.</AlertDescription>
    </Alert>
  )
};

export const Variants: Story = {
  render: (args: ComponentProps<typeof Alert>) => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 480 }}>
      <Alert {...args} variant="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>New features are available in preview.</AlertDescription>
      </Alert>
      <Alert {...args} variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Billing details were updated.</AlertDescription>
      </Alert>
      <Alert {...args} variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Your trial expires in 3 days.</AlertDescription>
      </Alert>
      <Alert {...args} variant="error">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>We could not connect to the server.</AlertDescription>
      </Alert>
    </div>
  )
};
