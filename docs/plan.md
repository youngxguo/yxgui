# yxgui plan

yxgui will be a small, opinionated React component system with its own visual
language, accessible behavior, and a coherent token foundation that applications
can use and customize.

StyleX is the styling backbone. Styles and themes are authored through StyleX
and compiled to static CSS. Themeable public tokens use stable `--yxg-*` custom
properties so they remain useful outside yxgui components.

## Guiding decisions

- Tokens are a public contract, but they are developed alongside real interface
  needs rather than designed exhaustively up front.
- StyleX is the single styling and composition system for yxgui and the
  recommended system for applications built with it.
- Themeable values, fixed style constants, and JavaScript values remain distinct
  contracts. Each is exposed only when consumers need it.
- Themes apply to ordinary element subtrees. React context is not required for
  components to receive theme values.
- Component CSS is extracted at build time. Runtime style injection is not part
  of the architecture.
- Plain CSS is limited to a small, documented global entry point and platform
  cases that are not a good fit for StyleX.
- Components prefer native HTML behavior. More complex behavior must remain
  accessible, reliable, and independent of yxgui's visual design.
- yxgui starts as a package. Source distribution or a CLI can be reconsidered
  after real usage demonstrates a need.

## Phases

### 1. Prove the foundation

- Configure the official StyleX toolchain for the library, tests, and a small
  playground.
- Build a minimal spike with representative tokens, two themes, and one styled
  component.
- Pack the library and install it in a clean Vite application.
- Verify static CSS output, required imports, public token use, theme application,
  and scoped overrides.
- Settle the minimum package and consumer contract before expanding the system.

### 2. Establish the design through a vertical slice

- Define the initial visual direction and a minimal token inventory.
- Establish the default light and dark schemes and the first density and motion
  choices.
- Organize theme dimensions so the supported combinations compose predictably.
- Build a small settings interface with Button, Field, Input, and Switch.
- Test a consumer brand, dark mode, compact density, reduced motion, and a scoped
  override.
- Finalize the initial token relationships and names from what the prototype
  reveals.

### 3. Establish component conventions

- Define component API, form, and accessibility conventions.
- Define StyleX conventions for parts, variants, interaction states, responsive
  styles, and intentional consumer overrides.
- Establish the supported browser and React environment.
- Add behavior, accessibility, and visual testing to the playground.
- Define the completion checklist shared by every component.

### 4. Complete the essential controls

- Add Textarea, Checkbox, and the feedback components needed by the settings
  interface.
- Finish the interface and use it to validate the visual language, themes,
  component APIs, and accessibility conventions.

### 5. Add compound interactions

- Add disclosure and overlay components such as Accordion, Tabs, Dialog,
  Popover, Tooltip, Menu, and Select as real use cases require them.
- Treat focus management, keyboard behavior, dismissal, and positioning as
  first-class component contracts.

### 6. Expand and distribute

- Add advanced components only when an application needs them.
- Stabilize package exports, documentation, compatibility, and release policy.
- Revisit source distribution after yxgui has been used in real applications.

## Not yet

- A second styling engine, utility CSS framework, or `sx`-style language
- A component registry or installer CLI
- A large component catalog
- Compatibility layers for other styling engines
- An exhaustive token system designed without real UI
- Complex components before the basic visual and behavioral language is proven
