import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Field, FieldDescription, FieldError, FieldLabel } from '../Field';
import { Input } from '../Input';
import { Form } from './Form';

const meta = {
  title: 'Components/Form',
  component: Form,
  render: (args) => (
    <Form {...args}>
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input fullWidth placeholder="you@example.com" required type="email" />
        <FieldDescription>We will only use this to reply.</FieldDescription>
        <FieldError />
      </Field>
      <Button type="submit">Continue</Button>
    </Form>
  )
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ServerError: Story = {
  args: { errors: { email: 'That email address is already registered.' } }
};
