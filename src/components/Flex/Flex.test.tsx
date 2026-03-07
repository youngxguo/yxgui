import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Flex } from './Flex';

describe('Flex', () => {
  it('renders as a div with row direction defaults', () => {
    render(
      <Flex data-testid="flex">
        <span>Item</span>
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex.tagName).toBe('DIV');
    expect(flex).toHaveAttribute('data-direction', 'row');
    expect(flex).toHaveAttribute('data-align', 'stretch');
    expect(flex).toHaveAttribute('data-justify', 'start');
    expect(flex).toHaveAttribute('data-wrap', 'nowrap');
    expect(flex).not.toHaveAttribute('data-inline');
  });

  it('supports token-backed gap, rowGap, and columnGap styles', () => {
    render(<Flex data-testid="flex" gap="lg" rowGap="md" columnGap="xl" />);

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveStyle({ gap: '0.75rem', rowGap: '0.625rem', columnGap: '1rem' });
  });

  it('updates style composition when direction and wrap change', () => {
    const { rerender } = render(<Flex data-testid="flex" direction="row" wrap="nowrap" />);

    const flex = screen.getByTestId('flex');
    const rowClassName = flex.className;

    rerender(<Flex data-testid="flex" direction="column" wrap="wrap" />);

    expect(flex.className).not.toEqual(rowClassName);
    expect(flex).toHaveAttribute('data-direction', 'column');
    expect(flex).toHaveAttribute('data-wrap', 'wrap');
  });

  it('supports semantic element overrides and ref passthrough', () => {
    const ref = createRef<HTMLElement>();

    render(
      <Flex ref={ref} as="section" data-testid="flex" inline>
        Content
      </Flex>
    );

    const flex = screen.getByTestId('flex');
    expect(flex.tagName).toBe('SECTION');
    expect(ref.current).toBe(flex);
    expect(flex).toHaveAttribute('data-inline', 'true');
  });

  it('lets inline style overrides win over token gap props', () => {
    render(<Flex data-testid="flex" gap="sm" style={{ gap: '4rem' }} />);

    const flex = screen.getByTestId('flex');
    expect(flex).toHaveStyle({ gap: '4rem' });
  });
});
