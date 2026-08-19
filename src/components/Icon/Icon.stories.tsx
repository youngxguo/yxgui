import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { radii, spacing } from '../../theme/foundations.stylex';
import { Icon } from './Icon';

const styles = stylex.create({
  row: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.lg
  },
  tile: {
    alignItems: 'center',
    borderRadius: radii.sm,
    display: 'flex',
    height: '64px',
    justifyContent: 'center',
    width: '64px'
  }
});

const meta = {
  title: 'Components/Icons'
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brands: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      <div {...stylex.props(styles.tile)}>
        <Icon name="github" />
      </div>
      <div {...stylex.props(styles.tile)}>
        <Icon name="linkedin" />
      </div>
    </div>
  )
};

export const Interface: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      <div {...stylex.props(styles.tile)}>
        <Icon name="mail" />
      </div>
      <div {...stylex.props(styles.tile)}>
        <Icon name="sun" />
      </div>
      <div {...stylex.props(styles.tile)}>
        <Icon name="moon" />
      </div>
    </div>
  )
};
