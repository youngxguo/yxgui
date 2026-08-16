import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../Checkbox';
import { Fieldset, FieldsetDescription, FieldsetLegend } from './Fieldset';

const meta = { title: 'Components/Fieldset', component: Fieldset } satisfies Meta<typeof Fieldset>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Fieldset>
      <FieldsetLegend>Notifications</FieldsetLegend>
      <FieldsetDescription>Choose which updates you receive.</FieldsetDescription>
      <label>
        <Checkbox defaultChecked /> Product updates
      </label>
      <label>
        <Checkbox /> Security alerts
      </label>
    </Fieldset>
  )
};
export const Disabled: Story = {
  render: () => (
    <Fieldset disabled>
      <FieldsetLegend>Notifications</FieldsetLegend>
      <label>
        <Checkbox /> Product updates
      </label>
    </Fieldset>
  )
};
