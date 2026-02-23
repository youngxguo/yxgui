import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../Checkbox/Checkbox';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { Textarea } from '../Textarea/Textarea';
import {
  FormField,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
  FormFieldLabel
} from './FormField';

const meta = {
  title: 'Forms/FormField',
  component: FormField,
  tags: ['autodocs']
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: 360 }}>
      <FormField>
        <FormFieldLabel>Email</FormFieldLabel>
        <FormFieldControl>
          <Input placeholder="person@example.com" />
        </FormFieldControl>
        <FormFieldDescription>Used for notifications and receipts.</FormFieldDescription>
      </FormField>

      <FormField invalid>
        <FormFieldLabel>Plan</FormFieldLabel>
        <FormFieldControl>
          <Select defaultValue="">
            <option value="" disabled>
              Select a plan
            </option>
            <option value="pro">Pro</option>
            <option value="team">Team</option>
          </Select>
        </FormFieldControl>
        <FormFieldError>Please choose a plan.</FormFieldError>
      </FormField>

      <FormField>
        <FormFieldLabel>Notes</FormFieldLabel>
        <FormFieldControl>
          <Textarea placeholder="Extra details" />
        </FormFieldControl>
      </FormField>

      <FormField>
        <FormFieldLabel htmlFor="marketing-optin">Email updates</FormFieldLabel>
        <FormFieldControl>
          <Checkbox id="marketing-optin" aria-label="Email updates" />
        </FormFieldControl>
        <FormFieldDescription>Receive product announcements.</FormFieldDescription>
      </FormField>
    </div>
  )
};
