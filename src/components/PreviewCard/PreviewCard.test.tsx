import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardTitle,
  PreviewCardTrigger
} from './PreviewCard';

describe('PreviewCard', () => {
  it('previews a link from keyboard focus', async () => {
    render(
      <PreviewCard>
        <PreviewCardTrigger delay={0} href="#details">
          Details
        </PreviewCardTrigger>
        <PreviewCardContent>
          <PreviewCardTitle>Project details</PreviewCardTitle>
          <PreviewCardDescription>A focused project preview.</PreviewCardDescription>
        </PreviewCardContent>
      </PreviewCard>
    );

    fireEvent.focus(screen.getByRole('link', { name: 'Details' }));
    expect(await screen.findByText('Project details')).toBeVisible();
    expect(await screen.findByText('A focused project preview.')).toBeVisible();
  });
});
