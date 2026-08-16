import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AspectRatio } from './AspectRatio';

const styles = stylex.create({
  frame: {
    maxWidth: '360px'
  },
  media: {
    alignItems: 'center',
    backgroundColor: '#bfdbfe',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  label: {
    color: '#172033',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600
  }
});

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Widescreen: Story = {
  render: () => (
    <div {...stylex.props(styles.frame)}>
      <AspectRatio>
        <div {...stylex.props(styles.media)}>
          <span {...stylex.props(styles.label)}>16:9</span>
        </div>
      </AspectRatio>
    </div>
  )
};

export const Square: Story = {
  render: () => (
    <div {...stylex.props(styles.frame)}>
      <AspectRatio ratio={1}>
        <div {...stylex.props(styles.media)}>
          <span {...stylex.props(styles.label)}>1:1</span>
        </div>
      </AspectRatio>
    </div>
  )
};
