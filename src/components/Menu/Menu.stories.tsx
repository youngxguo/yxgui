import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuTrigger
} from './Menu';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  render: (args) => (
    <Menu {...args}>
      <MenuTrigger>View options</MenuTrigger>
      <MenuContent>
        <MenuRadioGroup defaultValue="date">
          <MenuGroupLabel>Sort by</MenuGroupLabel>
          <MenuRadioItem value="date">Date</MenuRadioItem>
          <MenuRadioItem value="name">Name</MenuRadioItem>
        </MenuRadioGroup>
        <MenuSeparator />
        <MenuCheckboxItem defaultChecked>Show archived</MenuCheckboxItem>
        <MenuSeparator />
        <MenuItem>Duplicate</MenuItem>
        <MenuItem danger>Delete</MenuItem>
      </MenuContent>
    </Menu>
  )
} satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Menu {...args}>
      <MenuTrigger>View options</MenuTrigger>
      <MenuContent>
        <MenuCheckboxItem defaultChecked>Show archived</MenuCheckboxItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem danger>Delete</MenuItem>
      </MenuContent>
    </Menu>
  )
};
