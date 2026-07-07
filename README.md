# yxgui

Small React 19 component library workspace.

This repo was reset to a minimal starter surface so each new component can be built and understood one step at a time.

## Install

```bash
pnpm add yxgui
```

Peer dependencies:

- React 19+
- React DOM 19+

## Usage

```tsx
import { Button } from 'yxgui';

export function Example() {
  return <Button onClick={() => console.log('saved')}>Save changes</Button>;
}
```

## Current API

### `Button`

```tsx
<Button variant="primary" size="md">
  Save changes
</Button>
```

Props:

- `variant`: `'primary' | 'secondary'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- plus native button props such as `disabled`, `type`, `aria-*`, `data-*`, and `onClick`

## Development

```bash
pnpm install
pnpm storybook
pnpm test
pnpm lint
pnpm build
pnpm check:quality
```

Add new public components under `src/components/<ComponentName>/` with:

- `<ComponentName>.tsx`
- `<ComponentName>.css`
- `<ComponentName>.stories.tsx`
- `<ComponentName>.test.tsx`

Export public API from `src/index.ts`.
