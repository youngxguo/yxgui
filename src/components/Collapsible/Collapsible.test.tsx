import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './Collapsible';

describe('Collapsible', () => {
  it('uses native details disclosure semantics', () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByText('Details').closest('details')).toHaveAttribute('open');
  });

  it('reports native toggle changes', () => {
    const onOpenChange = vi.fn();
    render(
      <Collapsible onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    const details = screen.getByText('Details').closest('details')!;
    Object.defineProperty(details, 'open', { configurable: true, value: true });
    fireEvent(details, new Event('toggle'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
