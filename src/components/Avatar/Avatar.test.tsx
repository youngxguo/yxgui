import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Avatar, AvatarGroup, AvatarGroupOverflow } from './Avatar';

describe('Avatar', () => {
  it('derives an accessible fallback from alt text', () => {
    render(<Avatar alt="Young Guo" />);

    expect(screen.getByRole('img', { name: 'Young Guo' })).toHaveTextContent('YG');
  });

  it('falls back when the image fails and retries a new source', () => {
    const onImageError = vi.fn();
    const { rerender } = render(
      <Avatar alt="Young Guo" onImageError={onImageError} src="/broken.png" />
    );

    fireEvent.error(screen.getByRole('img', { name: 'Young Guo' }));
    expect(onImageError).toHaveBeenCalledOnce();
    expect(screen.getByRole('img', { name: 'Young Guo' })).toHaveTextContent('YG');

    rerender(<Avatar alt="Young Guo" src="/next.png" />);
    expect(screen.getByRole('img', { name: 'Young Guo' })).toHaveAttribute('src', '/next.png');
  });

  it('forwards native props and refs', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Avatar alt="Profile" data-testid="avatar" ref={ref} title="Profile" />);

    expect(ref.current).toBe(screen.getByTestId('avatar'));
    expect(ref.current).toHaveAttribute('title', 'Profile');
  });

  it('groups inherited avatars with accessible overflow', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <AvatarGroup aria-label="Release team" ref={ref} shape="rounded" size="lg">
        <Avatar alt="Ada Lovelace" />
        <Avatar alt="Grace Hopper" />
        <AvatarGroupOverflow count={3} />
      </AvatarGroup>
    );

    expect(ref.current).toBe(screen.getByRole('group', { name: 'Release team' }));
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL');
    expect(screen.getByRole('img', { name: 'Grace Hopper' })).toHaveTextContent('GH');
    expect(screen.getByRole('img', { name: '3 more' })).toHaveTextContent('+3');
  });
});
