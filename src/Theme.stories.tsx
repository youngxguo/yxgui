import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { darkTheme, lightTheme } from './themes';
import { colors, radii, typography } from './tokens.stylex';

const styles = stylex.create({
  grid: {
    gap: '1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))'
  },
  preview: {
    padding: '1.5rem',
    borderColor: colors.borderDefault,
    borderRadius: radii.container,
    borderStyle: 'solid',
    borderWidth: 1,
    gap: '1rem',
    backgroundColor: colors.backgroundCanvas,
    color: colors.foregroundDefault,
    display: 'grid',
    fontFamily: typography.bodyFamily
  },
  heading: {
    marginBlock: 0,
    fontFamily: typography.headingFamily,
    fontSize: typography.headingSize,
    fontWeight: typography.headingWeight,
    letterSpacing: typography.headingLetterSpacing,
    lineHeight: typography.headingLineHeight
  },
  body: {
    marginBlock: 0,
    color: colors.foregroundMuted,
    fontSize: typography.bodySize,
    lineHeight: typography.bodyLineHeight
  }
});

function ThemePreview({ name }: { name: 'Light' | 'Dark' }) {
  const theme = name === 'Light' ? lightTheme : darkTheme;

  return (
    <section {...stylex.props(theme, styles.preview)}>
      <div>
        <h2 {...stylex.props(styles.heading)}>{name}</h2>
        <p {...stylex.props(styles.body)}>Built from semantic StyleX variables.</p>
      </div>
      <Button>Button</Button>
    </section>
  );
}

function ThemeComparison() {
  return (
    <div {...stylex.props(styles.grid)}>
      <ThemePreview name="Light" />
      <ThemePreview name="Dark" />
    </div>
  );
}

const meta = {
  title: 'Foundations/Theme',
  component: ThemeComparison,
  parameters: {
    controls: { disable: true }
  },
  tags: ['autodocs']
} satisfies Meta<typeof ThemeComparison>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LightAndDark: Story = {};
