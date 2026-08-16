import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordField } from './PasswordField';

const meta = {
  title: 'Components/PasswordField',
  component: PasswordField,
  args: {
    description: 'Use at least 12 characters.',
    label: 'Password',
    placeholder: 'Enter a password'
  }
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Visible: Story = { args: { defaultValue: 'correct horse', defaultVisible: true } };
export const Invalid: Story = {
  args: { defaultValue: 'short', error: 'Password must be at least 12 characters.' }
};
