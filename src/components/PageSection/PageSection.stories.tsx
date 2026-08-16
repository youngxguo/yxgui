import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from '../Item';
import { Status } from '../Status';
import {
  PageSection,
  PageSectionActions,
  PageSectionContent,
  PageSectionDescription,
  PageSectionHeader,
  PageSectionHeading,
  PageSectionTitle
} from './PageSection';

const meta = { title: 'Components/PageSection', component: PageSection } satisfies Meta<
  typeof PageSection
>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PageSection aria-labelledby="environments-heading">
      <PageSectionHeader>
        <PageSectionHeading>
          <PageSectionTitle id="environments-heading">Environments</PageSectionTitle>
          <PageSectionDescription>Monitor the services in this project.</PageSectionDescription>
        </PageSectionHeading>
        <PageSectionActions>
          <Button size="sm" type="button">
            Add environment
          </Button>
        </PageSectionActions>
      </PageSectionHeader>
      <PageSectionContent>
        <ItemGroup>
          <Item>
            <ItemContent>
              <ItemTitle>Production</ItemTitle>
              <ItemDescription>api.example.com</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Status variant="success">Operational</Status>
            </ItemActions>
          </Item>
        </ItemGroup>
      </PageSectionContent>
    </PageSection>
  )
};

export const WithoutActions: Story = {
  render: () => (
    <PageSection aria-labelledby="notes-heading">
      <PageSectionHeader>
        <PageSectionHeading>
          <PageSectionTitle id="notes-heading">Notes</PageSectionTitle>
          <PageSectionDescription>Shared context for this workspace.</PageSectionDescription>
        </PageSectionHeading>
      </PageSectionHeader>
      <PageSectionContent>
        <Item>
          <ItemContent>
            <ItemTitle>Release checklist</ItemTitle>
            <ItemDescription>Updated a few minutes ago.</ItemDescription>
          </ItemContent>
        </Item>
      </PageSectionContent>
    </PageSection>
  )
};
