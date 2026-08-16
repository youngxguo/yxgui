import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, FieldDescription, FieldError, FieldLabel } from '../Field';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './InputGroup';

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Amount</FieldLabel>
      <InputGroup>
        <InputGroupAddon aria-hidden="true">$</InputGroupAddon>
        <InputGroupInput defaultValue="125.00" inputMode="decimal" />
        <InputGroupAddon aria-hidden="true" side="end">
          USD
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Enter the invoice total.</FieldDescription>
    </Field>
  )
};

export const WithAction: Story = {
  render: () => (
    <Field>
      <FieldLabel>Invite link</FieldLabel>
      <InputGroup>
        <InputGroupInput defaultValue="yxgui.dev/invite" readOnly />
        <InputGroupButton>Copy</InputGroupButton>
      </InputGroup>
    </Field>
  )
};

export const Invalid: Story = {
  render: () => (
    <Field invalid>
      <FieldLabel>Discount</FieldLabel>
      <InputGroup invalid>
        <InputGroupInput defaultValue="150" />
        <InputGroupAddon aria-hidden="true" side="end">
          %
        </InputGroupAddon>
      </InputGroup>
      <FieldError>Enter a value from 0 to 100.</FieldError>
    </Field>
  )
};

export const Disabled: Story = {
  render: () => (
    <Field disabled>
      <FieldLabel>Domain</FieldLabel>
      <InputGroup disabled>
        <InputGroupAddon>https://</InputGroupAddon>
        <InputGroupInput defaultValue="yxgui.dev" />
        <InputGroupButton>Visit</InputGroupButton>
      </InputGroup>
    </Field>
  )
};

export const FullWidth: Story = {
  render: () => (
    <Field>
      <FieldLabel>Repository</FieldLabel>
      <InputGroup fullWidth>
        <InputGroupAddon>github.com/</InputGroupAddon>
        <InputGroupInput defaultValue="youngxguo/yxgui" />
      </InputGroup>
    </Field>
  )
};
