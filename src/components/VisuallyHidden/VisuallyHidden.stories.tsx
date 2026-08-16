import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { VisuallyHidden } from './VisuallyHidden';

const meta = {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
  render: () => (
    <Button aria-describedby="hidden-description" type="button">
      ?<VisuallyHidden id="hidden-description">Open help</VisuallyHidden>
    </Button>
  )
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
