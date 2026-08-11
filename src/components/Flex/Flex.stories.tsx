import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { colors } from '../../theme/colors.stylex';
import { radii, spacing } from '../../theme/foundations.stylex';
import { Typography } from '../Typography';
import { Flex } from './Flex';

const styles = stylex.create({
  frame: {
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    width: '360px'
  },
  narrowFrame: {
    width: '220px'
  },
  tile: {
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    boxSizing: 'border-box',
    padding: spacing.md
  },
  fixedTile: {
    width: '96px'
  },
  shortTile: {
    paddingBlock: spacing.sm
  },
  tallTile: {
    paddingBlock: spacing.lg
  }
});

function Tile({ children, fixed = false }: { children: string; fixed?: boolean }) {
  return (
    <div {...stylex.props(styles.tile, fixed && styles.fixedTile)}>
      <Typography>{children}</Typography>
    </div>
  );
}

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
        <Tile>Alpha</Tile>
        <Tile>Beta</Tile>
        <Tile>Gamma</Tile>
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
        <Tile>First</Tile>
        <Tile>Second</Tile>
        <Tile>Third</Tile>
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
        <div {...stylex.props(styles.tile, styles.shortTile)}>
          <Typography>Short</Typography>
        </div>
        <div {...stylex.props(styles.tile, styles.tallTile)}>
          <Typography>Tall</Typography>
        </div>
        <div {...stylex.props(styles.tile)}>
          <Typography>Medium</Typography>
        </div>
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
          <Tile key={label} fixed>
            {label}
          </Tile>
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
      <Tile>100dvh minimum</Tile>
    </Flex>
  )
};
