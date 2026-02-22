# yxgui

## Install

Requires React 19+.

```bash
pnpm add yxgui
```

## Usage

```tsx
import { Button, ThemeProvider, createTheme } from 'yxgui';

const theme = createTheme({
  palette: {
    background: '#f7f7fb',
    foreground: '#111827',
    border: '#c9d0de',
    focusRing: '#2563eb'
  },
  components: {
    button: {
      primaryBackground: '#111827',
      primaryForeground: '#f9fafb',
      secondaryBackground: '#f7f7fb',
      secondaryBorder: '#c9d0de',
      secondaryHoverBorder: '#9aa8bf'
    }
  }
});

export function Example() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="primary" size="md">
        Click me
      </Button>
    </ThemeProvider>
  );
}
```

No separate stylesheet import is required. Component styles are injected at runtime.

## Button Props

- `variant`: `'primary' | 'secondary' | 'ghost'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- Plus all native `button` props from `React.ButtonHTMLAttributes<HTMLButtonElement>`

## Theming API

- `createTheme(options)`: deep merges semantic token overrides with defaults.
- `ThemeProvider`: applies theme tokens to the full app/library surface.

Semantic token groups:

- `palette`
- `typography`
- `radius`
- `spacing`
- `components.button`

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
