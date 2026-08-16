import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '../Item';
import { Status } from './Status';

const meta = {
  title: 'Components/Status',
  component: Status,
  args: { children: 'Operational', variant: 'success' }
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Flex align="start" direction="column" gap="md">
      <Status>Queued</Status>
      <Status variant="info">Running</Status>
      <Status variant="success">Operational</Status>
      <Status variant="warning">Degraded</Status>
      <Status variant="danger">Unavailable</Status>
    </Flex>
  )
};

export const InContext: Story = {
  render: () => (
    <Item>
      <ItemContent>
        <ItemTitle>Production API</ItemTitle>
        <ItemDescription>Last checked a few seconds ago.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Status variant="success">Operational</Status>
      </ItemActions>
    </Item>
  )
};
