import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger
} from './Accordion';

describe('Accordion', () => {
  it('opens panels and reports value changes', () => {
    const onValueChange = vi.fn();
    render(
      <Accordion onValueChange={onValueChange}>
        <AccordionItem value="details">
          <AccordionHeader>
            <AccordionTrigger>Details</AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>Panel content</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Details' }));
    expect(screen.getByText('Panel content')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Details' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(onValueChange).toHaveBeenCalled();
  });
});
