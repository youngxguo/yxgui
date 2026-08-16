import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../Card';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { Carousel } from './Carousel';

const styles = stylex.create({ frame: { width: '448px' } });

const slides = [
  ['Foundations', 'Color, typography, spacing, and layout.'],
  ['Components', 'Accessible behavior with a closed visual system.'],
  ['Patterns', 'Composed interfaces for personal applications.']
] as const;

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  args: { children: null },
  render: (args) => (
    <div {...stylex.props(styles.frame)}>
      <Carousel {...args} aria-label="Library tour">
        {slides.map(([title, description]) => (
          <Card key={title}>
            <Flex direction="column" gap="sm">
              <Typography variant="h2">{title}</Typography>
              <Typography color="muted">{description}</Typography>
            </Flex>
          </Card>
        ))}
      </Carousel>
    </div>
  )
} satisfies Meta<typeof Carousel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Compact: Story = { args: { itemSize: 'compact', loop: true } };
