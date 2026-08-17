import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from './Breadcrumb';

describe('Breadcrumb', () => {
  it('provides navigation and current-page semantics', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbEllipsis data-testid="ellipsis" />
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbCurrent>Settings</BreadcrumbCurrent>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByText('Settings')).toHaveAttribute('aria-current', 'page');
    expect(screen.getAllByText('/')).toHaveLength(2);
    expect(screen.getAllByText('/')[0]).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('ellipsis')).toHaveAttribute('aria-hidden', 'true');
  });
});
