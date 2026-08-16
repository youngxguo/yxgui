import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab, Tabs, TabsList, TabsPanel } from './Tabs';

const meta = { title: 'Components/Tabs', component: Tabs } satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList aria-label="Workspace sections">
        <Tab value="overview">Overview</Tab>
        <Tab value="projects">Projects</Tab>
        <Tab value="account">Account</Tab>
      </TabsList>
      <TabsPanel value="overview">Workspace stats and activity.</TabsPanel>
      <TabsPanel value="projects">Your active projects.</TabsPanel>
      <TabsPanel value="account">Account preferences.</TabsPanel>
    </Tabs>
  )
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="general" orientation="vertical">
      <TabsList aria-label="Settings sections">
        <Tab value="general">General</Tab>
        <Tab value="security">Security</Tab>
      </TabsList>
      <TabsPanel value="general">General settings.</TabsPanel>
      <TabsPanel value="security">Security settings.</TabsPanel>
    </Tabs>
  )
};
