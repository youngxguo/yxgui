import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { createTheme } from '../../theme/createTheme';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Email address',
    size: 'md',
    disabled: false,
    invalid: false
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args: ComponentProps<typeof Input>) => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 320 }}>
      <Input {...args} size="sm" placeholder="Small input" />
      <Input {...args} size="md" placeholder="Medium input" />
      <Input {...args} size="lg" placeholder="Large input" />
    </div>
  )
};

export const States: Story = {
  render: (args: ComponentProps<typeof Input>) => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 320 }}>
      <Input {...args} placeholder="Enabled" />
      <Input {...args} disabled placeholder="Disabled" />
      <Input {...args} invalid placeholder="Invalid" defaultValue="bad@" />
    </div>
  )
};

const coffeeInputTheme = createTheme({
  border: {
    focus: '#7a4b1b'
  },
  control: {
    background: '#fff8ef',
    backgroundDisabled: '#efe3d2',
    border: '#c8a47a',
    borderFocus: '#7a4b1b',
    placeholder: '#8a6a4a'
  },
  components: {
    input: {
      invalidBorder: '#a63a2b'
    }
  }
});

export const CustomTheme: Story = {
  render: (args: ComponentProps<typeof Input>) => (
    <ThemeProvider theme={coffeeInputTheme}>
      <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 320 }}>
        <Input {...args} placeholder="Brew name" />
        <Input {...args} invalid defaultValue="acidic??" />
      </div>
    </ThemeProvider>
  )
};
