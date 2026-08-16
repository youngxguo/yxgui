import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Kbd } from './Kbd';

describe('Kbd', () => {
  it('preserves native keyboard-input semantics and refs', () => {
    const ref = createRef<HTMLElement>();
    render(<Kbd ref={ref}>⌘K</Kbd>);
    const key = screen.getByText('⌘K');
    expect(key.tagName).toBe('KBD');
    expect(ref.current).toBe(key);
  });
});
