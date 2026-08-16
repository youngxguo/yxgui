import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Card } from '../Card';
import { Flex } from '../Flex';
import { MailIcon, MoonIcon } from '../Icon';
import { IconButton } from '../IconButton';
import { Status } from '../Status';
import { Typography } from '../Typography';
import {
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  AppShellSidebar,
  SidebarButton,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarLink,
  SidebarNav
} from './AppShell';

const meta = { title: 'Components/AppShell', component: AppShell } satisfies Meta<typeof AppShell>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppShell>
      <AppShellSidebar aria-label="Application sidebar">
        <SidebarHeader>yxgui</SidebarHeader>
        <SidebarContent>
          <SidebarNav label="Primary navigation">
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarLink active href="#overview">
                Overview
              </SidebarLink>
              <SidebarLink href="#components">Components</SidebarLink>
              <SidebarLink href="#settings">Settings</SidebarLink>
            </SidebarGroup>
          </SidebarNav>
        </SidebarContent>
        <SidebarFooter>
          <Avatar alt="Avery Stone" size="sm" />
          Avery Stone
        </SidebarFooter>
      </AppShellSidebar>
      <AppShellHeader>
        <Typography variant="h2">Workspace</Typography>
        <IconButton label="Toggle dark mode" variant="ghost">
          <MoonIcon />
        </IconButton>
      </AppShellHeader>
      <AppShellMain>
        <Flex direction="column" gap="lg">
          <Typography variant="h1">Overview</Typography>
          <Card>
            <Flex align="center" justify="space-between" gap="lg">
              <Typography>Production API</Typography>
              <Status variant="success">Operational</Status>
            </Flex>
          </Card>
        </Flex>
      </AppShellMain>
      <AppShellFooter>yxgui application shell</AppShellFooter>
    </AppShell>
  )
};

export const SidebarActions: Story = {
  render: () => (
    <AppShellSidebar aria-label="Message navigation">
      <SidebarHeader>Messages</SidebarHeader>
      <SidebarContent>
        <SidebarNav label="Mailboxes">
          <SidebarGroup>
            <SidebarGroupLabel>Mailboxes</SidebarGroupLabel>
            <SidebarButton active type="button">
              <MailIcon /> Inbox
            </SidebarButton>
            <SidebarButton type="button">Drafts</SidebarButton>
            <SidebarButton disabled type="button">
              Archive
            </SidebarButton>
          </SidebarGroup>
        </SidebarNav>
      </SidebarContent>
      <SidebarFooter>
        <Button fullWidth size="sm" type="button" variant="secondary">
          Compose
        </Button>
      </SidebarFooter>
    </AppShellSidebar>
  )
};
