import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './HoverCard';

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs']
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard openDelay={0}>
      <HoverCardTrigger>Hover profile</HoverCardTrigger>
      <HoverCardContent>
        <div style={{ display: 'grid', gap: 4 }}>
          <strong>@young</strong>
          <span>Frontend component library maintainer</span>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Hover profile' });
    await userEvent.hover(trigger);
    expect(await within(document.body).findByRole('dialog')).toBeInTheDocument();
  }
};
