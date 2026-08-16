import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  PageSection,
  PageSectionContent,
  PageSectionDescription,
  PageSectionHeader,
  PageSectionHeading,
  PageSectionTitle
} from './PageSection';

describe('PageSection', () => {
  it('connects a native section to its heading', () => {
    render(
      <PageSection aria-labelledby="activity-heading">
        <PageSectionHeader>
          <PageSectionHeading>
            <PageSectionTitle id="activity-heading">Recent activity</PageSectionTitle>
            <PageSectionDescription>Events from this workspace.</PageSectionDescription>
          </PageSectionHeading>
        </PageSectionHeader>
        <PageSectionContent>Activity content</PageSectionContent>
      </PageSection>
    );

    expect(screen.getByRole('region', { name: 'Recent activity' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Recent activity' })).toBeInTheDocument();
  });
});
