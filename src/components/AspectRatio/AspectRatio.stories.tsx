import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Typography } from '../Typography/Typography';
import { AspectRatio } from './AspectRatio';

const meta = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs']
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ratio: 16 / 9
  },
  render: (args) => (
    <AspectRatio {...args} style={{ maxWidth: 640 }}>
      <div
        style={{
          alignItems: 'center',
          background:
            'linear-gradient(135deg, rgba(40,85,242,0.18), rgba(22,22,20,0.06), rgba(245,180,65,0.2))',
          border: '1px solid #e3e1d7',
          borderRadius: '0.5rem',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Typography as="p" variant="text">
          16:9 Media Placeholder
        </Typography>
      </div>
    </AspectRatio>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('16:9 Media Placeholder')).toBeVisible();
  }
};

export const Square: Story = {
  args: {
    ratio: 1
  },
  render: (args) => (
    <AspectRatio {...args} style={{ maxWidth: 280 }}>
      <div
        style={{
          backgroundColor: '#f4f4ef',
          border: '1px solid #cfcec5',
          borderRadius: '0.5rem',
          display: 'grid',
          gap: '0.35rem',
          height: '100%',
          padding: '0.75rem',
          placeContent: 'end start',
          width: '100%'
        }}
      >
        <Typography as="p" variant="small">
          Square Card
        </Typography>
        <Typography as="p" variant="muted">
          Useful for avatars, thumbnails, and image grids.
        </Typography>
      </div>
    </AspectRatio>
  )
};
