import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DataList, DataListDescription, DataListItem, DataListTerm } from './DataList';

describe('DataList', () => {
  it('preserves native description-list semantics', () => {
    render(
      <DataList aria-label="Account details">
        <DataListItem data-row="email">
          <DataListTerm>Email</DataListTerm>
          <DataListDescription>person@example.com</DataListDescription>
        </DataListItem>
      </DataList>
    );

    expect(screen.getByRole('term')).toHaveTextContent('Email');
    expect(screen.getByRole('definition')).toHaveTextContent('person@example.com');
    expect(screen.getByRole('term').parentElement).toHaveAttribute('data-row', 'email');
  });
});
