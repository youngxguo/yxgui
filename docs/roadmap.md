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
- Actions and navigation: `Button`, `Link`
- Forms: `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `Input`, `Textarea`, `Checkbox`, `Switch`
- Status and feedback: `Alert`, `AlertTitle`, `AlertDescription`, `Badge`, `Progress`, `Skeleton`, `Spinner`
- Media and structure: `Avatar`, `AspectRatio`, `Separator`
- Assets: `GitHubIcon`, `LinkedInIcon`, `MailIcon`, `SunIcon`, `MoonIcon`

### Native and status primitives

- `Meter`
- `Empty`

### Form controls

- `CheckboxGroup`
- `Fieldset`
- `RadioGroup`
- `Slider`
- `NumberField`
- `OTPField`
- `Toggle`
- `ToggleGroup`
- `Select`
- `Combobox`
- `Autocomplete`

### Disclosure and navigation

- `Accordion`
- `Collapsible`
- `Tabs`
- `Breadcrumb`
- `Pagination`
- `Toolbar`
- `NavigationMenu`

### Popups and overlays

- `Dialog`
- `AlertDialog`
- `Drawer`
- `Popover`
- `PreviewCard`
- `Tooltip`
- `Menu`
- `ContextMenu`
- `Menubar`

### Application surfaces

- `Grid`
- `Table`
- `ScrollArea`
- `Toast`
- `Carousel`

## Delivery order

1. Finish native/status primitives and their coverage.
2. Complete form controls and shared controlled/uncontrolled state conventions.
3. Add disclosure and navigation patterns with keyboard test matrices.
4. Add Base UI-backed popup primitives and shared portal/layer conventions.
5. Complete application surfaces, cross-component examples, and catalog-level accessibility audits.
