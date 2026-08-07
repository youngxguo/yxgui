import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '../components/Typography';
import { colors } from './colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from './foundations.stylex';
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
    display: 'grid',
    gap: spacing.md
  },
  token: {
    alignItems: 'center',
    display: 'flex',
    gap: spacing.md
  },
  swatch: {
    borderColor: colors.borderDisabled,
    borderStyle: 'solid',
    borderWidth: '1px',
    height: '32px',
    width: '32px'
  }
});

type TokenGroupProps = {
  title: string;
  tokens: object;
  color?: boolean;
  prefix?: string;
  showValue?: boolean;
};

function TokenGroup({ title, tokens, color = false, prefix, showValue = true }: TokenGroupProps) {
  return (
    <section {...stylex.props(styles.section)}>
      <Typography variant="h2">{title}</Typography>
      <div {...stylex.props(styles.list)}>
        {Object.entries(tokens)
          .filter(([name]) => !name.startsWith('__'))
          .map(([name, value]) => {
            const label = prefix ? `${prefix}.${name}` : name;

            return (
              <div key={name} {...stylex.props(styles.token)}>
                {color && (
                  <span
                    aria-label={`${label} color swatch`}
                    {...stylex.props(styles.swatch)}
                    style={{ backgroundColor: String(value) }}
                  />
                )}
                <Typography>{showValue ? `${label}: ${String(value)}` : label}</Typography>
              </div>
            );
          })}
      </div>
    </section>
  );
}

const foundations = [
  ['Spacing', 'spacing', spacing],
  ['Radii', 'radii', radii],
  ['Font families', 'fontFamilies', fontFamilies],
  ['Font sizes', 'fontSizes', fontSizes],
  ['Font weights', 'fontWeights', fontWeights],
  ['Line heights', 'lineHeights', lineHeights]
] as const;

const meta = {
  title: 'Foundations/Design tokens'
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <main {...stylex.props(styles.page)}>
      <Typography variant="h1">Design tokens</Typography>
      <TokenGroup title="Palette" tokens={palette} color />
      <TokenGroup title="Semantic colors" tokens={colors} color showValue={false} />
      {foundations.map(([title, prefix, tokens]) => (
        <TokenGroup key={prefix} title={title} prefix={prefix} tokens={tokens} />
      ))}
    </main>
  )
};
