import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';

function renderAccordionItems() {
  return (
    <>
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>Shipping details</AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>Returns details</AccordionContent>
      </AccordionItem>
      <AccordionItem value="support" disabled>
        <AccordionTrigger>Support</AccordionTrigger>
        <AccordionContent>Support details</AccordionContent>
      </AccordionItem>
    </>
  );
}

describe('Accordion', () => {
  it('supports uncontrolled single expansion and collapsible behavior', () => {
    const onValueChange = vi.fn();

    render(
      <Accordion type="single" defaultValue="shipping" collapsible onValueChange={onValueChange}>
        {renderAccordionItems()}
      </Accordion>
    );

    const shippingTrigger = screen.getByRole('button', { name: 'Shipping' });
    const returnsTrigger = screen.getByRole('button', { name: 'Returns' });
    const returnsRegionId = returnsTrigger.getAttribute('aria-controls');
    const shippingRegionId = shippingTrigger.getAttribute('aria-controls');

    expect(shippingTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region', { name: 'Shipping' })).toBeVisible();
    expect(returnsRegionId ? document.getElementById(returnsRegionId) : null).toHaveAttribute(
      'hidden'
    );

    fireEvent.click(returnsTrigger);
    expect(onValueChange).toHaveBeenCalledWith('returns');
    expect(screen.getByRole('region', { name: 'Returns' })).toBeVisible();
    expect(shippingRegionId ? document.getElementById(shippingRegionId) : null).toHaveAttribute(
      'hidden'
    );

    fireEvent.click(returnsTrigger);
    expect(onValueChange).toHaveBeenLastCalledWith(undefined);
    expect(returnsTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports controlled single expansion', () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <Accordion type="single" value="shipping" onValueChange={onValueChange}>
        {renderAccordionItems()}
      </Accordion>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Returns' }));
    const returnsTrigger = screen.getByRole('button', { name: 'Returns' });
    const returnsRegionId = returnsTrigger.getAttribute('aria-controls');

    expect(onValueChange).toHaveBeenCalledWith('returns');
    expect(screen.getByRole('region', { name: 'Shipping' })).toBeVisible();
    expect(returnsRegionId ? document.getElementById(returnsRegionId) : null).toHaveAttribute(
      'hidden'
    );

    rerender(
      <Accordion type="single" value="returns" onValueChange={onValueChange}>
        {renderAccordionItems()}
      </Accordion>
    );

    expect(screen.getByRole('region', { name: 'Returns' })).toBeVisible();
  });

  it('supports multiple expansion mode', () => {
    render(
      <Accordion type="multiple" defaultValue={['shipping']}>
        {renderAccordionItems()}
      </Accordion>
    );

    const shippingTrigger = screen.getByRole('button', { name: 'Shipping' });
    const returnsTrigger = screen.getByRole('button', { name: 'Returns' });

    expect(shippingTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(returnsTrigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(returnsTrigger);

    expect(shippingTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(returnsTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region', { name: 'Shipping' })).toBeVisible();
    expect(screen.getByRole('region', { name: 'Returns' })).toBeVisible();
  });

  it('supports keyboard navigation between enabled triggers', () => {
    render(<Accordion type="single">{renderAccordionItems()}</Accordion>);

    const shippingTrigger = screen.getByRole('button', { name: 'Shipping' });
    const returnsTrigger = screen.getByRole('button', { name: 'Returns' });
    const supportTrigger = screen.getByRole('button', { name: 'Support' });

    shippingTrigger.focus();
    fireEvent.keyDown(shippingTrigger, { key: 'ArrowDown' });
    expect(returnsTrigger).toHaveFocus();

    fireEvent.keyDown(returnsTrigger, { key: 'ArrowDown' });
    expect(shippingTrigger).toHaveFocus();

    fireEvent.keyDown(shippingTrigger, { key: 'End' });
    expect(returnsTrigger).toHaveFocus();

    expect(supportTrigger).toBeDisabled();
  });

  it('accepts ref props on root, trigger, and content', () => {
    const rootRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();

    render(
      <Accordion ref={rootRef} type="single" defaultValue="shipping">
        <AccordionItem value="shipping">
          <AccordionTrigger ref={triggerRef}>Shipping</AccordionTrigger>
          <AccordionContent ref={contentRef}>Shipping details</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
    expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
  });
});
