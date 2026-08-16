import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle
} from './PageHeader';

describe('PageHeader', () => {
  it('provides a native page heading and descriptive content', () => {
    render(
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Projects</PageHeaderTitle>
          <PageHeaderDescription>Manage your active work.</PageHeaderDescription>
        </PageHeaderContent>
        <PageHeaderActions>Actions</PageHeaderActions>
      </PageHeader>
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByText('Manage your active work.')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
});
