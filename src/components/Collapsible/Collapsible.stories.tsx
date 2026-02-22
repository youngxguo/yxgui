import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Typography } from '../Typography/Typography';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './Collapsible';

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs']
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultOpen: false
  },
  render: (args) => (
    <Collapsible {...args} style={{ maxWidth: 640 }}>
      <CollapsibleTrigger>
        <Typography as="span" variant="text">
          Release Notes
        </Typography>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Typography as="p" variant="muted">
          Minor visual refinements, improved keyboard interactions, and additional tests.
        </Typography>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Release Notes' }));
    expect(canvas.getByRole('region', { name: 'Release Notes' })).toBeVisible();
  }
};

export const OpenByDefault: Story = {
  args: {
    defaultOpen: true
  },
  render: (args) => (
    <Collapsible {...args} style={{ maxWidth: 640 }}>
      <CollapsibleTrigger>
        <Typography as="span" variant="text">
          Deployment Checklist
        </Typography>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Typography as="p" variant="muted">
          Validate build, smoke test stories, and confirm package exports before publishing.
        </Typography>
      </CollapsibleContent>
    </Collapsible>
  )
};

export const Disabled: Story = {
  args: {
    disabled: true
  },
  render: (args) => (
    <Collapsible {...args} style={{ maxWidth: 640 }}>
      <CollapsibleTrigger>
        <Typography as="span" variant="text">
          Archived Section
        </Typography>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Typography as="p" variant="muted">
          This content remains collapsed while the section is disabled.
        </Typography>
      </CollapsibleContent>
    </Collapsible>
  )
};
