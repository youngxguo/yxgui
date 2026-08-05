import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from '../index';

describe('Button', () => {
  it('renders a native button with its props', () => {
    const markup = renderToStaticMarkup(<Button disabled>Save</Button>);

    expect(markup).toBe('<button disabled="">Save</button>');
  });
});
