import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from './Breadcrumb';

const meta = { title: 'Components/Breadcrumb', component: Breadcrumb } satisfies Meta<
  typeof Breadcrumb
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#home">Home</BreadcrumbLink>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#projects">Projects</BreadcrumbLink>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbCurrent>yxgui</BreadcrumbCurrent>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
};
