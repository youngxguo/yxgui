import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../components/Flex';
import { Typography } from '../components/Typography';
import { colors } from './colors.stylex';
import { radii } from './foundations.stylex';
import { palette } from './palette.stylex';

const styles = stylex.create({
  swatch: {
    borderColor: colors.borderDisabled,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    height: '64px',
    width: '120px'
  }
});

function Swatches({ tokens }: { tokens: object }) {
  return (
    <Flex gap="lg" wrap>
      {Object.entries(tokens)
        .filter(([name]) => !name.startsWith('__'))
        .map(([name, value]) => (
          <Flex key={name} direction="column" gap="md">
            <span
              aria-hidden="true"
              {...stylex.props(styles.swatch)}
              style={{ backgroundColor: String(value) }}
            />
            <Typography>{name}</Typography>
          </Flex>
        ))}
    </Flex>
  );
}

const meta = {
  title: 'Foundations/Colors'
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      <Typography variant="h1">Colors</Typography>

      <Flex direction="column" gap="md">
        <Typography variant="h2">Palette</Typography>
        <Swatches tokens={palette} />
      </Flex>

      <Flex direction="column" gap="md">
        <Typography variant="h2">Semantic colors</Typography>
        <Swatches tokens={colors} />
      </Flex>
    </Flex>
  )
};
