import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Meter } from './Meter';

describe('Meter', () => {
  it('forwards native meter attributes and refs', () => {
    const ref = createRef<HTMLMeterElement>();
    render(<Meter aria-label="Storage" max={100} ref={ref} value={64} />);
    expect(screen.getByRole('meter', { name: 'Storage' })).toHaveAttribute('value', '64');
    expect(ref.current).toBeInstanceOf(HTMLMeterElement);
  });
});
