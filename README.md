# yxgui

A broad, opinionated React component library for building personal interfaces. yxgui favors native HTML behavior, a closed visual system, and first-class component APIs over styling escape hatches.

## Install

```sh
pnpm add yxgui react react-dom
```

Import the package stylesheet once at the application entry point:

```tsx
import 'yxgui/styles.css';
```

## Use

```tsx
import { Button, Card, Flex, Theme, Typography } from 'yxgui';

export function App() {
  return (
    <Theme mode="light">
      <Flex align="center" justify="center" minHeight="viewport" padding="lg">
        <Card>
          <Flex direction="column" gap="md">
            <Typography variant="h1">Hello</Typography>
            <Typography color="muted">A small interface built with yxgui.</Typography>
            <Button type="button">Continue</Button>
          </Flex>
        </Card>
      </Flex>
    </Theme>
  );
}
```

## Components

- Structure: `Theme`, `AppShell`, `AppShellSidebar`, `AppShellHeader`, `AppShellMain`, `AppShellFooter`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarNav`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarLink`, `SidebarButton`, `PageHeader`, `PageHeaderContent`, `PageHeaderTitle`, `PageHeaderDescription`, `PageHeaderActions`, `PageSection`, `PageSectionHeader`, `PageSectionHeading`, `PageSectionTitle`, `PageSectionDescription`, `PageSectionActions`, `PageSectionContent`, `Container`, `Flex`, `Grid`, `GridItem`, `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`, `Item`, `ItemGroup`, `ItemMedia`, `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions`, `ItemLink`, `ItemButton`, `Stat`, `Carousel`, `DataList`, `DataTable`, `TreeView`, `ResizablePanels`, `Separator`, `AspectRatio`, `ScrollArea`, `Table`
- Typography and navigation: `Typography`, `Kbd`, `CodeBlock`, `VisuallyHidden`, `Link`, `IconButton`, `ButtonGroup`, `ButtonGroupText`, `ButtonGroupSeparator`, `Breadcrumb`, `Pagination`, `Toolbar`, `NavigationMenu`
- Forms: `Form`, `Button`, `CopyButton`, `Input`, `InputGroup`, `InputGroupInput`, `InputGroupTextarea`, `InputGroupAddon`, `InputGroupText`, `InputGroupButton`, `Textarea`, `SearchField`, `PasswordField`, `ColorField`, `Select`, `Listbox`, `ListboxOption`, `Autocomplete`, `Combobox`, `MultiSelect`, `TagInput`, `Calendar`, `DatePicker`, `DateField`, `TimeField`, `DateTimeField`, `FileUpload`, `OTPField`, `Checkbox`, `CheckboxGroup`, `CheckboxItem`, `Switch`, `Toggle`, `ToggleGroup`, `SegmentedControl`, `RadioGroup`, `Radio`, `Rating`, `Slider`, `NumberField`, `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `Fieldset`, `FieldsetLegend`, `FieldsetDescription`
- Status and feedback: `Alert`, `AlertTitle`, `AlertDescription`, `Badge`, `Status`, `Meter`, `Progress`, `Skeleton`, `Spinner`, `Stepper`, `Timeline`, `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`, `ToastProvider`, `useToast`
- Disclosure and navigation: `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`, `Accordion`, `AccordionItem`, `AccordionHeader`, `AccordionTrigger`, `AccordionPanel`, `Tabs`, `TabsList`, `Tab`, `TabsPanel`
- Popups and overlays: `Dialog`, `AlertDialog`, `Drawer`, `Popover`, `PreviewCard`, `Tooltip`, `Menu`, `Menubar`, `ContextMenu`, `CommandMenu`
- Media: `Avatar`, `AvatarGroup`, `AvatarGroupOverflow`
- Icons: `GitHubIcon`, `LinkedInIcon`, `MailIcon`, `SunIcon`, `MoonIcon`

Native-element components preserve relevant element props and refs. `className` and `style` are intentionally unavailable: visual behavior belongs to the library, and new needs should become explicit component APIs. Field composition follows native `id`, `htmlFor`, `aria-describedby`, and `aria-invalid` relationships without hiding those browser contracts.

Overlay content owns its portal, backdrop or positioner, and visual surface. When rendered inside `Theme`, portalled content stays within that theme automatically, including nested dark themes.

Icons are decorative by default. Pass `label` only when the icon itself carries meaning; icons inside a labeled link or button should remain decorative.

## Themes

`Theme` applies the library's semantic light or dark colors to one element subtree:

```tsx
<Theme mode="dark">...</Theme>
```

Theme tokens are internal so the package can evolve as one visual system. Consumers choose supported semantic props instead of overriding generated styles.

## Development

```sh
pnpm install
pnpm test:screenshots:install
pnpm check:quality
```

Storybook is the component catalog and visual test source:

```sh
pnpm storybook
```

The quality gate covers linting, formatting, unit and type contracts, production builds, a clean consumer build through the package exports, packed-file inspection, and every Storybook story in both themes.

Intentional visual changes require reviewing and updating the committed Playwright snapshots with `pnpm test:screenshots:update`.

Set `STORYBOOK_TEST_PORT` when the default screenshot-test port is already in use.

See [the component coverage roadmap](./docs/roadmap.md) for the 1.0 baseline and post-1.0 direction.
