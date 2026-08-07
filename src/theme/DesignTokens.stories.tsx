import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '../components/Typography';
import { colors } from './colors.stylex';
import { spacing } from './foundations.stylex';
import { palette } from './palette.stylex';

const styles = stylex.create({
  page: {
    display: 'grid',
    gap: spacing.lg,
    maxWidth: '720px'
  },
  section: {
    display: 'grid',
    gap: spacing.md
  },
  list: {
    display: 'grid'
  },
  row: {
    alignItems: 'center',
    borderBottomColor: colors.borderDisabled,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    display: 'grid',
    gap: spacing.lg,
    gridTemplateColumns: 'minmax(120px, 1fr) 32px minmax(100px, 1fr)',
    paddingBlock: spacing.md
  },
  foundationRow: {
    gridTemplateColumns: 'minmax(160px, 1fr) minmax(100px, 1fr)'
  },
  swatch: {
    borderColor: colors.borderDisabled,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    height: '32px',
    width: '32px'
  },
  gray50: { backgroundColor: palette.gray50 },
  gray400: { backgroundColor: palette.gray400 },
  gray600: { backgroundColor: palette.gray600 },
  gray900: { backgroundColor: palette.gray900 },
  gray950: { backgroundColor: palette.gray950 },
  blue400: { backgroundColor: palette.blue400 },
  blue500: { backgroundColor: palette.blue500 },
  blue600: { backgroundColor: palette.blue600 },
  blue700: { backgroundColor: palette.blue700 },
  surface: { backgroundColor: colors.surface },
  text: { backgroundColor: colors.text },
  textMuted: { backgroundColor: colors.textMuted },
  border: { backgroundColor: colors.border },
  borderDisabled: { backgroundColor: colors.borderDisabled },
  primary: { backgroundColor: colors.primary },
  primaryHover: { backgroundColor: colors.primaryHover },
  onEmphasis: { backgroundColor: colors.onEmphasis },
  surfaceDisabled: { backgroundColor: colors.surfaceDisabled },
  textDisabled: { backgroundColor: colors.textDisabled }
});

const paletteTokens = [
  { name: 'gray50', value: '#f9fafb', style: styles.gray50 },
  { name: 'gray400', value: '#9ca3af', style: styles.gray400 },
  { name: 'gray600', value: '#4b5563', style: styles.gray600 },
  { name: 'gray900', value: '#111827', style: styles.gray900 },
  { name: 'gray950', value: '#030712', style: styles.gray950 },
  { name: 'blue400', value: '#60a5fa', style: styles.blue400 },
  { name: 'blue500', value: '#3b82f6', style: styles.blue500 },
  { name: 'blue600', value: '#2563eb', style: styles.blue600 },
  { name: 'blue700', value: '#1d4ed8', style: styles.blue700 }
];

const semanticTokens = [
  { name: 'surface', style: styles.surface },
  { name: 'text', style: styles.text },
  { name: 'textMuted', style: styles.textMuted },
  { name: 'border', style: styles.border },
  { name: 'borderDisabled', style: styles.borderDisabled },
  { name: 'primary', style: styles.primary },
  { name: 'primaryHover', style: styles.primaryHover },
  { name: 'onEmphasis', style: styles.onEmphasis },
  { name: 'surfaceDisabled', style: styles.surfaceDisabled },
  { name: 'textDisabled', style: styles.textDisabled }
];

const foundationTokens = [
  ['spacing.sm', '4px'],
  ['spacing.md', '8px'],
  ['spacing.lg', '16px'],
  ['radii.sm', '4px'],
  ['fontFamilies.sans', 'system-ui, sans-serif'],
  ['fontSizes.sm', '14px'],
  ['fontSizes.md', '16px'],
  ['fontSizes.lg', '24px'],
  ['fontSizes.xl', '32px'],
  ['fontWeights.regular', '400'],
  ['fontWeights.semibold', '600'],
  ['lineHeights.sm', '20px'],
  ['lineHeights.md', '24px'],
  ['lineHeights.lg', '32px'],
  ['lineHeights.xl', '40px']
];

const meta = {
  title: 'Foundations/Palette and tokens'
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <main {...stylex.props(styles.page)}>
      <Typography variant="h1">Palette and tokens</Typography>

      <section {...stylex.props(styles.section)}>
        <Typography variant="h2">Palette</Typography>
        <div {...stylex.props(styles.list)}>
          {paletteTokens.map((token) => (
            <div key={token.name} {...stylex.props(styles.row)}>
              <Typography>{token.name}</Typography>
              <span {...stylex.props(styles.swatch, token.style)} />
              <Typography>{token.value}</Typography>
            </div>
          ))}
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <Typography variant="h2">Semantic colors</Typography>
        <div {...stylex.props(styles.list)}>
          {semanticTokens.map((token) => (
            <div key={token.name} {...stylex.props(styles.row)}>
              <Typography>{token.name}</Typography>
              <span {...stylex.props(styles.swatch, token.style)} />
              <Typography>theme-aware</Typography>
            </div>
          ))}
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <Typography variant="h2">Foundation tokens</Typography>
        <div {...stylex.props(styles.list)}>
          {foundationTokens.map(([name, value]) => (
            <div key={name} {...stylex.props(styles.row, styles.foundationRow)}>
              <Typography>{name}</Typography>
              <Typography>{value}</Typography>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
};
