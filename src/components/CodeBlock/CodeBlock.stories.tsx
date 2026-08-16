import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock } from './CodeBlock';

const code = `import { Button } from 'yxgui';

export function SaveButton() {
  return <Button type="submit">Save</Button>;
}`;

const meta = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
  args: { code, label: 'SaveButton.tsx', language: 'tsx' }
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Wrapped: Story = {
  args: {
    code: 'const endpoint = "https://api.example.com/v1/projects/very-long-project-identifier";',
    label: 'Configuration',
    language: 'typescript',
    wrap: true
  }
};
export const Plain: Story = { args: { copyable: false, label: undefined, language: undefined } };
