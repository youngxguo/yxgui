import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Typography } from './Typography';

const meta = {
  title: 'Foundations/Typography',
  component: Typography,
  tags: ['autodocs'],
  args: {
    variant: 'text',
    children:
      'Typography provides token-driven text styles with semantic rendering via the as prop.'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'text', 'lead', 'muted', 'small', 'code', 'blockquote']
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'small', 'code', 'blockquote']
    }
  }
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: ComponentProps<typeof Typography>) => <Typography {...args} />
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '0.9rem', maxWidth: 680 }}>
      <Typography variant="h1">Typography primitives</Typography>
      <Typography variant="h2">Section heading</Typography>
      <Typography variant="h3">Subsection heading</Typography>
      <Typography variant="h4">Tertiary heading</Typography>
      <Typography variant="lead">
        Lead copy is useful for intros, summaries, and callout text above dense content.
      </Typography>
      <Typography variant="text">
        Default body text keeps a readable line height and neutral color for longer paragraphs.
      </Typography>
      <Typography variant="blockquote">
        Design systems become easier to scale when typography styles are centralized and semantic.
      </Typography>
      <Typography variant="code">pnpm add yxgui</Typography>
      <Typography variant="small">Helper text for field descriptions or metadata.</Typography>
      <Typography variant="muted">
        Muted text for timestamps, hints, and secondary details.
      </Typography>
    </div>
  )
};

export const SemanticOverride: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 680 }}>
      <Typography as="h2" variant="h1">
        Visual h1 style rendered as an h2
      </Typography>
      <Typography as="span" variant="muted">
        Inline muted text rendered as a span.
      </Typography>
    </div>
  )
};
