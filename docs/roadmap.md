# Component coverage roadmap

yxgui is growing into a broad, styled React component system for personal applications. The coverage target is comparable to [Base UI](https://base-ui.com/react/components/accordion), while the product contract remains intentionally different: yxgui owns its visual language and does not expose `className` or `style` overrides.

## 1.0 baseline

Version 1.0 covers every primitive category in the installed Base UI release and adds first-class application patterns including autocomplete, multi-select, tag input, command menu, file upload, carousel, data table, tree view, and resizable panels. The available catalog below is the supported 1.0 surface; future components should remain additive and follow the same native-first, closed-style contract.

## Architecture

- Prefer native HTML semantics and behavior when the platform already solves the interaction.
- Use explicit semantic props for supported visual choices instead of styling escape hatches.
- Use Base UI as the behavior foundation when focus management, keyboard navigation, dismissal, positioning, portals, or form integration would otherwise require substantial custom machinery.
- Keep StyleX and theme tokens internal. Ship compiled JavaScript, declarations, and one CSS entry point.
- Require native-prop, ref, accessibility, state, type, consumer-build, and light/dark visual coverage in proportion to each component's behavior.

## Coverage

### Available

- Foundations: `Theme`, `Typography`, `Kbd`, `VisuallyHidden`, `Container`, `Flex`, `Grid`, `GridItem`, `Card`
- Actions and navigation: `Button`, `Link`, `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbCurrent`, `Pagination`, `PaginationList`, `PaginationItem`, `PaginationLink`, `Toolbar`, `ToolbarGroup`, `ToolbarButton`, `ToolbarLink`, `ToolbarInput`, `ToolbarSeparator`, `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuTriggerLink`
- Forms: `Form`, `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `Fieldset`, `FieldsetLegend`, `FieldsetDescription`, `Input`, `Textarea`, `Select`, `Autocomplete`, `Combobox`, `MultiSelect`, `TagInput`, `DateField`, `TimeField`, `DateTimeField`, `FileUpload`, `OTPField`, `Checkbox`, `CheckboxGroup`, `CheckboxGroupLegend`, `CheckboxItem`, `RadioGroup`, `RadioGroupLegend`, `Radio`, `Switch`, `Toggle`, `ToggleGroup`, `Slider`, `NumberField`
- Status and feedback: `Alert`, `AlertTitle`, `AlertDescription`, `Badge`, `Meter`, `Progress`, `Skeleton`, `Spinner`, `Empty`, `EmptyTitle`, `EmptyDescription`, `ToastProvider`, `useToast`
- Media and structure: `Avatar`, `AspectRatio`, `Separator`
- Application surfaces: `DataList`, `DataListItem`, `DataListTerm`, `DataListDescription`, `DataTable`, `TreeView`, `ResizablePanels`, `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`, `ScrollArea`, `Carousel`
- Disclosure and navigation: `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`, `Accordion`, `AccordionItem`, `AccordionHeader`, `AccordionTrigger`, `AccordionPanel`, `Tabs`, `TabsList`, `Tab`, `TabsPanel`
- Popups and overlays: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogTitle`, `DialogDescription`, `DialogClose`, `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogCancel`, `AlertDialogAction`, `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerTitle`, `DrawerDescription`, `DrawerActions`, `DrawerClose`, `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverTitle`, `PopoverDescription`, `PopoverClose`, `PreviewCard`, `PreviewCardTrigger`, `PreviewCardContent`, `PreviewCardTitle`, `PreviewCardDescription`, `PreviewCardImage`, `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent`, `Menu`, `Menubar`, `MenuTrigger`, `MenuContent`, `MenuItem`, `MenuLinkItem`, `MenuCheckboxItem`, `MenuRadioGroup`, `MenuRadioItem`, `MenuGroup`, `MenuGroupLabel`, `MenuSeparator`, `MenuSubmenu`, `MenuSubmenuTrigger`, `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `CommandMenu`
- Assets: `GitHubIcon`, `LinkedInIcon`, `MailIcon`, `SunIcon`, `MoonIcon`

## Post-1.0 direction

1. Expand cross-component examples and catalog-level accessibility audits.
