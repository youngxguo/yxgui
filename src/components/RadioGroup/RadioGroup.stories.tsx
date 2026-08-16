import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup, RadioGroupLegend } from './RadioGroup';

const meta = { title: 'Components/RadioGroup', component: RadioGroup } satisfies Meta<
  typeof RadioGroup
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <RadioGroup>
      <RadioGroupLegend>Plan</RadioGroupLegend>
      <Radio defaultChecked label="Personal" name="plan" value="personal" />
      <Radio label="Team" name="plan" value="team" />
    </RadioGroup>
  )
};
export const Disabled: Story = {
  render: () => (
    <RadioGroup disabled>
      <RadioGroupLegend>Plan</RadioGroupLegend>
      <Radio label="Personal" name="disabled-plan" />
    </RadioGroup>
  )
};
