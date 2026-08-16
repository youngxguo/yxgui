# Component coverage roadmap

yxgui is growing into a broad, styled React component system for personal applications. The coverage target is comparable to [Base UI](https://base-ui.com/react/components/accordion), while the product contract remains intentionally different: yxgui owns its visual language and does not expose `className` or `style` overrides.

## Architecture

- Prefer native HTML semantics and behavior when the platform already solves the interaction.
- Use explicit semantic props for supported visual choices instead of styling escape hatches.
- Use Base UI as the behavior foundation when focus management, keyboard navigation, dismissal, positioning, portals, or form integration would otherwise require substantial custom machinery.
- Keep StyleX and theme tokens internal. Ship compiled JavaScript, declarations, and one CSS entry point.
- Require native-prop, ref, accessibility, state, type, consumer-build, and light/dark visual coverage in proportion to each component's behavior.

## Coverage

### Available

- Foundations: `Theme`, `Typography`, `Flex`, `Card`
- Actions and navigation: `Button`, `Link`, `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbCurrent`, `Pagination`, `PaginationList`, `PaginationItem`, `PaginationLink`, `Toolbar`, `ToolbarGroup`, `ToolbarButton`, `ToolbarLink`, `ToolbarInput`, `ToolbarSeparator`
- Forms: `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `Fieldset`, `FieldsetLegend`, `FieldsetDescription`, `Input`, `Textarea`, `Select`, `Combobox`, `OTPField`, `Checkbox`, `CheckboxGroup`, `CheckboxGroupLegend`, `CheckboxItem`, `RadioGroup`, `RadioGroupLegend`, `Radio`, `Switch`, `Toggle`, `ToggleGroup`, `Slider`, `NumberField`
- Status and feedback: `Alert`, `AlertTitle`, `AlertDescription`, `Badge`, `Meter`, `Progress`, `Skeleton`, `Spinner`, `Empty`, `EmptyTitle`, `EmptyDescription`, `ToastProvider`, `useToast`
- Media and structure: `Avatar`, `AspectRatio`, `Separator`
- Application surfaces: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`, `ScrollArea`
- Disclosure and navigation: `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`, `Accordion`, `AccordionItem`, `AccordionHeader`, `AccordionTrigger`, `AccordionPanel`, `Tabs`, `TabsList`, `Tab`, `TabsPanel`
- Popups and overlays: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogTitle`, `DialogDescription`, `DialogClose`, `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogCancel`, `AlertDialogAction`, `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverTitle`, `PopoverDescription`, `PopoverClose`, `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent`, `Menu`, `MenuTrigger`, `MenuContent`, `MenuItem`, `MenuLinkItem`, `MenuCheckboxItem`, `MenuRadioGroup`, `MenuRadioItem`, `MenuGroup`, `MenuGroupLabel`, `MenuSeparator`, `MenuSubmenu`, `MenuSubmenuTrigger`, `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`
- Assets: `GitHubIcon`, `LinkedInIcon`, `MailIcon`, `SunIcon`, `MoonIcon`

### Form controls

- `Autocomplete`

### Disclosure and navigation

- `NavigationMenu`

### Popups and overlays

- `Drawer`
- `PreviewCard`
- `Menubar`

### Application surfaces

- `Grid`
- `Carousel`

## Delivery order

1. Finish native/status primitives and their coverage.
2. Complete form controls and shared controlled/uncontrolled state conventions.
3. Add disclosure and navigation patterns with keyboard test matrices.
4. Add Base UI-backed popup primitives and shared portal/layer conventions.
5. Complete application surfaces, cross-component examples, and catalog-level accessibility audits.
