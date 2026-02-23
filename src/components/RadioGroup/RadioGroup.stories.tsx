import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Typography } from '../Typography/Typography';
import { Radio, RadioGroup } from './RadioGroup';

const meta = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs']
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledRadioGroupDemo() {
  const [value, setValue] = useState('email');

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <RadioGroup value={value} onValueChange={setValue} orientation="horizontal">
        <Radio value="email">Email</Radio>
        <Radio value="sms">SMS</Radio>
        <Radio value="push" disabled>
          Push
        </Radio>
      </RadioGroup>
      <Typography as="div" variant="muted">
        Selected: {value}
      </Typography>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="team" aria-label="Plan type">
      <Radio value="personal">Personal</Radio>
      <Radio value="team">Team</Radio>
      <Radio value="enterprise">Enterprise</Radio>
    </RadioGroup>
  )
};

export const Controlled: Story = {
  render: () => <ControlledRadioGroupDemo />
};
