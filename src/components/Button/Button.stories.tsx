import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Button } from './Button';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { createTheme } from '../../theme/createTheme';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Press me',
    variant: 'primary',
    size: 'md',
    disabled: false
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args: ComponentProps<typeof Button>) => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </div>
  )
};

export const Sizes: Story = {
  render: (args: ComponentProps<typeof Button>) => (
    <div style={{ alignItems: 'center', display: 'flex', gap: '0.75rem' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  )
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

const espressoTheme = createTheme({
  palette: {
    background: '#f7efe1',
    foreground: '#2e1808',
    border: '#b58f5f',
    focusRing: '#7a4b1b'
  },
  components: {
    button: {
      primaryBackground: '#4a2a12',
      primaryForeground: '#fff4e8',
      secondaryBackground: '#fdf4ea',
      secondaryBorder: '#b58f5f',
      secondaryHoverBorder: '#9f7540',
      ghostHoverBackground: 'rgba(74, 42, 18, 0.08)'
    }
  }
});

export const CustomTheme: Story = {
  render: (args: ComponentProps<typeof Button>) => (
    <ThemeProvider theme={espressoTheme}>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Button {...args} variant="primary">
          Primary
        </Button>
        <Button {...args} variant="secondary">
          Secondary
        </Button>
        <Button {...args} variant="ghost">
          Ghost
        </Button>
      </div>
    </ThemeProvider>
  )
};
