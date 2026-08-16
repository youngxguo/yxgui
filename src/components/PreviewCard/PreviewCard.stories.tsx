import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardTitle,
  PreviewCardTrigger
} from './PreviewCard';
import { Typography } from '../Typography';

const meta = {
  title: 'Components/PreviewCard',
  component: PreviewCard,
  render: (args) => (
    <Typography>
      <PreviewCard {...args}>
        Explore the principles behind{' '}
        <PreviewCardTrigger delay={0} href="#visual-systems">
          visual systems
        </PreviewCardTrigger>
        .
        <PreviewCardContent>
          <PreviewCardTitle>Visual systems</PreviewCardTitle>
          <PreviewCardDescription>
            A shared language for color, type, spacing, and interaction across an interface.
          </PreviewCardDescription>
        </PreviewCardContent>
      </PreviewCard>
    </Typography>
  )
} satisfies Meta<typeof PreviewCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
