import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    'aria-label': 'Example textarea',
    placeholder: 'Textarea'
  }
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: 'Textarea value'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
