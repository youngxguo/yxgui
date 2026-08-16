import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <TooltipProvider delay={0}>
        <Story />
      </TooltipProvider>
    )
  ],
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger aria-label="Save changes">Save</TooltipTrigger>
      <TooltipContent>Save changes</TooltipContent>
    </Tooltip>
  )
} satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Visible: Story = { args: { defaultOpen: true } };
