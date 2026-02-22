import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  args: {
    type: 'single'
  }
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center" aria-label="Alignment">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const left = canvas.getByRole('button', { name: 'Left' });
    await userEvent.click(left);
    expect(left).toHaveAttribute('aria-pressed', 'true');
  }
};

export const Multiple: Story = {
  args: {
    type: 'multiple'
  },
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['bold']} aria-label="Formatting">
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline" disabled>
        Underline
      </ToggleGroupItem>
    </ToggleGroup>
  )
};
