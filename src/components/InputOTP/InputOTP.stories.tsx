import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './InputOTP';

const meta = {
  title: 'Components/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
  args: {
    length: 6
  }
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <InputOTP {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole('textbox', { name: 'Digit 1' });
    await userEvent.type(first, '1');
    expect(first).toHaveValue('1');
  }
};

export const Grouped: Story = {
  render: () => (
    <InputOTP length={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} aria-label="Digit 1" />
        <InputOTPSlot index={1} aria-label="Digit 2" />
        <InputOTPSlot index={2} aria-label="Digit 3" />
        <InputOTPSeparator />
        <InputOTPSlot index={3} aria-label="Digit 4" />
        <InputOTPSlot index={4} aria-label="Digit 5" />
        <InputOTPSlot index={5} aria-label="Digit 6" />
      </InputOTPGroup>
    </InputOTP>
  )
};
