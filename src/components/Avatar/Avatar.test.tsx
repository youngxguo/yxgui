import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders fallback content when no image source is provided', () => {
    render(<Avatar>YG</Avatar>);

    expect(screen.getByText('YG')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders an image when src is provided', () => {
    render(<Avatar src="/avatar.png" alt="Young Guo" />);

    expect(screen.getByRole('img', { name: 'Young Guo' })).toHaveAttribute('src', '/avatar.png');
  });

  it('falls back to initials from alt text when the image fails to load', () => {
    render(<Avatar src="/broken.png" alt="Young Guo" />);

    fireEvent.error(screen.getByRole('img', { name: 'Young Guo' }));

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('YG')).toBeInTheDocument();
  });

  it('resets image error state when src changes', () => {
    const { rerender } = render(<Avatar src="/broken.png" alt="Young Guo" />);

    fireEvent.error(screen.getByRole('img', { name: 'Young Guo' }));
    expect(screen.getByText('YG')).toBeInTheDocument();

    rerender(<Avatar src="/next.png" alt="Young Guo" />);

    expect(screen.getByRole('img', { name: 'Young Guo' })).toHaveAttribute('src', '/next.png');
  });

  it('changes style class composition with size and shape variants', () => {
    const { rerender } = render(
      <Avatar size="sm" shape="circle">
        YG
      </Avatar>
    );

    const avatar = screen.getByText('YG').parentElement;
    const baseClassName = avatar?.className;

    rerender(
      <Avatar size="lg" shape="square">
        YG
      </Avatar>
    );

    expect(avatar?.className).not.toEqual(baseClassName);
  });

  it('forwards native span props', () => {
    render(
      <Avatar data-testid="avatar" title="Profile">
        YG
      </Avatar>
    );

    expect(screen.getByTestId('avatar')).toHaveAttribute('title', 'Profile');
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Avatar ref={ref}>YG</Avatar>);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
