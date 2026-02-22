import { createRef, type ChangeEvent, type MouseEvent } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTrigger,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FormField,
  FormFieldControl,
  Input,
  PopoverTrigger,
  Radio,
  Select,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  Textarea,
  TooltipContent
} from '../index';

// Compile-only consumer contract tests.
// This file is included by tsconfig.json, so `pnpm typecheck` enforces these checks.

const buttonRef = createRef<HTMLButtonElement>();
<Button
  ref={buttonRef}
  onClick={(event) => {
    const typedEvent: MouseEvent<HTMLButtonElement> = event;
    const typedTarget: HTMLButtonElement = event.currentTarget;
    void typedEvent;
    void typedTarget;
  }}
>
  Save
</Button>;

const inputRef = createRef<HTMLInputElement>();
<Input
  ref={inputRef}
  onChange={(event) => {
    const typedEvent: ChangeEvent<HTMLInputElement> = event;
    const nextValue: string = event.currentTarget.value;
    void typedEvent;
    void nextValue;
  }}
/>;

const checkboxRef = createRef<HTMLInputElement>();
<Checkbox
  ref={checkboxRef}
  onChange={(event) => {
    const nextChecked: boolean = event.currentTarget.checked;
    void nextChecked;
  }}
/>;

const selectRef = createRef<HTMLSelectElement>();
<Select
  ref={selectRef}
  onChange={(event) => {
    const typedEvent: ChangeEvent<HTMLSelectElement> = event;
    const nextValue: string = event.currentTarget.value;
    void typedEvent;
    void nextValue;
  }}
>
  <option value="one">One</option>
</Select>;

const textareaRef = createRef<HTMLTextAreaElement>();
<Textarea ref={textareaRef} onChange={(event) => void event.currentTarget.value} />;

// Intentional omissions/overrides: design-system `size` replaces native numeric `size`.
<Input size="sm" />;
<Select size="md">
  <option value="one">One</option>
</Select>;
<Textarea size="lg" />;
<Checkbox size="md" />;
<Radio value="one" size="sm" />;

// @ts-expect-error Input omits native numeric `size` in favor of design-system size tokens.
<Input size={4} />;
// @ts-expect-error Select omits native numeric `size` in favor of design-system size tokens.
<Select size={4}>
  <option value="one">One</option>
</Select>;
// @ts-expect-error Textarea omits native numeric `size` in favor of design-system size tokens.
<Textarea size={4} />;
// @ts-expect-error Checkbox omits native numeric `size` in favor of design-system size tokens.
<Checkbox size={4} />;
// @ts-expect-error Radio omits native numeric `size` in favor of design-system size tokens.
<Radio value="one" size={4} />;

// Intentional omissions/overrides: trigger buttons force `type="button"` and omit `type`.
<Dialog>
  {/* @ts-expect-error DialogTrigger omits native `type` and always renders type="button". */}
  <DialogTrigger type="submit">Open dialog</DialogTrigger>
  <DialogContent>Body</DialogContent>
</Dialog>;
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
  </TabsList>
  <TabsPanel value="account">Panel</TabsPanel>
</Tabs>;
// @ts-expect-error PopoverTrigger omits native `type` and always renders type="button".
<PopoverTrigger type="submit">Open popover</PopoverTrigger>;
// @ts-expect-error DropdownMenuTrigger omits native `type` and always renders type="button".
<DropdownMenuTrigger type="submit">Open menu</DropdownMenuTrigger>;

// Representative ref element type checks for composite/public slots.
const dialogContentRef = createRef<HTMLDivElement>();
<Dialog>
  <DialogTrigger>Open dialog</DialogTrigger>
  <DialogContent ref={dialogContentRef}>Body</DialogContent>
</Dialog>;

const tabsTriggerRef = createRef<HTMLButtonElement>();
<Tabs defaultValue="one">
  <TabsList>
    <TabsTrigger ref={tabsTriggerRef} value="one">
      One
    </TabsTrigger>
  </TabsList>
  <TabsPanel value="one">Panel</TabsPanel>
</Tabs>;

const menuItemRef = createRef<HTMLButtonElement>();
<DropdownMenuItem ref={menuItemRef}>Item</DropdownMenuItem>;

const tooltipContentRef = createRef<HTMLDivElement>();
<TooltipContent ref={tooltipContentRef}>Helpful tip</TooltipContent>;

// Intentional ref exceptions: these public components do not expose a root ref contract.
const divRef = createRef<HTMLDivElement>();
// @ts-expect-error Dialog is a controller component and does not accept a root ref prop.
<Dialog ref={divRef} />;
// @ts-expect-error FormFieldControl is a proxy component and does not accept a ref prop.
<FormFieldControl ref={divRef}>
  <Input />
</FormFieldControl>;

// Positive check for nearby form wrapper root ref.
const formFieldRef = createRef<HTMLDivElement>();
<FormField ref={formFieldRef} />;

export {};
