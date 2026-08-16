import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Container } from './Container';

describe('Container', () => {
  it('supports a semantic element and native props', () => {
    render(
      <Container aria-label="Page content" as="main" data-layout="centered" size="sm">
        Content
      </Container>
    );

    expect(screen.getByRole('main', { name: 'Page content' })).toHaveAttribute(
      'data-layout',
      'centered'
    );
  });
});
