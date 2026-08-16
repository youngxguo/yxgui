import type { Meta, StoryObj } from '@storybook/react-vite';
import { CopyButton } from './CopyButton';

const meta = {
  title: 'Components/CopyButton',
  component: CopyButton,
  args: { value: 'pnpm add yxgui' }
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomLabels: Story = {
  args: { copiedLabel: 'Command copied', label: 'Copy install command' }
};
export const Disabled: Story = { args: { disabled: true } };
