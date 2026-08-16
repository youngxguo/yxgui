import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Stat, StatDescription, StatLabel, StatTrend, StatValue } from './Stat';

describe('Stat', () => {
  it('uses native description-list semantics', () => {
    const { container } = render(
      <Stat aria-label="Revenue">
        <StatLabel>Monthly revenue</StatLabel>
        <StatValue>$24,800</StatValue>
        <StatDescription>
          <StatTrend direction="up">12% higher</StatTrend> than last month
        </StatDescription>
      </Stat>
    );
    expect(screen.getByRole('term')).toHaveTextContent('Monthly revenue');
    expect(container.querySelectorAll('dd')).toHaveLength(2);
    expect(screen.getByText('12% higher')).toBeInTheDocument();
  });
});
