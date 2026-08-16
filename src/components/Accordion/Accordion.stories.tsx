import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger
} from './Accordion';

const meta = { title: 'Components/Accordion', component: Accordion } satisfies Meta<
  typeof Accordion
>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion defaultValue={['getting-started']}>
      <AccordionItem value="getting-started">
        <AccordionHeader>
          <AccordionTrigger>How do I get started?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Install the package, import its CSS, and wrap your app in Theme.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="themes">
        <AccordionHeader>
          <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>Yes. Theme owns both light and dark semantic color systems.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
};

export const Multiple: Story = {
  render: () => (
    <Accordion defaultValue={['one', 'two']} multiple>
      <AccordionItem value="one">
        <AccordionHeader>
          <AccordionTrigger>First section</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>First panel.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionHeader>
          <AccordionTrigger>Second section</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>Second panel.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
};
