# yxgui

## Install

Requires React 19+.

```bash
pnpm add yxgui
npm install yxgui
```

## Component API Conventions

These conventions describe the library's public component APIs for external consumers.

- Components generally accept native DOM props/events for the element they render (`id`, `title`, `data-*`, `aria-*`, `onClick`, `onChange`, `onFocus`, etc.)
- Components use the React 19 `ref` prop pattern (no `forwardRef` wrapper required for consumers)
- Some props are intentionally owned or overridden (for example trigger buttons that force `type="button"`, or custom `size` props on styled controls)
- `className` and `style` are merged with component styles so you can layer custom styles on top

Example: native event handlers and `aria-*` props are forwarded to form controls.

```tsx
<Input
  id="email"
  name="email"
  aria-describedby="email-help"
  aria-invalid
  onChange={(event) => console.log(event.currentTarget.value)}
  onFocus={() => console.log('focused')}
/>
```

Example: `className` and `style` merge with library styling.

```tsx
<Button
  className="marketing-cta"
  style={{ minWidth: 160 }}
  onClick={() => console.log('clicked')}
>
  Start trial
</Button>
```

Controlled/uncontrolled naming conventions (used by interactive components):

- `value` / `defaultValue` / `onValueChange`
- `open` / `defaultOpen` / `onOpenChange`
- `checked` / `defaultChecked` / `onCheckedChange`
- `pressed` / `defaultPressed` / `onPressedChange`

Examples:

```tsx
<Tabs value={tab} onValueChange={setTab} />
<Tabs defaultValue="account" />
<Dialog open={open} onOpenChange={setOpen} />
<Switch checked={enabled} onCheckedChange={setEnabled} />
<Toggle pressed={pinned} onPressedChange={setPinned} />
```

For contributor-facing implementation details and current edge cases, see:

- `docs/core-prop-passthrough-contract.md`
- `docs/accessibility-semantics-checklist.md`

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

- `Accordion` (`AccordionItem`, `AccordionTrigger`, `AccordionContent`)
- `Alert` (`AlertTitle`, `AlertDescription`)
- `AlertDialog` (`AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogCancel`, `AlertDialogAction`)
- `AspectRatio`
- `Avatar`
- `Badge`
- `Breadcrumb` (`BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`)
- `Button`
- `Card` (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`)
- `Checkbox`
- `Collapsible` (`CollapsibleTrigger`, `CollapsibleContent`)
- `ContextMenu` (`ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuSeparator`)
- `Drawer` (`DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerFooter`, `DrawerClose`)
- `Dialog` (`DialogTrigger`, `DialogContent`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`)
- `DropdownMenu` (`DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`)
- `FormField` (`FormFieldLabel`, `FormFieldControl`, `FormFieldDescription`, `FormFieldError`)
- `HoverCard` (`HoverCardTrigger`, `HoverCardContent`)
- `Input`
- `InputOTP` (`InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`)
- `Label`
- `Menubar` (`MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`, `MenubarSeparator`)
- `Pagination` (`PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`)
- `Popover` (`PopoverTrigger`, `PopoverContent`)
- `Progress`
- `RadioGroup` (`Radio`)
- `ScrollArea` (`ScrollAreaViewport`, `ScrollAreaScrollbar`, `ScrollAreaThumb`)
- `Select`
- `Separator`
- `Sheet` (`SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose`)
- `Skeleton`
- `Slider`
- `Toast` (`Toaster`, `toast`)
- `Table` (`TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`)
- `Switch`
- `Toggle`
- `ToggleGroup` (`ToggleGroupItem`)
- `Tabs` (`TabsList`, `TabsTrigger`, `TabsPanel`)
- `Textarea`
- `Typography`
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

## Toast Notifications

```tsx
import { Toaster, toast } from 'yxgui';

function App() {
  return (
    <>
      <Toaster />
      <button
        type="button"
        onClick={() => toast.success('Saved', { description: 'Your settings were updated.' })}
      >
        Save
      </button>
    </>
  );
}
```

## Publishing

Package publishing and release workflow notes live in `AGENTS.md`.
