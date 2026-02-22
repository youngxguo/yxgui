# yxgui

## Install

```bash
pnpm add yxgui
```

## Usage

```tsx
import { Button } from 'yxgui';
import 'yxgui/styles.css';

export function Example() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}
```

## Button Props

- `variant`: `'primary' | 'secondary' | 'ghost'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- Plus all native `button` props from `React.ButtonHTMLAttributes<HTMLButtonElement>`

## Development

```bash
pnpm install
pnpm storybook
pnpm test
pnpm lint
pnpm lint:fix
pnpm format
pnpm build
```

## Publish Checklist

```bash
pnpm lint
pnpm test
pnpm build
pnpm publish --access public
```
