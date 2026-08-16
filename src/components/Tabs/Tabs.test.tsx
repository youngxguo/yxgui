import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Tab, Tabs, TabsList, TabsPanel } from './Tabs';

describe('Tabs', () => {
  it('activates a selected tab and panel', () => {
    const onValueChange = vi.fn();
    render(
      <Tabs defaultValue="one" onValueChange={onValueChange}>
        <TabsList aria-label="Sections">
          <Tab value="one">One</Tab>
          <Tab value="two">Two</Tab>
        </TabsList>
        <TabsPanel value="one">First</TabsPanel>
        <TabsPanel value="two">Second</TabsPanel>
      </Tabs>
    );
    fireEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Second');
    expect(onValueChange).toHaveBeenCalled();
  });
});
