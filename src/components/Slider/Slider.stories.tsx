import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Slider } from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Volume',
    defaultValue: 25,
    min: 0,
    max: 100,
    step: 5
  }
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider', { name: 'Volume' });
    await userEvent.click(slider);
    expect(slider).toBeInTheDocument();
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
