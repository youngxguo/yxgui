import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '../Icon';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button'
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LeadingIcon: Story = {
  args: {
    children: (
      <>
        <Icon name="mail" />
        Send email
      </>
    )
  }
};

export const TrailingIcon: Story = {
  args: {
    children: (
      <>
        Continue
        <Icon name="sun" />
      </>
    )
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
