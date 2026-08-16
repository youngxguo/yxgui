import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from '../Toggle';
import { ToggleGroup } from './ToggleGroup';

const meta = { title: 'Components/ToggleGroup', component: ToggleGroup } satisfies Meta<
  typeof ToggleGroup
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Single: Story = {
  render: () => (
    <ToggleGroup aria-label="Text alignment" defaultValue={['left']}>
      <Toggle value="left">Left</Toggle>
      <Toggle value="center">Center</Toggle>
      <Toggle value="right">Right</Toggle>
    </ToggleGroup>
  )
};
export const Multiple: Story = {
  render: () => (
    <ToggleGroup aria-label="Text formatting" defaultValue={['bold']} multiple>
      <Toggle value="bold">Bold</Toggle>
      <Toggle value="italic">Italic</Toggle>
      <Toggle value="underline">Underline</Toggle>
    </ToggleGroup>
  )
};
export const Vertical: Story = {
  render: () => (
    <ToggleGroup aria-label="Text alignment" orientation="vertical">
      <Toggle value="left">Left</Toggle>
      <Toggle value="center">Center</Toggle>
    </ToggleGroup>
  )
};
