import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuTriggerLink
} from './NavigationMenu';

function renderMenu() {
  const ref = createRef<HTMLElement>();
  render(
    <NavigationMenu aria-label="Primary navigation" ref={ref}>
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink description="Browse the catalog." href="#components">
              Components
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTriggerLink href="#about">About</NavigationMenuTriggerLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
  return ref;
}

describe('NavigationMenu', () => {
  it('renders native navigation and link semantics with refs', () => {
    const ref = renderMenu();
    expect(ref.current).toBe(screen.getByRole('navigation', { name: 'Primary navigation' }));
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
  });

  it('opens content from its trigger', () => {
    renderMenu();
    const trigger = screen.getByRole('button', { name: 'Products' });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: /Components/ })).toHaveAccessibleDescription(
      'Browse the catalog.'
    );
  });
});
