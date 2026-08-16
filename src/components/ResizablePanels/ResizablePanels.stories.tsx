import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResizablePanels } from './ResizablePanels';

const meta = {
  title: 'Components/ResizablePanels',
  component: ResizablePanels,
  args: {
    first: <strong>Navigation</strong>,
    firstLabel: 'Navigation panel',
    second: (
      <div>
        <strong>Workspace</strong>
        <p>Drag the separator or use the arrow keys to resize these panels.</p>
      </div>
    ),
    secondLabel: 'Workspace panel'
  }
} satisfies Meta<typeof ResizablePanels>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const Vertical: Story = { args: { defaultSize: 55, orientation: 'vertical' } };
