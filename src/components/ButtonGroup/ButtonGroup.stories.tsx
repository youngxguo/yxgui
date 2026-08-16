import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { ButtonGroup } from './ButtonGroup';

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  args: { 'aria-label': 'Document actions' }
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Attached: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button type="button">Save</Button>
      <Button type="button">Duplicate</Button>
      <Button type="button">Archive</Button>
    </ButtonGroup>
  )
};

export const Detached: Story = {
  args: { attached: false },
  render: Attached.render
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: Attached.render
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: Attached.render
};

export const Disabled: Story = {
  args: { disabled: true },
  render: Attached.render
};
