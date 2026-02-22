import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { createTheme } from '../../theme/createTheme';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Badge',
    variant: 'primary',
    size: 'md'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline']
    },
    size: {
      control: 'select',
      options: ['sm', 'md']
    }
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args: ComponentProps<typeof Badge>) => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <Badge {...args} variant="primary">
        Primary
      </Badge>
      <Badge {...args} variant="secondary">
        Secondary
      </Badge>
      <Badge {...args} variant="outline">
        Outline
      </Badge>
    </div>
  )
};

export const Sizes: Story = {
  render: (args: ComponentProps<typeof Badge>) => (
    <div style={{ alignItems: 'center', display: 'flex', gap: '0.75rem' }}>
      <Badge {...args} size="sm">
        Small
      </Badge>
      <Badge {...args} size="md">
        Medium
      </Badge>
    </div>
  )
};

const coffeeBadgeTheme = createTheme({
  variants: {
    primary: {
      background: '#4a2a12',
      foreground: '#fff4e8'
    },
    secondary: {
      background: '#f8ebdc',
      foreground: '#4a2a12',
      border: '#f8ebdc',
      hoverBorder: '#b58f5f'
    },
    outline: {
      border: '#b58f5f',
      foreground: '#4a2a12'
    }
  }
});

export const CustomTheme: Story = {
  render: (args: ComponentProps<typeof Badge>) => (
    <ThemeProvider theme={coffeeBadgeTheme}>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Badge {...args} variant="primary">
          Coffee
        </Badge>
        <Badge {...args} variant="secondary">
          Roast
        </Badge>
        <Badge {...args} variant="outline">
          Origin
        </Badge>
      </div>
    </ThemeProvider>
  )
};
