import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders native button behavior with compiled styles', () => {
    const markup = renderToStaticMarkup(<Button disabled>Save</Button>);

    expect(markup).toContain('<button');
    expect(markup).toContain('type="button"');
    expect(markup).toContain('disabled=""');
    expect(markup).toContain('class="');
    expect(markup).toContain('>Save</button>');
  });

  it('allows the native button type to be selected', () => {
    const markup = renderToStaticMarkup(<Button type="submit">Save</Button>);

    expect(markup).toContain('type="submit"');
  });
});
