import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  AppShellSidebar,
  SidebarButton,
  SidebarLink,
  SidebarNav
} from './AppShell';

describe('AppShell', () => {
  it('provides native application landmarks and labeled navigation', () => {
    render(
      <AppShell>
        <AppShellSidebar>
          <SidebarNav label="Primary navigation">
            <SidebarLink active href="/home">
              Home
            </SidebarLink>
          </SidebarNav>
        </AppShellSidebar>
        <AppShellHeader>Workspace</AppShellHeader>
        <AppShellMain>Content</AppShellMain>
        <AppShellFooter>Footer</AppShellFooter>
      </AppShell>
    );

    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toHaveTextContent('Workspace');
    expect(screen.getByRole('main')).toHaveTextContent('Content');
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Footer');
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  });

  it('preserves native sidebar button behavior', () => {
    const onClick = vi.fn();
    render(<SidebarButton onClick={onClick}>Projects</SidebarButton>);
    fireEvent.click(screen.getByRole('button', { name: 'Projects' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
