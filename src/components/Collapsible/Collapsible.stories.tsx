import type { Meta, StoryObj } from '@storybook/react-vite';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './Collapsible';

const meta = { title: 'Components/Collapsible', component: Collapsible } satisfies Meta<
  typeof Collapsible
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
      <CollapsibleContent>Configure retry limits and request timeouts.</CollapsibleContent>
    </Collapsible>
  )
};
export const Open: Story = {
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
      <CollapsibleContent>Configure retry limits and request timeouts.</CollapsibleContent>
    </Collapsible>
  )
};
