import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders an accessible button with safe defaults', () => {
    render(<Button>Save changes</Button>);

    const button = screen.getByRole('button', { name: 'Save changes' });

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('yx-button', 'yx-button--primary', 'yx-button--md');
  });

  it('passes through native button props', () => {
    const onClick = vi.fn();

    render(
      <Button
        aria-label="Submit form"
        type="submit"
        variant="secondary"
        size="lg"
        onClick={onClick}
      >
        Submit
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Submit form' });
    button.click();

    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveClass('yx-button--secondary', 'yx-button--lg');
    expect(onClick).toHaveBeenCalledOnce();
  });
});
