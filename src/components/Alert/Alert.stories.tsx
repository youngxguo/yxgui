import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex';
import { Alert, AlertDescription, AlertTitle } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      <Alert>
        <AlertTitle>New version available</AlertTitle>
        <AlertDescription>Refresh when you are ready to update.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Changes saved</AlertTitle>
        <AlertDescription>Your preferences are up to date.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Storage almost full</AlertTitle>
        <AlertDescription>Remove unused files to keep uploading.</AlertDescription>
      </Alert>
      <Alert variant="danger">
        <AlertTitle>Could not save</AlertTitle>
        <AlertDescription>Check your connection and try again.</AlertDescription>
      </Alert>
    </Flex>
  )
};
