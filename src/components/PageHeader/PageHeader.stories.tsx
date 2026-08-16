import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '../Breadcrumb';
import { Button } from '../Button';
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle
} from './PageHeader';

const meta = { title: 'Components/PageHeader', component: PageHeader } satisfies Meta<
  typeof PageHeader
>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderTitle>Projects</PageHeaderTitle>
        <PageHeaderDescription>Create, organize, and monitor your work.</PageHeaderDescription>
      </PageHeaderContent>
    </PageHeader>
  )
};

export const WithActions: Story = {
  render: () => (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderTitle>Team members</PageHeaderTitle>
        <PageHeaderDescription>Manage access to the current workspace.</PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button type="button" variant="secondary">
          Export
        </Button>
        <Button type="button">Invite member</Button>
      </PageHeaderActions>
    </PageHeader>
  )
};

export const WithBreadcrumbs: Story = {
  render: () => (
    <PageHeader>
      <PageHeaderContent>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#projects">Projects</BreadcrumbLink>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbCurrent>yxgui</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PageHeaderTitle>yxgui</PageHeaderTitle>
        <PageHeaderDescription>A personal React component library.</PageHeaderDescription>
      </PageHeaderContent>
    </PageHeader>
  )
};
