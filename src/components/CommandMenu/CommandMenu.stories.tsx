import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CommandMenu, type CommandMenuOption, type CommandMenuProps } from './CommandMenu';

const options: CommandMenuOption[] = [
  {
    description: 'Create a new document in this workspace.',
    id: 'new-file',
    keywords: ['document', 'add'],
    label: 'New file',
    shortcut: '⌘N'
  },
  {
    description: 'Find a component by name.',
    id: 'search-components',
    label: 'Search components',
    shortcut: '⌘P'
  },
  {
    description: 'Change the active color mode.',
    id: 'switch-theme',
    label: 'Switch theme'
  },
  { disabled: true, id: 'delete-project', label: 'Delete project' }
];

const meta = {
  title: 'Components/CommandMenu',
  component: CommandMenu,
  args: {
    description: 'Search application actions and run one without leaving the keyboard.',
    onSelect: () => undefined,
    options,
    title: 'Command menu',
    trigger: 'Open commands'
  }
} satisfies Meta<typeof CommandMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

function CommandMenuDemo(args: CommandMenuProps) {
  const [selection, setSelection] = useState('No command selected.');
  return (
    <div>
      <CommandMenu {...args} onSelect={(option) => setSelection(option.label)} />
      <p aria-live="polite">{selection}</p>
    </div>
  );
}

export const Default: Story = {
  render: (args) => <CommandMenuDemo {...args} />
};

export const Open: Story = { args: { defaultOpen: true } };
