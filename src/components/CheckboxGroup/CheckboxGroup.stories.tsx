import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxGroup, CheckboxGroupLegend, CheckboxItem } from './CheckboxGroup';

const meta = { title: 'Components/CheckboxGroup', component: CheckboxGroup } satisfies Meta<
  typeof CheckboxGroup
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <CheckboxGroup>
      <CheckboxGroupLegend>Notifications</CheckboxGroupLegend>
      <CheckboxItem defaultChecked label="Product updates" name="notifications" value="product" />
      <CheckboxItem label="Security alerts" name="notifications" value="security" />
    </CheckboxGroup>
  )
};
export const Disabled: Story = {
  render: () => (
    <CheckboxGroup disabled>
      <CheckboxGroupLegend>Notifications</CheckboxGroupLegend>
      <CheckboxItem label="Product updates" name="disabled-notifications" />
    </CheckboxGroup>
  )
};
