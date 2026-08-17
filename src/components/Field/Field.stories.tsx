import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldTitle
} from './Field';

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

export const Grouped: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="field-name">Name</FieldLabel>
        <Input defaultValue="Ada Lovelace" id="field-name" />
      </Field>
      <FieldSeparator>Preferences</FieldSeparator>
      <Field orientation="horizontal">
        <Checkbox id="field-updates" />
        <FieldContent>
          <FieldLabel htmlFor="field-updates">Product updates</FieldLabel>
          <FieldDescription>Receive a concise monthly release summary.</FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  )
};

export const TitledChoice: Story = {
  render: () => (
    <Field orientation="responsive">
      <Checkbox aria-label="Enable Touch ID" />
      <FieldContent>
        <FieldTitle>Enable Touch ID</FieldTitle>
        <FieldDescription>Unlock protected settings without entering a password.</FieldDescription>
      </FieldContent>
    </Field>
  )
};
