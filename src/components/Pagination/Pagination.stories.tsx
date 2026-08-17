import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious
} from './Pagination';

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
          <PaginationPrevious href="#previous" />
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
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#12">12</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#next" />
        </PaginationItem>
      </PaginationList>
    </Pagination>
  )
};
