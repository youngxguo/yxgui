import type { Meta, StoryObj } from '@storybook/react-vite';
import { MultiSelect } from './MultiSelect';

const options = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'StyleX', value: 'stylex' },
  { label: 'Base UI', value: 'base-ui' },
  { label: 'Storybook', value: 'storybook' },
  { disabled: true, label: 'Vue (unavailable)', value: 'vue' }
] as const;

const meta = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  args: {
    defaultValue: ['react', 'typescript'],
    description: 'Choose every technology used by the project.',
    label: 'Technologies',
    options
  }
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
