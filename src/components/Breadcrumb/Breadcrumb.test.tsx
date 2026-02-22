import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders accessible nav and list semantics with current page indication', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator data-testid="sep-1" />
          <BreadcrumbItem>
            <BreadcrumbPage>Components</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
    expect(screen.getByText('Components')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByTestId('sep-1')).toHaveAttribute('role', 'presentation');
    expect(screen.getByTestId('sep-1')).toHaveAttribute('aria-hidden', 'true');
  });

  it('supports custom separators and ellipsis item', () => {
    render(
      <Breadcrumb aria-label="Path">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>
          <BreadcrumbEllipsis data-testid="ellipsis" />
          <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Button</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    expect(screen.getByRole('navigation', { name: 'Path' })).toBeInTheDocument();
    expect(screen.getAllByText('>')).toHaveLength(2);
    expect(screen.getByTestId('ellipsis')).toHaveTextContent('...');
  });

  it('forwards native props and style overrides to root and link slots', () => {
    render(
      <Breadcrumb data-testid="root" title="Breadcrumb nav" className="consumer-root">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/settings"
              data-testid="link"
              data-contract="crumb-link"
              className="consumer-link"
              style={{ color: 'tomato' }}
            >
              Settings
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    const root = screen.getByTestId('root');
    const link = screen.getByTestId('link');

    expect(root).toHaveAttribute('title', 'Breadcrumb nav');
    expect(root.className).toContain('consumer-root');
    expect(link).toHaveAttribute('data-contract', 'crumb-link');
    expect(link.className).toContain('consumer-link');
    expect(link.style.color).toBe('tomato');
  });

  it('accepts ref props for root and slots', () => {
    const navRef = createRef<HTMLElement>();
    const listRef = createRef<HTMLOListElement>();
    const linkRef = createRef<HTMLAnchorElement>();
    const pageRef = createRef<HTMLSpanElement>();

    render(
      <Breadcrumb ref={navRef}>
        <BreadcrumbList ref={listRef}>
          <BreadcrumbItem>
            <BreadcrumbLink ref={linkRef} href="/team">
              Team
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage ref={pageRef}>Members</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    expect(navRef.current).toBeInstanceOf(HTMLElement);
    expect(listRef.current).toBeInstanceOf(HTMLOListElement);
    expect(linkRef.current).toBeInstanceOf(HTMLAnchorElement);
    expect(pageRef.current).toBeInstanceOf(HTMLSpanElement);
  });
});
