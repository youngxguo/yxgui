import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload } from './FileUpload';

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  args: {
    accept: 'image/png,image/jpeg',
    description: 'PNG or JPEG, up to the limit enforced by your application.',
    label: 'Attachments',
    multiple: true
  }
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SingleFile: Story = { args: { multiple: false } };
export const Invalid: Story = { args: { error: 'Add at least one attachment.' } };
export const Disabled: Story = { args: { disabled: true } };
