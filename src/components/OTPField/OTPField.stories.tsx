import type { Meta, StoryObj } from '@storybook/react-vite';
import { OTPField } from './OTPField';

const meta = {
  title: 'Components/OTPField',
  component: OTPField,
  args: {
    description: 'Enter the six-digit code sent to your device.',
    label: 'Verification code',
    name: 'verification-code'
  }
} satisfies Meta<typeof OTPField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Grouped: Story = {
  args: { defaultValue: '123456', groupSize: 3 }
};

export const Disabled: Story = {
  args: { defaultValue: '123456', disabled: true }
};
