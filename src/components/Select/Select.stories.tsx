import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  args: { 'aria-label': 'Workspace' }
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    children: (
      <>
        <option>Personal</option>
        <option>Team</option>
      </>
    )
  }
};
export const Disabled: Story = { args: { children: <option>Personal</option>, disabled: true } };
export const Invalid: Story = {
  args: { 'aria-invalid': true, children: <option>Choose one</option> }
};
