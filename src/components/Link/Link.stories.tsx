import type { Meta, StoryObj } from '@storybook/react-vite';
import { GitHubIcon } from '../Icon';
import { Link } from './Link';

const meta = {
  title: 'Components/Link',
  component: Link,
  args: {
    children: 'Learn more',
    href: '#'
  }
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  render: (args) => (
    <Link {...args}>
      <GitHubIcon />
      GitHub
    </Link>
  )
};
