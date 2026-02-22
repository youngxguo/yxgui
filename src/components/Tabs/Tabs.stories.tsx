import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Tabs, TabsList, TabsPanel, TabsTrigger } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs']
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'account'
  },
  render: () => (
    <Tabs defaultValue="account" style={{ maxWidth: 520 }}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="members">Members</TabsTrigger>
      </TabsList>
      <TabsPanel value="account">Profile settings and personal details.</TabsPanel>
      <TabsPanel value="billing">Invoices, payment methods, and receipts.</TabsPanel>
      <TabsPanel value="members">Team members and workspace roles.</TabsPanel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: 'Billing' }));
    expect(canvas.getByRole('tabpanel', { name: 'Billing' })).toBeVisible();
  }
};
