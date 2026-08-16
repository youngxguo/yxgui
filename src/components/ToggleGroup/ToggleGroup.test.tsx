import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Toggle } from '../Toggle';
import { ToggleGroup } from './ToggleGroup';

describe('ToggleGroup', () => {
  it('keeps one item pressed in single-selection mode', () => {
    render(
      <ToggleGroup aria-label="Alignment" defaultValue={['left']}>
        <Toggle value="left">Left</Toggle>
        <Toggle value="right">Right</Toggle>
      </ToggleGroup>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Right' }));
    expect(screen.getByRole('button', { name: 'Left' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: 'Right' })).toHaveAttribute('aria-pressed', 'true');
  });
});
