import type { Meta, StoryObj } from '@storybook/react-vite';
import { Listbox, ListboxOption } from './Listbox';

const options = (
  <>
    <ListboxOption value="accordion">Accordion</ListboxOption>
    <ListboxOption value="alert">Alert</ListboxOption>
    <ListboxOption value="button">Button</ListboxOption>
    <ListboxOption value="dialog">Dialog</ListboxOption>
    <ListboxOption value="tabs">Tabs</ListboxOption>
  </>
);

const meta = {
  title: 'Components/Listbox',
  component: Listbox,
  args: {
    children: options,
    defaultValue: 'alert',
    description: 'Use the arrow keys to move through the available components.',
    label: 'Components'
  }
} satisfies Meta<typeof Listbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Multiple: Story = {
  args: {
    defaultValue: ['alert', 'dialog'],
    description: 'Hold the platform modifier key to select more than one component.',
    label: 'Pinned components',
    multiple: true
  }
};
export const Invalid: Story = {
  args: { defaultValue: undefined, description: undefined, error: 'Choose a component.' }
};
export const Disabled: Story = { args: { disabled: true } };
