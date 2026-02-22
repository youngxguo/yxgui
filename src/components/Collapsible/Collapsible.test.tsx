import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './Collapsible';

describe('Collapsible', () => {
  it('supports uncontrolled open state and toggles content visibility', () => {
    const onOpenChange = vi.fn();

    render(
      <Collapsible defaultOpen onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>Inline content</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByRole('button', { name: 'Details' });
    const region = screen.getByRole('region', { name: 'Details' });

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(region).toBeVisible();

    fireEvent.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(region).toHaveAttribute('hidden');

    fireEvent.click(trigger);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
  });

  it('supports controlled state', () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Collapsible open={false} onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>Inline content</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByRole('button', { name: 'Details' });
    const regionId = trigger.getAttribute('aria-controls');

    fireEvent.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(regionId ? document.getElementById(regionId) : null).toHaveAttribute('hidden');

    rerender(
      <Collapsible open onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>Inline content</CollapsibleContent>
      </Collapsible>
    );

    expect(screen.getByRole('button', { name: 'Details' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(screen.getByRole('region', { name: 'Details' })).toBeVisible();
  });

  it('supports disabled behavior and accessibility attributes', () => {
    const onOpenChange = vi.fn();

    render(
      <Collapsible disabled onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Disabled section</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByRole('button', { name: 'Disabled section' });
    const region = screen.getByRole('region', { hidden: true });

    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls', region.id);
    expect(region).toHaveAttribute('aria-labelledby', trigger.id);
    expect(region).toHaveAttribute('hidden');

    fireEvent.click(trigger);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('accepts ref props on root, trigger, and content', () => {
    const rootRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();

    render(
      <Collapsible ref={rootRef} defaultOpen>
        <CollapsibleTrigger ref={triggerRef}>Details</CollapsibleTrigger>
        <CollapsibleContent ref={contentRef}>Inline content</CollapsibleContent>
      </Collapsible>
    );

    expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
    expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
  });
});
