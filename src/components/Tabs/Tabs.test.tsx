import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Tabs, TabsList, TabsPanel, TabsTrigger } from './Tabs';

describe('Tabs', () => {
  it('renders tabs and switches panels on click', () => {
    const onValueChange = vi.fn();
    render(
      <Tabs defaultValue="account" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsPanel value="account">Account content</TabsPanel>
        <TabsPanel value="security">Security content</TabsPanel>
      </Tabs>
    );

    expect(screen.getByRole('tabpanel', { name: 'Account' })).toBeVisible();
    fireEvent.click(screen.getByRole('tab', { name: 'Security' }));
    expect(screen.getByRole('tabpanel', { name: 'Security' })).toBeVisible();
    expect(onValueChange).toHaveBeenCalledWith('security');
  });

  it('supports keyboard navigation in the tab list', () => {
    render(
      <Tabs defaultValue="one">
        <TabsList aria-label="Sections">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two" disabled>
            Two
          </TabsTrigger>
          <TabsTrigger value="three">Three</TabsTrigger>
        </TabsList>
        <TabsPanel value="one">One panel</TabsPanel>
        <TabsPanel value="three">Three panel</TabsPanel>
      </Tabs>
    );

    const one = screen.getByRole('tab', { name: 'One' });
    one.focus();
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });

    expect(screen.getByRole('tab', { name: 'Three' })).toHaveFocus();
    expect(screen.getByRole('tabpanel', { name: 'Three' })).toBeVisible();
  });

  it('accepts ref props', () => {
    const tabsRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();

    render(
      <Tabs ref={tabsRef} defaultValue="a">
        <TabsList>
          <TabsTrigger ref={triggerRef} value="a">
            A
          </TabsTrigger>
        </TabsList>
        <TabsPanel value="a">A panel</TabsPanel>
      </Tabs>
    );

    expect(tabsRef.current).toBeInstanceOf(HTMLDivElement);
    expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
  });
});
