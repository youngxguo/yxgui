import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Typography } from '../Typography/Typography';
import { ScrollArea, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from './ScrollArea';

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs']
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea style={{ height: 160, width: 280 }}>
      <ScrollAreaViewport
        aria-label="Scrollable activity list"
        style={{ height: 160, padding: '0.75rem' }}
      >
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {Array.from({ length: 16 }, (_, index) => (
            <Typography key={index} as="div">
              Activity item {index + 1}
            </Typography>
          ))}
        </div>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  ),
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByLabelText('Scrollable activity list')).toBeInTheDocument();
  }
};

export const HorizontalContent: Story = {
  render: () => (
    <ScrollArea style={{ height: 120, width: 320, paddingBottom: 16 }}>
      <ScrollAreaViewport aria-label="Horizontal tags" style={{ width: 320, height: 100 }}>
        <div style={{ display: 'flex', gap: 8, width: 720, padding: '0.5rem' }}>
          {Array.from({ length: 20 }, (_, index) => (
            <Typography
              key={index}
              as="div"
              variant="small"
              style={{ border: '1px solid #cfcec5', borderRadius: 8, padding: '0.25rem 0.5rem' }}
            >
              Tag {index + 1}
            </Typography>
          ))}
        </div>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  )
};
