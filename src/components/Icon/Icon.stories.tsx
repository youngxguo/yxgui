import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { radii, spacing } from '../../theme/foundations.stylex';
import { palette } from '../../theme/palette.stylex';
import { GitHubIcon, LinkedInIcon, MailIcon, MoonIcon, SunIcon } from './Icon';

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
  },
  light: {
    backgroundColor: palette.gray50
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
      <div {...stylex.props(styles.tile, styles.light)}>
        <GitHubIcon />
      </div>
      <div {...stylex.props(styles.tile, styles.light)}>
        <LinkedInIcon />
      </div>
    </div>
  )
};

export const Interface: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      <div {...stylex.props(styles.tile)}>
        <MailIcon />
      </div>
      <div {...stylex.props(styles.tile)}>
        <SunIcon />
      </div>
      <div {...stylex.props(styles.tile)}>
        <MoonIcon />
      </div>
    </div>
  )
};
