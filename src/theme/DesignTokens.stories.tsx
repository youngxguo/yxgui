import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '../components/Typography';
import { colors } from './colors.stylex';
import { radii, spacing } from './foundations.stylex';
import { palette } from './palette.stylex';

const styles = stylex.create({
  page: {
    display: 'grid',
    gap: spacing.lg
  },
  group: {
    display: 'grid',
    gap: spacing.md
  },
  swatches: {
    display: 'grid',
    gap: spacing.lg,
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))'
  },
  item: {
    display: 'grid',
    gap: spacing.md
  },
  swatch: {
    borderColor: colors.borderDisabled,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    height: '64px'
  }
});

function Swatches({ tokens }: { tokens: object }) {
  return (
    <div {...stylex.props(styles.swatches)}>
      {Object.entries(tokens)
        .filter(([name]) => !name.startsWith('__'))
        .map(([name, value]) => (
          <div key={name} {...stylex.props(styles.item)}>
            <span
              aria-hidden="true"
              {...stylex.props(styles.swatch)}
              style={{ backgroundColor: String(value) }}
            />
            <Typography>{name}</Typography>
          </div>
        ))}
    </div>
  );
}

const meta = {
  title: 'Foundations/Colors'
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <main {...stylex.props(styles.page)}>
      <Typography variant="h1">Colors</Typography>

      <section {...stylex.props(styles.group)}>
        <Typography variant="h2">Palette</Typography>
        <Swatches tokens={palette} />
      </section>

      <section {...stylex.props(styles.group)}>
        <Typography variant="h2">Semantic colors</Typography>
        <Swatches tokens={colors} />
      </section>
    </main>
  )
};
