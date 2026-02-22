import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

describe('Card', () => {
  it('renders composed slots', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Team Plan</CardTitle>
          <CardDescription>Shared workspace and billing</CardDescription>
        </CardHeader>
        <CardContent>
          <div>Content body</div>
        </CardContent>
        <CardFooter>
          <button type="button">Upgrade</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Team Plan')).toBeInTheDocument();
    expect(screen.getByText('Shared workspace and billing')).toBeInTheDocument();
    expect(screen.getByText('Content body')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Upgrade' })).toBeInTheDocument();
  });

  it('forwards native props to the root card', () => {
    render(<Card data-testid="card" title="Plan card" />);

    expect(screen.getByTestId('card')).toHaveAttribute('title', 'Plan card');
  });

  it('accepts ref props for root and slots', () => {
    const cardRef = createRef<HTMLDivElement>();
    const titleRef = createRef<HTMLHeadingElement>();

    render(
      <Card ref={cardRef}>
        <CardHeader>
          <CardTitle ref={titleRef}>Plan</CardTitle>
        </CardHeader>
      </Card>
    );

    expect(cardRef.current).toBeInstanceOf(HTMLDivElement);
    expect(titleRef.current).toBeInstanceOf(HTMLHeadingElement);
  });
});
