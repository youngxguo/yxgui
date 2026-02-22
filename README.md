# yxgui

## Install

Requires React 19+.

```bash
pnpm add yxgui
```

## Usage

```tsx
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  ThemeProvider,
  createTheme
} from 'yxgui';

const theme = createTheme({
  palette: {
    background: '#f7f7fb',
    foreground: '#111827',
    border: '#c9d0de',
    focusRing: '#2563eb'
  },
  control: {
    border: '#c9d0de',
    borderFocus: '#2563eb',
    placeholder: '#6b7280'
  },
  variants: {
    primary: {
      background: '#111827',
      foreground: '#f9fafb'
    },
    secondary: {
      background: '#f7f7fb',
      foreground: '#111827',
      border: '#c9d0de',
      hoverBorder: '#9aa8bf'
    }
  },
  components: {
    button: {
      primaryHoverShadow: '0 6px 16px rgba(17, 24, 39, 0.18)'
    }
  }
});

export function Example() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
```

No separate stylesheet import is required. Component styles are injected at runtime.

## Button Props

- `variant`: `'primary' | 'secondary' | 'ghost'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- Plus all native `button` props from `React.ButtonHTMLAttributes<HTMLButtonElement>`

## Components

- `Button`
- `Badge`
- `Input`
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

## Theming API

- `createTheme(options)`: deep merges semantic token overrides with defaults.
- `ThemeProvider`: applies theme tokens to the full app/library surface.

Semantic token groups:

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
