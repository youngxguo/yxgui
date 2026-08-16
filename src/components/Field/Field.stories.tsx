import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../Input';
import { Field, FieldDescription, FieldError, FieldLabel } from './Field';

const meta = {
  title: 'Components/Field',
  component: Field
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="field-email">Email</FieldLabel>
      <Input id="field-email" type="email" />
      <FieldDescription>We will only use this to reply.</FieldDescription>
    </Field>
  )
};

export const Invalid: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="field-invalid-email">Email</FieldLabel>
      <Input
        aria-describedby="field-invalid-email-error"
        aria-invalid="true"
        defaultValue="not-an-email"
        id="field-invalid-email"
        type="email"
      />
      <FieldError id="field-invalid-email-error">Enter a valid email address.</FieldError>
    </Field>
  )
};
