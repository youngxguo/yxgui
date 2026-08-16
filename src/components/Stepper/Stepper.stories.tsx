import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper, type StepperStep } from './Stepper';

const steps: StepperStep[] = [
  { description: 'Add the project basics.', id: 'details', label: 'Details' },
  { description: 'Confirm the configuration.', id: 'review', label: 'Review' },
  { description: 'Make the project available.', id: 'publish', label: 'Publish' }
];

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  args: { defaultStep: 1, label: 'Publish workflow', steps }
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const Vertical: Story = { args: { orientation: 'vertical' } };
export const Interactive: Story = { args: { onStepChange: () => undefined } };
