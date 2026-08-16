import type {
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionPanelProps,
  AccordionProps,
  AccordionTriggerProps,
  AlertDescriptionProps,
  AlertDialogActionProps,
  AlertDialogActionsProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
  AlertProps,
  AlertTitleProps,
  AspectRatioProps,
  AvatarProps,
  BadgeProps,
  BreadcrumbCurrentProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
  ButtonProps,
  CardProps,
  CheckboxProps,
  CheckboxGroupLegendProps,
  CheckboxGroupProps,
  CheckboxItemProps,
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
  ComboboxOption,
  ComboboxProps,
  ContextMenuCheckboxItemProps,
  ContextMenuContentProps,
  ContextMenuGroupLabelProps,
  ContextMenuGroupProps,
  ContextMenuItemProps,
  ContextMenuLinkItemProps,
  ContextMenuProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuSeparatorProps,
  ContextMenuSubmenuProps,
  ContextMenuSubmenuTriggerProps,
  ContextMenuTriggerProps,
  DialogActionsProps,
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
  EmptyDescriptionProps,
  EmptyProps,
  EmptyTitleProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldLabelProps,
  FieldProps,
  FieldsetDescriptionProps,
  FieldsetLegendProps,
  FieldsetProps,
  FlexProps,
  IconProps,
  InputProps,
  LinkProps,
  MenuCheckboxItemProps,
  MenuContentProps,
  MenuGroupLabelProps,
  MenuGroupProps,
  MenuItemProps,
  MenuLinkItemProps,
  MenuProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuSeparatorProps,
  MenuSubmenuProps,
  MenuSubmenuTriggerProps,
  MenuTriggerProps,
  MeterProps,
  NumberFieldInputProps,
  NumberFieldProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationListProps,
  PaginationProps,
  PopoverCloseProps,
  PopoverContentProps,
  PopoverDescriptionProps,
  PopoverProps,
  PopoverTitleProps,
  PopoverTriggerProps,
  ProgressProps,
  RadioGroupLegendProps,
  RadioGroupProps,
  RadioProps,
  ScrollAreaProps,
  SelectProps,
  SeparatorProps,
  SkeletonProps,
  SliderProps,
  SpinnerProps,
  SwitchProps,
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
  TabProps,
  TabsListProps,
  TabsPanelProps,
  TabsProps,
  TextareaProps,
  ThemeProps,
  ToggleProps,
  ToggleGroupProps,
  ToastAction,
  ToastManager,
  ToastOptions,
  ToastPromiseOptions,
  ToastProviderProps,
  ToastUpdateOptions,
  ToastVariant,
  ToolbarButtonProps,
  ToolbarGroupProps,
  ToolbarInputProps,
  ToolbarLinkProps,
  ToolbarProps,
  ToolbarSeparatorProps,
  TooltipContentProps,
  TooltipProps,
  TooltipProviderProps,
  TooltipTriggerProps,
  TypographyProps
} from '../../src';
import {
  Button,
  Card,
  Combobox,
  ContextMenuContent,
  DialogContent,
  Input,
  Link,
  MenuContent,
  ScrollArea,
  Slider,
  Table,
  Tabs,
  ToastProvider,
  Toolbar,
  TooltipTrigger
} from '../../src';

type PublicProps =
  | AccordionHeaderProps
  | AccordionItemProps
  | AccordionPanelProps
  | AccordionProps
  | AccordionTriggerProps
  | AlertDescriptionProps
  | AlertDialogActionProps
  | AlertDialogActionsProps
  | AlertDialogCancelProps
  | AlertDialogContentProps
  | AlertDialogDescriptionProps
  | AlertDialogProps
  | AlertDialogTitleProps
  | AlertDialogTriggerProps
  | AlertProps
  | AlertTitleProps
  | AspectRatioProps
  | AvatarProps
  | BadgeProps
  | BreadcrumbCurrentProps
  | BreadcrumbItemProps
  | BreadcrumbLinkProps
  | BreadcrumbListProps
  | BreadcrumbProps
  | BreadcrumbSeparatorProps
  | ButtonProps
  | CardProps
  | CheckboxProps
  | CheckboxGroupLegendProps
  | CheckboxGroupProps
  | CheckboxItemProps
  | CollapsibleContentProps
  | CollapsibleProps
  | CollapsibleTriggerProps
  | ComboboxOption
  | ComboboxProps
  | ContextMenuCheckboxItemProps
  | ContextMenuContentProps
  | ContextMenuGroupLabelProps
  | ContextMenuGroupProps
  | ContextMenuItemProps
  | ContextMenuLinkItemProps
  | ContextMenuProps
  | ContextMenuRadioGroupProps
  | ContextMenuRadioItemProps
  | ContextMenuSeparatorProps
  | ContextMenuSubmenuProps
  | ContextMenuSubmenuTriggerProps
  | ContextMenuTriggerProps
  | DialogActionsProps
  | DialogCloseProps
  | DialogContentProps
  | DialogDescriptionProps
  | DialogProps
  | DialogTitleProps
  | DialogTriggerProps
  | EmptyDescriptionProps
  | EmptyProps
  | EmptyTitleProps
  | FieldDescriptionProps
  | FieldErrorProps
  | FieldLabelProps
  | FieldProps
  | FieldsetDescriptionProps
  | FieldsetLegendProps
  | FieldsetProps
  | FlexProps
  | IconProps
  | InputProps
  | LinkProps
  | MenuCheckboxItemProps
  | MenuContentProps
  | MenuGroupLabelProps
  | MenuGroupProps
  | MenuItemProps
  | MenuLinkItemProps
  | MenuProps
  | MenuRadioGroupProps
  | MenuRadioItemProps
  | MenuSeparatorProps
  | MenuSubmenuProps
  | MenuSubmenuTriggerProps
  | MenuTriggerProps
  | MeterProps
  | NumberFieldInputProps
  | NumberFieldProps
  | PaginationItemProps
  | PaginationLinkProps
  | PaginationListProps
  | PaginationProps
  | PopoverCloseProps
  | PopoverContentProps
  | PopoverDescriptionProps
  | PopoverProps
  | PopoverTitleProps
  | PopoverTriggerProps
  | ProgressProps
  | RadioGroupLegendProps
  | RadioGroupProps
  | RadioProps
  | ScrollAreaProps
  | SelectProps
  | SeparatorProps
  | SkeletonProps
  | SliderProps
  | SpinnerProps
  | SwitchProps
  | TableBodyProps
  | TableCaptionProps
  | TableCellProps
  | TableFooterProps
  | TableHeadProps
  | TableHeaderProps
  | TableProps
  | TableRowProps
  | TabProps
  | TabsListProps
  | TabsPanelProps
  | TabsProps
  | TextareaProps
  | ThemeProps
  | ToggleProps
  | ToggleGroupProps
  | ToastAction
  | ToastManager
  | ToastOptions
  | ToastPromiseOptions<unknown>
  | ToastProviderProps
  | ToastUpdateOptions
  | ToastVariant
  | ToolbarButtonProps
  | ToolbarGroupProps
  | ToolbarInputProps
  | ToolbarLinkProps
  | ToolbarProps
  | ToolbarSeparatorProps
  | TooltipContentProps
  | TooltipProps
  | TooltipProviderProps
  | TooltipTriggerProps
  | TypographyProps;

const publicProps = undefined as PublicProps | undefined;
void publicProps;

const closedStyleApi = () => (
  <>
    {/* @ts-expect-error consumers cannot override component classes */}
    <Button className="override">Button</Button>
    {/* @ts-expect-error consumers cannot override component styles */}
    <Card style={{ padding: 0 }}>Card</Card>
    {/* @ts-expect-error consumers cannot override input classes */}
    <Input className="override" />
    {/* @ts-expect-error consumers cannot override link styles */}
    <Link href="#" style={{ color: 'red' }}>
      Link
    </Link>
    {/* @ts-expect-error Base UI styling hooks remain internal */}
    <Slider className="override" label="Volume" />
    {/* @ts-expect-error Base UI render hooks remain internal */}
    <Tabs render={<section />} />
    {/* @ts-expect-error Base UI classes remain internal */}
    <Toolbar className="override" />
    {/* @ts-expect-error combobox styling remains internal */}
    <Combobox className="override" label="Fruit" options={[]} />
    {/* @ts-expect-error overlay classes remain internal */}
    <DialogContent className="override" />
    {/* @ts-expect-error overlay inline styles remain internal */}
    <TooltipTrigger style={{ color: 'red' }}>Info</TooltipTrigger>
    {/* @ts-expect-error menu classes remain internal */}
    <MenuContent className="override" />
    {/* @ts-expect-error context menu styles remain internal */}
    <ContextMenuContent style={{ padding: 0 }} />
    {/* @ts-expect-error application surfaces keep styling internal */}
    <ScrollArea className="override">Content</ScrollArea>
    {/* @ts-expect-error native table styles remain closed */}
    <Table style={{ border: 0 }} />
    {/* @ts-expect-error toast presentation is provider-owned */}
    <ToastProvider className="override">Content</ToastProvider>
  </>
);
void closedStyleApi;
