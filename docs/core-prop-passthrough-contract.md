# Core Native Prop Passthrough Contract

Contributor-facing contract for how yxgui components handle native DOM attributes, events, `className`, and `style`.

Issue: `#43`

## Scope

This contract applies to exported components that render a DOM node directly (including styled slots such as `DialogContent` and `CardHeader`).

It also defines exceptions for:

- controller/provider components that do not render a DOM node (`Dialog`, `Popover`, `DropdownMenu`, `Tabs`, `Tooltip`)
- proxy/wrapper components that clone or augment child elements (`FormFieldControl`, `Tooltip`)

## Contract

### 1. Default passthrough rule

If a component renders a DOM node directly, it should:

- accept the corresponding React DOM attribute interface (`HTMLAttributes`, `ButtonHTMLAttributes`, `InputHTMLAttributes`, etc.)
- forward supported native attributes and event handlers to the rendered DOM node
- preserve consumer handlers when the component also performs internal behavior (compose handlers, do not silently drop them)

### 2. `className` / `style` rule

Styled components should accept `className` and `style` and apply them to the same DOM node that represents the component's public surface.

- Internal styles may be merged with consumer `style`
- Components may add internal classes/inline styles for behavior (for example positioning)
- If a component applies `className`/`style` to a wrapper instead of the semantic control node, document that behavior explicitly

### 3. `data-*` / `aria-*` rule

Components should forward `data-*` and `aria-*` props unless a specific attribute is component-owned for required semantics.

If a component owns semantics (for example `role="dialog"` or `aria-expanded`), the implementation may override the consumer value. That override must be documented.

### 4. Intentional omissions/overrides rule

Any native prop omission or forced value must be intentional and visible in the public prop type and/or docs.

Common acceptable cases in this library:

- design-system prop replaces a native prop (`size` on `Input` / `Select` / `Textarea` / `Checkbox` / `Radio`)
- button-like trigger/item components force `type="button"`
- composite components own required ARIA roles/states (`role`, `aria-expanded`, `aria-controls`, etc.)

### 5. Non-DOM components and proxy components

Components that do not render a DOM node directly do not provide native DOM passthrough guarantees. They should document how props are applied instead.

Examples:

- `Tooltip` wraps and augments a child trigger element
- `FormFieldControl` clones a child control and injects form-related props

## Audit (2026-02-22)

Audit goal: identify current passthrough behavior, document intentional omissions/overrides, and capture follow-up fixes where behavior differs from this contract.

### A. Direct DOM primitives and slots (mostly consistent)

| Component(s)                                                                      | Public surface node    | Native attrs/events passthrough         | Intentional omissions/overrides                                                              | Notes                                                 |
| --------------------------------------------------------------------------------- | ---------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `Badge`                                                                           | `span`                 | Yes (`HTMLAttributes<HTMLSpanElement>`) | None noted                                                                                   | `className`/`style` merged via style helper           |
| `Button`                                                                          | `button`               | Yes                                     | `type` defaults to `"button"` but remains consumer-overridable                               | Native button attrs/events preserved                  |
| `Input`                                                                           | `input`                | Yes                                     | Omits native `size`; library `size` prop; `invalid` may force `aria-invalid`                 | `data-*`, `aria-*`, handlers forwarded via `...props` |
| `Textarea`                                                                        | `textarea`             | Yes                                     | Omits native `size`; library `size`; default `rows=4`; `invalid` may force `aria-invalid`    | Consumer `rows` still supported/overrideable          |
| `Select`                                                                          | `select`               | Yes                                     | Omits native `size`; library `size`; `invalid` may force `aria-invalid`                      | Native `onChange` preserved                           |
| `Checkbox`                                                                        | `input[type=checkbox]` | Yes                                     | Omits native `type` and `size`; forces `type="checkbox"`; `invalid` may force `aria-invalid` | Native input attrs/events preserved                   |
| `Label`                                                                           | `label`                | Yes                                     | Adds optional visual required marker via `required` prop                                     | Native label attrs preserved                          |
| `Separator`                                                                       | `div`                  | Yes                                     | Owns separator semantics (`role`, `aria-orientation`, `aria-hidden` when `decorative`)       | Consumer role/orientation may be overridden           |
| `Skeleton`                                                                        | `span`                 | Yes (except `children`)                 | Omits `children`; forces `aria-hidden="true"`; adds `data-animated`                          | Width/height convenience props merged into style      |
| `Progress`                                                                        | `div`                  | Yes (except `children`)                 | Omits `children`; owns progressbar role + aria values                                        | Consumer `role` overridden to `progressbar`           |
| `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | `div`/`h3`/`p`         | Yes                                     | None noted                                                                                   | Styled slot passthrough pattern is consistent         |
| `Alert`, `AlertTitle`, `AlertDescription`                                         | `div`/`p`              | Yes                                     | `Alert` defaults role (`alert` for error, otherwise `status`)                                | `Alert` role remains consumer-overridable             |
| `TooltipContent`                                                                  | `div`                  | Yes                                     | Defaults `role="tooltip"` when role not provided                                             | Content-only slot; separate from `Tooltip` wrapper    |

### B. Form/composite controls (documented split ownership)

| Component(s)                              | Public surface node                                  | Native attrs/events passthrough                         | Intentional omissions/overrides                                                                                                        | Notes                                                                              |
| ----------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `Switch`                                  | `button`                                             | Yes for button attrs/events except omitted `onChange`   | Omits native `onChange`, `role`, `type`; forces `type="button"` and `role="switch"`; uses `checked/defaultChecked/onCheckedChange` API | `onClick` composed with internal toggle                                            |
| `RadioGroup`                              | `div`                                                | Yes on group root                                       | Owns `role="radiogroup"` and `aria-invalid` on root                                                                                    | Group behavior controls descendant radios via context                              |
| `Radio`                                   | Composite (`label` wrapper + `input[type=radio]`)    | Input attrs/events mostly forwarded to internal `input` | Omits native `type` and `size`; forces `type="radio"`; group may override `name`, `checked`, `disabled`, `aria-invalid`                | `className`/`style` apply to wrapper `label`, not input (documented exception)     |
| `FormField`                               | `div`                                                | Yes on root                                             | None noted                                                                                                                             | Provides context to subcomponents                                                  |
| `FormFieldLabel`                          | `label` (via `Label`)                                | Yes                                                     | `htmlFor` defaults from context; required marker inherited from context                                                                | Consumer `htmlFor` still supported                                                 |
| `FormFieldDescription` / `FormFieldError` | `p`                                                  | Yes                                                     | IDs default from context; `FormFieldError` owns `role="alert"`                                                                         | Consumer `id` can override defaults                                                |
| `FormFieldControl`                        | No DOM node (clones child)                           | N/A (proxy component)                                   | Injects `id`, `required`, `invalid`, `aria-invalid`, `aria-describedby`, style props into child                                        | Passthrough contract applies to the child component, not `FormFieldControl` itself |
| `Avatar`                                  | `span` root (with internal `img` or fallback `span`) | Yes on root `span`                                      | `src`/`alt` handled by internal `img`; image-native attrs are not exposed                                                              | Root passthrough is consistent; image passthrough is out of scope                  |

### C. Interactive composite slots (mostly consistent, with one known divergence)

| Component(s)                                                      | Public surface node                                                    | Native attrs/events passthrough | Intentional omissions/overrides                                                            | Notes                                                                                     |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `Tabs`                                                            | `div`                                                                  | Yes                             | Controlled/uncontrolled state props own tab state API                                      | Root passthrough consistent                                                               |
| `TabsList`                                                        | `div`                                                                  | Yes                             | Owns `role="tablist"` and `aria-orientation`; composes `onKeyDown` for roving focus        | Consumer `onKeyDown` preserved                                                            |
| `TabsTrigger`                                                     | `button`                                                               | Yes at runtime                  | Forces `type="button"`, `role="tab"`, `aria-*`, `tabIndex`, `disabled`; composes `onClick` | TS typing should be covered by `#50` (currently uses `HTMLAttributes<HTMLButtonElement>`) |
| `TabsPanel`                                                       | `div`                                                                  | Yes                             | Owns `role="tabpanel"`, IDs, label linkage; defaults `hidden` by selection                 | Consumer `hidden` can override                                                            |
| `DialogTrigger`                                                   | `button`                                                               | Yes                             | Omits native `type`; forces `type="button"`; owns dialog trigger ARIA attrs                | Composes `onClick`                                                                        |
| `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose` | `h2`/`p`/`div`/`button`                                                | Yes                             | `DialogClose` omits native `type`; forces `type="button"`                                  | `DialogClose` composes `onClick`                                                          |
| `DialogContent`                                                   | `div` (portal content node)                                            | Mostly                          | Owns `role="dialog"`, `aria-modal`, ID, focus management                                   | Known divergence: `onMouseDown` prop is attached to overlay, not content node             |
| `PopoverTrigger`                                                  | `button`                                                               | Yes                             | Omits native `type`; forces `type="button"`; owns trigger ARIA attrs                       | Composes `onClick`                                                                        |
| `PopoverContent`                                                  | `div` (portal content node)                                            | Yes                             | Owns `role="dialog"`, ID, positioning styles                                               | `style` merges positioning with consumer style                                            |
| `DropdownMenuTrigger`                                             | `button`                                                               | Yes                             | Omits native `type`; forces `type="button"`; owns menu trigger ARIA attrs                  | Composes `onClick` and `onKeyDown`                                                        |
| `DropdownMenuContent`                                             | `div` (portal content node)                                            | Yes                             | Owns `role="menu"`, ID, keyboard navigation                                                | Composes `onKeyDown`                                                                      |
| `DropdownMenuItem`                                                | `button`                                                               | Yes                             | Omits native `type`; forces `type="button"` and `role="menuitem"`; adds `onSelect` API     | Composes `onClick`, closes menu, restores focus                                           |
| `Tooltip`                                                         | No single DOM public surface (wrapper + cloned child + portal content) | N/A (behavior wrapper)          | Child trigger props belong to the child element; wrapper/content are internal              | Use `TooltipContent` for explicit content DOM prop passthrough                            |

## Known Divergences (Follow-up Issues Required)

### `DialogContent` `onMouseDown` target mismatch

`DialogContentProps` is typed as content `HTMLDivElement` props, but `onMouseDown` is currently attached to the overlay wrapper instead of the content node. This breaks the default passthrough rule for a content-slot DOM event handler.

Expected contract-aligned behavior:

- `onMouseDown` on `DialogContent` should fire for mouse down events on the content element
- overlay click handling should use a dedicated prop (for example `onOverlayMouseDown`) if exposed

Follow-up issue: `#53` (`fix(dialog): align DialogContent onMouseDown passthrough`)

## Follow-up Mapping for Next P0s

- `#44` runtime prop forwarding tests should cover the "representative props/events" from the tables above and include the `DialogContent` known divergence as a regression test target
- `#45` ref contract tests can reuse the "public surface node" column
- `#50` TS contract tests should validate intentional omissions/overrides and button-slot prop typing consistency (notably `TabsTrigger`)
- `#46` public API docs should summarize the external-consumer subset of this contract
