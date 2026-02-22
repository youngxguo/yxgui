# yxgui

## Install

Requires React 19+.

```bash
pnpm add yxgui
```

## Usage

```tsx
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from 'yxgui';

export function Example() {
  return (
    <Card style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Manage profile preferences</CardDescription>
      </CardHeader>
      <CardContent style={{ display: 'grid', gap: 12 }}>
        <Badge variant="secondary">Beta</Badge>
        <Input placeholder="Email" />
        <Button variant="primary" size="md">
          Save
        </Button>
      </CardContent>
    </Card>
  );
}
```

## CSS Variable Theming

`yxgui` ships with a default token set (CSS custom properties) loaded automatically from the package entry.

To customize, override variables in your app CSS (globally or on a wrapper):

```css
.coffee-theme {
  --yxgui-variants-primary-background: #4a2a12;
  --yxgui-variants-primary-foreground: #fff4e8;
  --yxgui-control-border: #c8a47a;
  --yxgui-control-border-focus: #7a4b1b;
  --yxgui-components-input-invalid-border: #a63a2b;
}
```

```tsx
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from 'yxgui';

export function Example() {
  return (
    <div className="coffee-theme">
      <Card style={{ maxWidth: 360 }}>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage profile preferences</CardDescription>
        </CardHeader>
        <CardContent style={{ display: 'grid', gap: 12 }}>
          <Badge variant="secondary">Beta</Badge>
          <Input placeholder="Email" />
          <Button variant="primary" size="md">
            Save
          </Button>
        </CardContent>
      </Card>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <Badge variant="outline">Roast</Badge>
        <Button variant="secondary">Adjust</Button>
      </div>
      <Input placeholder="Brew name" style={{ marginTop: 12, maxWidth: 280 }} />
    </div>
  );
}
```

No separate stylesheet import is required when importing from `yxgui` package root. Component styles are injected at runtime, and default tokens are loaded via the package entry CSS import.

## Button Props

- `variant`: `'primary' | 'secondary' | 'ghost'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- Plus all native `button` props from `React.ButtonHTMLAttributes<HTMLButtonElement>`

## Components

- `Button`
- `Badge`
- `Input`
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

## Theme Tokens

The library exposes token names via `cssVarNames` and `var(...)` refs via `cssVarRefs` from the package root.

Token groups:

- `palette`
- `typography`
- `radius`
- `spacing`
- `surface`
- `border`
- `control`
- `variants`
- `components.button`
- `components.input`
- `components.card`

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
