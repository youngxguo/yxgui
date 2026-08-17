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
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemLink,
  ItemMedia,
  ItemSeparator,
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

export const RichMetadata: Story = {
  render: () => (
    <Item variant="muted">
      <ItemHeader>
        <Badge>Release</Badge>
        <ItemDescription>Today at 10:42 AM</ItemDescription>
      </ItemHeader>
      <ItemMedia>
        <Avatar alt="Young Guo" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Version 1.0.0 is ready</ItemTitle>
        <ItemDescription>All package, consumer, and browser checks passed.</ItemDescription>
      </ItemContent>
      <ItemFooter>
        <span>8 components changed</span>
        <Button type="button" variant="secondary">
          Review
        </Button>
      </ItemFooter>
    </Item>
  )
};

export const Densities: Story = {
  render: () => (
    <ItemGroup>
      <Item size="xs" variant="default">
        <ItemContent>
          <ItemTitle>Compact default item</ItemTitle>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item size="sm">
        <ItemContent>
          <ItemTitle>Small outline item</ItemTitle>
          <ItemDescription>Useful for settings and compact lists.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
};
