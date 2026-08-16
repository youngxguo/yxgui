import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Switch } from '../Switch';
import {
  Item,
  ItemActions,
  ItemButton,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemLink,
  ItemMedia,
  ItemTitle
} from './Item';

const meta = { title: 'Components/Item', component: Item } satisfies Meta<typeof Item>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Item>
      <ItemMedia>
        <Avatar alt="Avery Stone" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Avery Stone</ItemTitle>
        <ItemDescription>avery@example.com</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge variant="success">Active</Badge>
      </ItemActions>
    </Item>
  )
};

export const Navigation: Story = {
  render: () => (
    <ItemGroup>
      <ItemLink href="#profile">
        <ItemContent>
          <ItemTitle>Profile</ItemTitle>
          <ItemDescription>Update your name, avatar, and contact details.</ItemDescription>
        </ItemContent>
        <ItemActions aria-hidden="true">→</ItemActions>
      </ItemLink>
      <ItemLink href="#security">
        <ItemContent>
          <ItemTitle>Security</ItemTitle>
          <ItemDescription>Manage passwords and active sessions.</ItemDescription>
        </ItemContent>
        <ItemActions aria-hidden="true">→</ItemActions>
      </ItemLink>
    </ItemGroup>
  )
};

export const ButtonItem: Story = {
  render: () => (
    <ItemButton type="button">
      <ItemContent>
        <ItemTitle>Personal workspace</ItemTitle>
        <ItemDescription>Switch to your private projects and settings.</ItemDescription>
      </ItemContent>
      <ItemActions aria-hidden="true">→</ItemActions>
    </ItemButton>
  )
};

export const Actions: Story = {
  render: () => (
    <Item>
      <ItemContent>
        <ItemTitle>Weekly summary</ItemTitle>
        <ItemDescription>Receive a digest every Monday morning.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Switch aria-label="Weekly summary" defaultChecked />
        <Button type="button">Configure</Button>
      </ItemActions>
    </Item>
  )
};

export const Disabled: Story = {
  render: () => (
    <ItemButton disabled type="button">
      <ItemContent>
        <ItemTitle>Enterprise workspace</ItemTitle>
        <ItemDescription>Ask an administrator for access.</ItemDescription>
      </ItemContent>
    </ItemButton>
  )
};
