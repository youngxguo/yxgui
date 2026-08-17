import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';
import { ActionRow } from './ActionRow';

describe('ActionRow', () => {
  it('preserves native actions, props, and refs', () => {
    const ref = createRef<HTMLDivElement>();
    const onSave = vi.fn();
    render(
      <ActionRow align="space-between" aria-label="Release actions" ref={ref} stack="never">
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button type="button" onClick={onSave}>
          Save
        </Button>
      </ActionRow>
    );

    expect(ref.current).toBe(screen.getByLabelText('Release actions'));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onSave).toHaveBeenCalledOnce();
  });
});
