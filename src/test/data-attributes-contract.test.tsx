import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FormField,
  FormFieldControl,
  Input,
  PaginationLink,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTrigger,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem
} from '../index';

describe('shared data attributes contract', () => {
  it('emits shared invalid and disabled attrs for form controls', () => {
    render(
      <>
        <Input aria-label="Input" invalid disabled />
        <Select aria-label="Select" invalid disabled>
          <option value="one">One</option>
        </Select>
        <Textarea aria-label="Textarea" invalid disabled />
        <Checkbox aria-label="Checkbox" invalid disabled />
        <FormField data-testid="field" invalid>
          <FormFieldControl>
            <Input aria-label="Nested input" />
          </FormFieldControl>
        </FormField>
      </>
    );

    expect(screen.getByRole('textbox', { name: 'Input' })).toHaveAttribute('data-invalid', '');
    expect(screen.getByRole('textbox', { name: 'Input' })).toHaveAttribute('data-disabled', '');
    expect(screen.getByRole('combobox', { name: 'Select' })).toHaveAttribute('data-invalid', '');
    expect(screen.getByRole('combobox', { name: 'Select' })).toHaveAttribute('data-disabled', '');
    expect(screen.getByRole('textbox', { name: 'Textarea' })).toHaveAttribute('data-invalid', '');
    expect(screen.getByRole('textbox', { name: 'Textarea' })).toHaveAttribute('data-disabled', '');
    expect(screen.getByRole('checkbox', { name: 'Checkbox' })).toHaveAttribute('data-invalid', '');
    expect(screen.getByRole('checkbox', { name: 'Checkbox' })).toHaveAttribute('data-disabled', '');
    expect(screen.getByTestId('field')).toHaveAttribute('data-invalid', '');
    expect(screen.getByRole('textbox', { name: 'Nested input' })).toHaveAttribute(
      'data-invalid',
      ''
    );
  });

  it('emits consistent state attrs for selection primitives', () => {
    render(
      <>
        <Switch aria-label="Notifications" checked disabled />
        <Toggle aria-label="Bold" pressed disabled />
        <ToggleGroup type="single" value="left" disabled aria-label="Alignment">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
        </ToggleGroup>
        <Tabs defaultValue="account" orientation="vertical">
          <TabsList aria-label="Sections">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security" disabled>
              Security
            </TabsTrigger>
          </TabsList>
          <TabsPanel value="account">Account panel</TabsPanel>
          <TabsPanel value="security">Security panel</TabsPanel>
        </Tabs>
        <RadioGroup aria-label="Size" defaultValue="m" invalid disabled orientation="horizontal">
          <Radio value="s" label="Small" />
          <Radio value="m" label="Medium" />
        </RadioGroup>
      </>
    );

    expect(screen.getByRole('switch', { name: 'Notifications' })).toHaveAttribute(
      'data-state',
      'checked'
    );
    expect(screen.getByRole('switch', { name: 'Notifications' })).toHaveAttribute(
      'data-disabled',
      ''
    );
    expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('data-state', 'on');
    expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('data-disabled', '');

    const toggleGroup = screen.getByRole('group', { name: 'Alignment' });
    expect(toggleGroup).toHaveAttribute('data-disabled', '');
    expect(toggleGroup).toHaveAttribute('data-orientation', 'horizontal');
    expect(screen.getByRole('button', { name: 'Left' })).toHaveAttribute('data-state', 'on');
    expect(screen.getByRole('button', { name: 'Left' })).toHaveAttribute('data-disabled', '');

    const tablist = screen.getByRole('tablist', { name: 'Sections' });
    expect(tablist).toHaveAttribute('data-orientation', 'vertical');
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('data-state', 'active');
    expect(screen.getByRole('tab', { name: 'Security' })).toHaveAttribute('data-state', 'inactive');
    expect(screen.getByRole('tab', { name: 'Security' })).toHaveAttribute('data-disabled', '');
    expect(screen.getByRole('tabpanel', { name: 'Account' })).toHaveAttribute(
      'data-state',
      'active'
    );

    const radioGroup = screen.getByRole('radiogroup', { name: 'Size' });
    expect(radioGroup).toHaveAttribute('data-invalid', '');
    expect(radioGroup).toHaveAttribute('data-disabled', '');
    expect(radioGroup).toHaveAttribute('data-orientation', 'horizontal');
    expect(screen.getByRole('radio', { name: 'Small' })).toHaveAttribute('data-invalid', '');
    expect(screen.getByRole('radio', { name: 'Small' })).toHaveAttribute('data-disabled', '');
  });

  it('emits open state attrs for overlay/menu triggers and content', () => {
    render(
      <>
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem disabled>Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Popover defaultOpen>
          <PopoverTrigger>Open popover</PopoverTrigger>
          <PopoverContent>Popover body</PopoverContent>
        </Popover>
      </>
    );

    expect(screen.getByRole('button', { name: 'Actions' })).toHaveAttribute('data-state', 'open');
    expect(screen.getByRole('menu')).toHaveAttribute('data-state', 'open');
    expect(screen.getByRole('menuitem', { name: 'Archive' })).toHaveAttribute('data-disabled', '');

    expect(screen.getByRole('button', { name: 'Open popover' })).toHaveAttribute(
      'data-state',
      'open'
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('data-state', 'open');
  });

  it('normalizes link disabled/active state attrs', () => {
    render(
      <>
        <PaginationLink href="/page/1" isActive>
          1
        </PaginationLink>
        <PaginationLink href="/page/2" aria-disabled="true">
          2
        </PaginationLink>
      </>
    );

    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute('data-state', 'active');
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('data-state', 'inactive');
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('data-disabled', '');
  });
});
