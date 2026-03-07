import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Combobox } from './Combobox';

const frameworkOptions = [
  { value: 'react', label: 'React', keywords: ['js'] },
  { value: 'vue', label: 'Vue', keywords: ['javascript'] },
  { value: 'svelte', label: 'Svelte', keywords: ['compiler'] },
  { value: 'solid', label: 'Solid', keywords: ['signals'] }
];

const meta = {
  title: 'Forms/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  args: {
    options: frameworkOptions,
    placeholder: 'Select framework',
    searchPlaceholder: 'Search frameworks',
    'aria-label': 'Framework'
  },
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox', { name: 'Framework' });

    await userEvent.click(trigger);
    const searchInput = await within(document.body).findByRole('textbox', {
      name: 'Search options'
    });
    await userEvent.type(searchInput, 'rea');
    await userEvent.click(await within(document.body).findByRole('option', { name: 'React' }));

    expect(canvas.getByRole('combobox', { name: 'Framework' })).toHaveTextContent('React');
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'react'
  }
};
