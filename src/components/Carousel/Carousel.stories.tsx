import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { AspectRatio } from '../AspectRatio/AspectRatio';
import { Button } from '../Button/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../Card/Card';
import { Typography } from '../Typography/Typography';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselViewport
} from './Carousel';

const meta = {
  title: 'Content/Carousel',
  component: Carousel,
  tags: ['autodocs']
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

function MediaTile({
  title,
  subtitle,
  accent
}: {
  title: string;
  subtitle: string;
  accent: string;
}) {
  return (
    <Card style={{ width: '100%' }}>
      <AspectRatio ratio={16 / 9}>
        <div
          style={{
            alignItems: 'flex-end',
            background: `linear-gradient(140deg, ${accent}, #161614)`,
            color: '#fcfcf9',
            display: 'flex',
            height: '100%',
            padding: '1rem'
          }}
        >
          <Typography as="p" variant="small">
            {subtitle}
          </Typography>
        </div>
      </AspectRatio>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Typography variant="muted">
          Use the carousel as a baseline wrapper for media cards, featured content, or onboarding
          slides.
        </Typography>
      </CardContent>
      <CardFooter>
        <Button variant="ghost">Dismiss</Button>
        <Button>Open</Button>
      </CardFooter>
    </Card>
  );
}

export const Default: Story = {
  render: () => (
    <Carousel aria-label="Featured updates" style={{ margin: '0 auto', maxWidth: 720 }}>
      <CarouselViewport>
        <CarouselContent>
          <CarouselItem>
            <MediaTile title="Release Notes" subtitle="Version 2.4 highlights" accent="#2855f2" />
          </CarouselItem>
          <CarouselItem>
            <MediaTile
              title="Design Review"
              subtitle="New card layout explorations"
              accent="#0f766e"
            />
          </CarouselItem>
          <CarouselItem>
            <MediaTile title="Team Ops" subtitle="Weekly handoff checklist" accent="#b45309" />
          </CarouselItem>
        </CarouselContent>
      </CarouselViewport>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole('region', { name: 'Featured updates' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Next slide' })).toBeInTheDocument();
    expect(canvas.getByRole('heading', { name: 'Release Notes' })).toBeInTheDocument();
  }
};
