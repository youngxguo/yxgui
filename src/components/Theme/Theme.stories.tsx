import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fontFamilies, spacing } from '../../theme/foundations.stylex';
import { Theme } from './Theme';

const styles = stylex.create({
  modes: {
    display: 'grid',
    gap: spacing.lg,
    gridTemplateColumns: '1fr 1fr'
  },
  content: {
    fontFamily: fontFamilies.sans,
    padding: spacing.lg
  }
});

const meta = {
  title: 'Components/Theme',
  component: Theme
} satisfies Meta<typeof Theme>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Modes: Story = {
  render: () => (
    <div {...stylex.props(styles.modes)}>
      <Theme mode="light">
        <div {...stylex.props(styles.content)}>Light</div>
      </Theme>
      <Theme mode="dark">
        <div {...stylex.props(styles.content)}>Dark</div>
      </Theme>
    </div>
  )
};
