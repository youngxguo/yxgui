import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CodeBlock } from './CodeBlock';

describe('CodeBlock', () => {
  it('renders semantic code with first-class copy behavior', () => {
    const { container } = render(
      <CodeBlock code="pnpm add yxgui" label="Install" language="shell" />
    );
    expect(container.querySelector('figure')).toBeInTheDocument();
    expect(container.querySelector('figcaption')).toHaveTextContent('Installshell');
    expect(container.querySelector('code')).toHaveTextContent('pnpm add yxgui');
    expect(screen.getByRole('button', { name: 'Copy code' })).toBeVisible();
  });

  it('can omit the header for plain code output', () => {
    const { container } = render(<CodeBlock code="const ready = true;" copyable={false} />);
    expect(container.querySelector('figcaption')).not.toBeInTheDocument();
  });
});
