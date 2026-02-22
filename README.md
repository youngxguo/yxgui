# yxgui

## Install

Requires React 19+.

```bash
pnpm add yxgui
```

## Usage

```tsx
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input
} from 'yxgui';

export function Example() {
  return (
    <Card style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Manage profile preferences</CardDescription>
      </CardHeader>
      <CardContent style={{ display: 'grid', gap: 12 }}>
        <Alert variant="info">
          <AlertTitle>Preview Mode</AlertTitle>
          <AlertDescription>New settings are available for testing.</AlertDescription>
        </Alert>
        <Avatar alt="Young Guo">YG</Avatar>
        <Badge variant="neutral">Beta</Badge>
        <Input placeholder="Email" />
        <Button variant="primary" size="md">
          Save
        </Button>
      </CardContent>
    </Card>
  );
}
```

No separate stylesheet import is required. Styles are handled through StyleX.

## Button Props

- `variant`: `'primary' | 'secondary' | 'ghost'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- Plus all native `button` props from `React.ButtonHTMLAttributes<HTMLButtonElement>`

## Components

Use Storybook for the current component catalog and examples:

```bash
pnpm storybook
```

Current exported components include:

- `Alert` (`AlertTitle`, `AlertDescription`)
- `Avatar`
- `Badge`
- `Button`
- `Card` (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`)
- `Checkbox`
- `Dialog` (`DialogTrigger`, `DialogContent`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`)
- `DropdownMenu` (`DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`)
- `FormField` (`FormFieldLabel`, `FormFieldControl`, `FormFieldDescription`, `FormFieldError`)
- `Input`
- `Label`
- `Popover` (`PopoverTrigger`, `PopoverContent`)
- `Progress`
- `RadioGroup` (`Radio`)
- `Select`
- `Separator`
- `Skeleton`
- `Switch`
- `Tabs` (`TabsList`, `TabsTrigger`, `TabsPanel`)
- `Textarea`
- `Tooltip`

## Tokens

The library currently ships a fixed visual theme (no runtime theming API).
It still exposes semantic token groups for reuse in app-level styles and related components:

- `palette`
- `typography`
- `radius`
- `spacing`
- `surface`
- `border`
- `control`
- `variants`
- `button`
- `input`
- `card`

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

Note: `package.json` includes `pnpm.overrides` forcing `vitest`/`@vitest/mocker` to use Vite 7.
This avoids a TypeScript type-identity mismatch when `pnpm` otherwise resolves a separate `vite@6`
inside the Vitest dependency subtree.

## Publish Checklist

```bash
pnpm lint
pnpm test
pnpm build
pnpm publish --access public
```
