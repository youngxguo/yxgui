import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './Card';

describe('Card', () => {
  it('composes semantic content while preserving native behavior', () => {
    const ref = createRef<HTMLDivElement>();
    const onAction = vi.fn();
    render(
      <Card ref={ref}>
        <CardHeader>
          <CardTitle>Release</CardTitle>
          <CardDescription>Ready to publish.</CardDescription>
          <CardAction>1.0.0</CardAction>
        </CardHeader>
        <CardContent>All checks passed.</CardContent>
        <CardFooter>
          <Button type="button" onClick={onAction}>
            Publish
          </Button>
        </CardFooter>
      </Card>
    );

    expect(ref.current).toContainElement(
      screen.getByRole('heading', { name: 'Release', level: 3 })
    );
    expect(screen.getByText('Ready to publish.')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
    expect(screen.getByText('All checks passed.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Publish' }));
    expect(onAction).toHaveBeenCalledOnce();
  });
});
