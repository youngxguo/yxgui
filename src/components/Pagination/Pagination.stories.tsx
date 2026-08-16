import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination, PaginationItem, PaginationLink, PaginationList } from './Pagination';

const meta = { title: 'Components/Pagination', component: Pagination } satisfies Meta<
  typeof Pagination
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationList>
        <PaginationItem>
          <PaginationLink aria-label="Previous page" href="#previous">
            Previous
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink current href="#2">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#3">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink aria-label="Next page" href="#next">
            Next
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  )
};
