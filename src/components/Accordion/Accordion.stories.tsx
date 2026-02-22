import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Typography } from '../Typography/Typography';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs']
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'single',
    defaultValue: 'shipping',
    collapsible: true
  },
  render: (args) => (
    <Accordion {...args} style={{ maxWidth: 640 }}>
      <AccordionItem value="shipping">
        <AccordionTrigger>
          <Typography as="span" variant="text">
            Shipping policy
          </Typography>
        </AccordionTrigger>
        <AccordionContent>
          <Typography as="p" variant="muted">
            Orders typically ship in 1-2 business days with tracking included.
          </Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>
          <Typography as="span" variant="text">
            Returns and exchanges
          </Typography>
        </AccordionTrigger>
        <AccordionContent>
          <Typography as="p" variant="muted">
            Unused items can be returned within 30 days for a full refund.
          </Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger>
          <Typography as="span" variant="text">
            Support availability
          </Typography>
        </AccordionTrigger>
        <AccordionContent>
          <Typography as="p" variant="muted">
            Live chat is available Monday-Friday from 9am to 5pm PT.
          </Typography>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Returns and exchanges' }));
    expect(canvas.getByRole('region', { name: 'Returns and exchanges' })).toBeVisible();
  }
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
    defaultValue: ['design', 'delivery']
  },
  render: (args) => (
    <Accordion {...args} style={{ maxWidth: 640 }}>
      <AccordionItem value="design">
        <AccordionTrigger>
          <Typography as="span" variant="text">
            Design system coverage
          </Typography>
        </AccordionTrigger>
        <AccordionContent>
          <Typography as="p" variant="muted">
            Buttons, forms, overlays, and layout primitives are included today.
          </Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="delivery">
        <AccordionTrigger>
          <Typography as="span" variant="text">
            Delivery process
          </Typography>
        </AccordionTrigger>
        <AccordionContent>
          <Typography as="p" variant="muted">
            Components ship with tests, stories, exports, and typed public APIs.
          </Typography>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="roadmap">
        <AccordionTrigger>
          <Typography as="span" variant="text">
            Roadmap and follow-up
          </Typography>
        </AccordionTrigger>
        <AccordionContent>
          <Typography as="p" variant="muted">
            Animations and advanced composition can be layered on later.
          </Typography>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};
