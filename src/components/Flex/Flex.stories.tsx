import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../Card';
import { Typography } from '../Typography';
import { Flex } from './Flex';

const styles = stylex.create({
  frame: {
    width: '360px'
  },
  narrowFrame: {
    width: '220px'
  }
});

const meta = {
  title: 'Components/Flex',
  component: Flex,
  args: {
    direction: 'row',
    align: 'stretch',
    justify: 'start',
    wrap: false
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column']
    },
    gap: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch']
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between']
    },
    minHeight: {
      control: 'select',
      options: ['viewport']
    }
  }
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gap: 'md'
  },
  render: (args) => (
    <div {...stylex.props(styles.frame)}>
      <Flex {...args}>
        <Card>
          <Typography>Alpha</Typography>
        </Card>
        <Card>
          <Typography>Beta</Typography>
        </Card>
        <Card>
          <Typography>Gamma</Typography>
        </Card>
      </Flex>
    </div>
  )
};

export const Column: Story = {
  args: {
    direction: 'column',
    gap: 'sm',
    padding: 'md'
  },
  render: (args) => (
    <div {...stylex.props(styles.frame)}>
      <Flex {...args}>
        <Card>
          <Typography>First</Typography>
        </Card>
        <Card>
          <Typography>Second</Typography>
        </Card>
        <Card>
          <Typography>Third</Typography>
        </Card>
      </Flex>
    </div>
  )
};

export const Alignment: Story = {
  args: {
    align: 'center',
    justify: 'space-between',
    padding: 'md'
  },
  render: (args) => (
    <div {...stylex.props(styles.frame)}>
      <Flex {...args}>
        <Card>
          <Typography>Body</Typography>
        </Card>
        <Card>
          <Typography variant="h1">Heading</Typography>
        </Card>
        <Card>
          <Typography variant="h2">Subheading</Typography>
        </Card>
      </Flex>
    </div>
  )
};

export const Wrapped: Story = {
  args: {
    gap: 'sm',
    padding: 'sm',
    wrap: true
  },
  render: (args) => (
    <div {...stylex.props(styles.frame, styles.narrowFrame)}>
      <Flex {...args}>
        {['One', 'Two', 'Three', 'Four', 'Five'].map((label) => (
          <Card key={label}>
            <Typography>{label}</Typography>
          </Card>
        ))}
      </Flex>
    </div>
  )
};

export const ViewportHeight: Story = {
  args: {
    align: 'center',
    justify: 'center',
    minHeight: 'viewport',
    padding: 'md'
  },
  render: (args) => (
    <Flex {...args}>
      <Card>
        <Typography>100dvh minimum</Typography>
      </Card>
    </Flex>
  )
};
