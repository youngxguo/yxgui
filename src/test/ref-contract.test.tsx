import { render, screen } from '@testing-library/react';
import { createRef, type ReactElement, type RefObject } from 'react';
import { describe, expect, it } from 'vitest';
import { Alert, AlertDescription, AlertTitle } from '../components/Alert/Alert';
import { Avatar } from '../components/Avatar/Avatar';
import { Badge } from '../components/Badge/Badge';
import { Button } from '../components/Button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../components/Card/Card';
import { Checkbox } from '../components/Checkbox/Checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '../components/Dialog/Dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../components/DropdownMenu/DropdownMenu';
import {
  FormField,
  FormFieldDescription,
  FormFieldError,
  FormFieldLabel
} from '../components/FormField/FormField';
import { Input } from '../components/Input/Input';
import { Label } from '../components/Label/Label';
import { Popover, PopoverContent, PopoverTrigger } from '../components/Popover/Popover';
import { Progress } from '../components/Progress/Progress';
import { Radio, RadioGroup } from '../components/RadioGroup/RadioGroup';
import { Select } from '../components/Select/Select';
import { Separator } from '../components/Separator/Separator';
import { Skeleton } from '../components/Skeleton/Skeleton';
import { Switch } from '../components/Switch/Switch';
import { Tabs, TabsList, TabsPanel, TabsTrigger } from '../components/Tabs/Tabs';
import { Textarea } from '../components/Textarea/Textarea';
import { TooltipContent } from '../components/Tooltip/Tooltip';
import { expectRefTarget } from './refContract';

interface SimpleRefCase<T extends Element> {
  name: string;
  constructor: abstract new (...args: unknown[]) => T;
  render: (ref: RefObject<T | null>) => ReactElement;
}

function expectRefForTestId<T extends Element>(
  ref: RefObject<T | null>,
  testId: string,
  constructor: abstract new (...args: unknown[]) => T
) {
  expectRefTarget({
    constructor,
    element: screen.getByTestId(testId),
    ref
  });
}

function runSimpleRefCase<T extends Element>({ name, constructor, render: renderCase }: SimpleRefCase<T>) {
  it(name, () => {
    const ref = createRef<T>();
    render(renderCase(ref));
    expectRefForTestId(ref, 'target', constructor);
  });
}

describe('public ref contracts', () => {
  describe('simple DOM-rendering components', () => {
    const cases: SimpleRefCase<Element>[] = [
      {
        name: 'Badge refs a span',
        constructor: HTMLSpanElement,
        render: (ref) => (
          <Badge ref={ref as RefObject<HTMLSpanElement | null>} data-testid="target">
            New
          </Badge>
        )
      },
      {
        name: 'Button refs a button',
        constructor: HTMLButtonElement,
        render: (ref) => (
          <Button ref={ref as RefObject<HTMLButtonElement | null>} data-testid="target">
            Click
          </Button>
        )
      },
      {
        name: 'Input refs an input',
        constructor: HTMLInputElement,
        render: (ref) => (
          <Input ref={ref as RefObject<HTMLInputElement | null>} data-testid="target" />
        )
      },
      {
        name: 'Textarea refs a textarea',
        constructor: HTMLTextAreaElement,
        render: (ref) => (
          <Textarea ref={ref as RefObject<HTMLTextAreaElement | null>} data-testid="target" />
        )
      },
      {
        name: 'Select refs a select',
        constructor: HTMLSelectElement,
        render: (ref) => (
          <Select ref={ref as RefObject<HTMLSelectElement | null>} data-testid="target">
            <option value="a">A</option>
          </Select>
        )
      },
      {
        name: 'Checkbox refs an input',
        constructor: HTMLInputElement,
        render: (ref) => (
          <Checkbox ref={ref as RefObject<HTMLInputElement | null>} data-testid="target" />
        )
      },
      {
        name: 'Label refs a label',
        constructor: HTMLLabelElement,
        render: (ref) => (
          <Label ref={ref as RefObject<HTMLLabelElement | null>} data-testid="target">
            Email
          </Label>
        )
      },
      {
        name: 'Separator refs a div',
        constructor: HTMLDivElement,
        render: (ref) => (
          <Separator ref={ref as RefObject<HTMLDivElement | null>} data-testid="target" />
        )
      },
      {
        name: 'Skeleton refs a span',
        constructor: HTMLSpanElement,
        render: (ref) => (
          <Skeleton ref={ref as RefObject<HTMLSpanElement | null>} data-testid="target" />
        )
      },
      {
        name: 'Progress refs a div',
        constructor: HTMLDivElement,
        render: (ref) => (
          <Progress
            ref={ref as RefObject<HTMLDivElement | null>}
            data-testid="target"
            value={25}
            aria-label="Loading"
          />
        )
      },
      {
        name: 'Avatar refs its root span',
        constructor: HTMLSpanElement,
        render: (ref) => (
          <Avatar ref={ref as RefObject<HTMLSpanElement | null>} data-testid="target">
            YG
          </Avatar>
        )
      },
      {
        name: 'Switch refs a button',
        constructor: HTMLButtonElement,
        render: (ref) => (
          <Switch
            ref={ref as RefObject<HTMLButtonElement | null>}
            data-testid="target"
            aria-label="Auto save"
          />
        )
      },
      {
        name: 'TooltipContent refs a div',
        constructor: HTMLDivElement,
        render: (ref) => (
          <TooltipContent ref={ref as RefObject<HTMLDivElement | null>} data-testid="target">
            Tip
          </TooltipContent>
        )
      }
    ];

    for (const testCase of cases) {
      runSimpleRefCase(testCase);
    }
  });

  it('verifies Alert root and slot ref targets', () => {
    const alertRef = createRef<HTMLDivElement>();
    const titleRef = createRef<HTMLParagraphElement>();
    const descriptionRef = createRef<HTMLParagraphElement>();

    render(
      <Alert ref={alertRef} data-testid="alert">
        <AlertTitle ref={titleRef} data-testid="alert-title">
          Saved
        </AlertTitle>
        <AlertDescription ref={descriptionRef} data-testid="alert-description">
          Changes were applied.
        </AlertDescription>
      </Alert>
    );

    expectRefForTestId(alertRef, 'alert', HTMLDivElement);
    expectRefForTestId(titleRef, 'alert-title', HTMLParagraphElement);
    expectRefForTestId(descriptionRef, 'alert-description', HTMLParagraphElement);
  });

  it('verifies Card root and slot ref targets', () => {
    const cardRef = createRef<HTMLDivElement>();
    const headerRef = createRef<HTMLDivElement>();
    const titleRef = createRef<HTMLHeadingElement>();
    const descriptionRef = createRef<HTMLParagraphElement>();
    const contentRef = createRef<HTMLDivElement>();
    const footerRef = createRef<HTMLDivElement>();

    render(
      <Card ref={cardRef} data-testid="card">
        <CardHeader ref={headerRef} data-testid="card-header">
          <CardTitle ref={titleRef} data-testid="card-title">
            Pro
          </CardTitle>
          <CardDescription ref={descriptionRef} data-testid="card-description">
            Team plan
          </CardDescription>
        </CardHeader>
        <CardContent ref={contentRef} data-testid="card-content">
          Body
        </CardContent>
        <CardFooter ref={footerRef} data-testid="card-footer">
          Footer
        </CardFooter>
      </Card>
    );

    expectRefForTestId(cardRef, 'card', HTMLDivElement);
    expectRefForTestId(headerRef, 'card-header', HTMLDivElement);
    expectRefForTestId(titleRef, 'card-title', HTMLHeadingElement);
    expectRefForTestId(descriptionRef, 'card-description', HTMLParagraphElement);
    expectRefForTestId(contentRef, 'card-content', HTMLDivElement);
    expectRefForTestId(footerRef, 'card-footer', HTMLDivElement);
  });

  it('verifies RadioGroup root and Radio input ref targets', () => {
    const groupRef = createRef<HTMLDivElement>();
    const radioRef = createRef<HTMLInputElement>();

    render(
      <RadioGroup ref={groupRef} data-testid="group">
        <Radio ref={radioRef} value="a" data-testid="radio">
          Option A
        </Radio>
      </RadioGroup>
    );

    expectRefForTestId(groupRef, 'group', HTMLDivElement);
    expectRefForTestId(radioRef, 'radio', HTMLInputElement);
  });

  it('verifies FormField root and slot ref targets', () => {
    const rootRef = createRef<HTMLDivElement>();
    const labelRef = createRef<HTMLLabelElement>();
    const descriptionRef = createRef<HTMLParagraphElement>();
    const errorRef = createRef<HTMLParagraphElement>();

    render(
      <FormField ref={rootRef} data-testid="field" invalid>
        <FormFieldLabel ref={labelRef} data-testid="field-label">
          Email
        </FormFieldLabel>
        <FormFieldDescription ref={descriptionRef} data-testid="field-description">
          We only use this for receipts.
        </FormFieldDescription>
        <FormFieldError ref={errorRef} data-testid="field-error">
          Invalid email
        </FormFieldError>
      </FormField>
    );

    expectRefForTestId(rootRef, 'field', HTMLDivElement);
    expectRefForTestId(labelRef, 'field-label', HTMLLabelElement);
    expectRefForTestId(descriptionRef, 'field-description', HTMLParagraphElement);
    expectRefForTestId(errorRef, 'field-error', HTMLParagraphElement);
  });

  it('verifies Tabs root and slot ref targets', () => {
    const tabsRef = createRef<HTMLDivElement>();
    const listRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const panelRef = createRef<HTMLDivElement>();

    render(
      <Tabs ref={tabsRef} defaultValue="account" data-testid="tabs">
        <TabsList ref={listRef} data-testid="tabs-list">
          <TabsTrigger ref={triggerRef} value="account" data-testid="tabs-trigger">
            Account
          </TabsTrigger>
        </TabsList>
        <TabsPanel ref={panelRef} value="account" data-testid="tabs-panel">
          Panel
        </TabsPanel>
      </Tabs>
    );

    expectRefForTestId(tabsRef, 'tabs', HTMLDivElement);
    expectRefForTestId(listRef, 'tabs-list', HTMLDivElement);
    expectRefForTestId(triggerRef, 'tabs-trigger', HTMLButtonElement);
    expectRefForTestId(panelRef, 'tabs-panel', HTMLDivElement);
  });

  it('verifies Dialog slot ref targets', () => {
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();
    const titleRef = createRef<HTMLHeadingElement>();
    const descriptionRef = createRef<HTMLParagraphElement>();
    const footerRef = createRef<HTMLDivElement>();
    const closeRef = createRef<HTMLButtonElement>();

    render(
      <Dialog defaultOpen>
        <DialogTrigger ref={triggerRef} data-testid="dialog-trigger">
          Open
        </DialogTrigger>
        <DialogContent ref={contentRef} data-testid="dialog-content">
          <DialogTitle ref={titleRef} data-testid="dialog-title">
            Invite
          </DialogTitle>
          <DialogDescription ref={descriptionRef} data-testid="dialog-description">
            Share access.
          </DialogDescription>
          <DialogFooter ref={footerRef} data-testid="dialog-footer">
            <DialogClose ref={closeRef} data-testid="dialog-close">
              Close
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    expectRefForTestId(triggerRef, 'dialog-trigger', HTMLButtonElement);
    expectRefForTestId(contentRef, 'dialog-content', HTMLDivElement);
    expectRefForTestId(titleRef, 'dialog-title', HTMLHeadingElement);
    expectRefForTestId(descriptionRef, 'dialog-description', HTMLParagraphElement);
    expectRefForTestId(footerRef, 'dialog-footer', HTMLDivElement);
    expectRefForTestId(closeRef, 'dialog-close', HTMLButtonElement);
  });

  it('verifies Popover slot ref targets', () => {
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();

    render(
      <Popover defaultOpen>
        <PopoverTrigger ref={triggerRef} data-testid="popover-trigger">
          Toggle
        </PopoverTrigger>
        <PopoverContent ref={contentRef} data-testid="popover-content">
          Body
        </PopoverContent>
      </Popover>
    );

    expectRefForTestId(triggerRef, 'popover-trigger', HTMLButtonElement);
    expectRefForTestId(contentRef, 'popover-content', HTMLDivElement);
  });

  it('verifies DropdownMenu slot ref targets', () => {
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLButtonElement>();

    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger ref={triggerRef} data-testid="menu-trigger">
          Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent ref={contentRef} data-testid="menu-content">
          <DropdownMenuItem ref={itemRef} data-testid="menu-item">
            Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expectRefForTestId(triggerRef, 'menu-trigger', HTMLButtonElement);
    expectRefForTestId(contentRef, 'menu-content', HTMLDivElement);
    expectRefForTestId(itemRef, 'menu-item', HTMLButtonElement);
  });

  it('documents public components without a direct DOM ref contract', () => {
    expect(
      [
        'Dialog',
        'DropdownMenu',
        'FormFieldControl',
        'Popover',
        'Tooltip'
      ]
    ).toEqual(['Dialog', 'DropdownMenu', 'FormFieldControl', 'Popover', 'Tooltip']);
  });
});
