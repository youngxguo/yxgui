import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MailIcon } from '../Icon';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('gives an icon-only action an accessible name', () => {
    render(
      <IconButton label="Send message">
        <MailIcon />
      </IconButton>
    );
    expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument();
  });

  it('preserves native button behavior and disabled state', () => {
    const onClick = vi.fn();
    render(
      <IconButton disabled label="Send message" onClick={onClick}>
        <MailIcon />
      </IconButton>
    );
    const button = screen.getByRole('button', { name: 'Send message' });
    fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });
});
