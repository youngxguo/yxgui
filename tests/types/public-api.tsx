import type {
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionPanelProps,
  AccordionProps,
  AccordionTriggerProps,
  AutocompleteOption,
  AutocompleteProps,
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
  CarouselProps,
  CheckboxProps,
  CheckboxGroupLegendProps,
  CheckboxGroupProps,
  CheckboxItemProps,
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
  ComboboxOption,
  ComboboxProps,
  ContainerProps,
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
  DataListDescriptionProps,
  DataListItemProps,
  DataListProps,
  DataListTermProps,
  DialogActionsProps,
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
  DrawerActionsProps,
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerProps,
  DrawerSide,
  DrawerTitleProps,
  DrawerTriggerProps,
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
  FormActions,
  FormProps,
  FormValidationMode,
  GridItemProps,
  GridProps,
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
  MenubarProps,
  MeterProps,
  MultiSelectOption,
  MultiSelectProps,
  NavigationMenuContentProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuProps,
  NavigationMenuTriggerLinkProps,
  NavigationMenuTriggerProps,
  NumberFieldInputProps,
  NumberFieldProps,
  OTPFieldProps,
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
  PreviewCardContentProps,
  PreviewCardDescriptionProps,
  PreviewCardImageProps,
  PreviewCardProps,
  PreviewCardTitleProps,
  PreviewCardTriggerProps,
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
  Autocomplete,
  Button,
  Card,
  Carousel,
  Combobox,
  Container,
  ContextMenuContent,
  DataList,
  DialogContent,
  DrawerContent,
  Form,
  Input,
  Grid,
  Link,
  MenuContent,
  Menubar,
  MultiSelect,
  NavigationMenuContent,
  OTPField,
  PreviewCardContent,
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
  | AutocompleteOption
  | AutocompleteProps
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
  | CarouselProps
  | CheckboxProps
  | CheckboxGroupLegendProps
  | CheckboxGroupProps
  | CheckboxItemProps
  | CollapsibleContentProps
  | CollapsibleProps
  | CollapsibleTriggerProps
  | ComboboxOption
  | ComboboxProps
  | ContainerProps
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
  | DataListDescriptionProps
  | DataListItemProps
  | DataListProps
  | DataListTermProps
  | DialogActionsProps
  | DialogCloseProps
  | DialogContentProps
  | DialogDescriptionProps
  | DialogProps
  | DialogTitleProps
  | DialogTriggerProps
  | DrawerActionsProps
  | DrawerCloseProps
  | DrawerContentProps
  | DrawerDescriptionProps
  | DrawerProps
  | DrawerSide
  | DrawerTitleProps
  | DrawerTriggerProps
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
  | FormActions
  | FormProps
  | FormValidationMode
  | GridItemProps
  | GridProps
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
  | MenubarProps
  | MeterProps
  | MultiSelectOption
  | MultiSelectProps
  | NavigationMenuContentProps
  | NavigationMenuItemProps
  | NavigationMenuLinkProps
  | NavigationMenuListProps
  | NavigationMenuProps
  | NavigationMenuTriggerLinkProps
  | NavigationMenuTriggerProps
  | NumberFieldInputProps
  | NumberFieldProps
  | OTPFieldProps
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
  | PreviewCardContentProps
  | PreviewCardDescriptionProps
  | PreviewCardImageProps
  | PreviewCardProps
  | PreviewCardTitleProps
  | PreviewCardTriggerProps
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
    {/* @ts-expect-error autocomplete styling remains internal */}
    <Autocomplete className="override" label="Search" options={[]} />
    {/* @ts-expect-error consumers cannot override component classes */}
    <Button className="override">Button</Button>
    {/* @ts-expect-error consumers cannot override component styles */}
    <Card style={{ padding: 0 }}>Card</Card>
    {/* @ts-expect-error carousel layout remains internal */}
    <Carousel className="override">Slide</Carousel>
    {/* @ts-expect-error consumers cannot override input classes */}
    <Input className="override" />
    {/* @ts-expect-error form layout remains a semantic API */}
    <Form className="override" />
    {/* @ts-expect-error consumers cannot override link styles */}
    <Link href="#" style={{ color: 'red' }}>
      Link
    </Link>
    {/* @ts-expect-error grid layout remains an explicit semantic API */}
    <Grid style={{ display: 'block' }} />
    {/* @ts-expect-error container sizing remains an explicit semantic API */}
    <Container className="override" />
    {/* @ts-expect-error structured data presentation remains internal */}
    <DataList style={{ display: 'block' }} />
    {/* @ts-expect-error Base UI styling hooks remain internal */}
    <Slider className="override" label="Volume" />
    {/* @ts-expect-error Base UI render hooks remain internal */}
    <Tabs render={<section />} />
    {/* @ts-expect-error Base UI classes remain internal */}
    <Toolbar className="override" />
    {/* @ts-expect-error combobox styling remains internal */}
    <Combobox className="override" label="Fruit" options={[]} />
    {/* @ts-expect-error multi-select styling remains internal */}
    <MultiSelect style={{ minHeight: 0 }} label="Tags" options={[]} />
    {/* @ts-expect-error OTP slot styling remains internal */}
    <OTPField className="override" label="Code" />
    {/* @ts-expect-error navigation menu surfaces keep styling internal */}
    <NavigationMenuContent className="override" />
    {/* @ts-expect-error overlay classes remain internal */}
    <DialogContent className="override" />
    {/* @ts-expect-error drawer surfaces keep styling internal */}
    <DrawerContent style={{ width: 200 }} />
    {/* @ts-expect-error preview card presentation remains internal */}
    <PreviewCardContent className="override" />
    {/* @ts-expect-error overlay inline styles remain internal */}
    <TooltipTrigger style={{ color: 'red' }}>Info</TooltipTrigger>
    {/* @ts-expect-error menu classes remain internal */}
    <MenuContent className="override" />
    {/* @ts-expect-error menubar layout remains internal */}
    <Menubar style={{ gap: 0 }} />
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
