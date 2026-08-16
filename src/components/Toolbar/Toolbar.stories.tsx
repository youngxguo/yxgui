import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator
} from './Toolbar';

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  args: { 'aria-label': 'Editor controls' }
} satisfies Meta<typeof Toolbar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarGroup aria-label="History">
        <ToolbarButton>Undo</ToolbarButton>
        <ToolbarButton>Redo</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Insert">
        <ToolbarButton>Image</ToolbarButton>
        <ToolbarButton>Link</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarLink href="#saved">Saved</ToolbarLink>
    </Toolbar>
  )
};
export const WithInput: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarButton>Previous</ToolbarButton>
      <ToolbarButton>Next</ToolbarButton>
      <ToolbarInput aria-label="Find" placeholder="Find" />
    </Toolbar>
  )
};
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarButton>Cut</ToolbarButton>
      <ToolbarButton>Copy</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton>Paste</ToolbarButton>
    </Toolbar>
  )
};
