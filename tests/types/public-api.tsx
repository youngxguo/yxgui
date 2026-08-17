import type {
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionPanelProps,
  AccordionProps,
  AccordionTriggerProps,
  ActionRowProps,
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
  AppShellFooterProps,
  AppShellHeaderProps,
  AppShellMainProps,
  AppShellProps,
  AppShellSidebarProps,
  AspectRatioProps,
  AvatarGroupOverflowProps,
  AvatarGroupProps,
  AvatarProps,
  AvatarShape,
  AvatarSize,
  BadgeProps,
  BreadcrumbCurrentProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
  ButtonGroupProps,
  ButtonGroupSeparatorProps,
  ButtonGroupTextProps,
  CalendarProps,
  CardActionProps,
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
  CarouselProps,
  CheckboxProps,
  CheckboxGroupLegendProps,
  CheckboxGroupProps,
  CheckboxItemProps,
  CircularProgressProps,
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
  CodeBlockProps,
  ColorFieldProps,
  ComboboxOption,
  ComboboxProps,
  CommandMenuOption,
  CommandMenuProps,
  ContainerProps,
  CopyButtonProps,
  CopyButtonStatus,
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
  DataTableColumn,
  DataTableProps,
  DataTableSort,
  DataTableSortDirection,
  DateFieldProps,
  DatePickerProps,
  DateTimeFieldProps,
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
  EmptyContentProps,
  EmptyHeaderProps,
  EmptyMediaProps,
  EmptyProps,
  EmptyTitleProps,
  FieldContentProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldGroupProps,
  FieldLabelProps,
  FieldOrientation,
  FieldProps,
  FieldSeparatorProps,
  FieldTitleProps,
  FieldsetDescriptionProps,
  FieldsetLegendProps,
  FieldsetProps,
  FileUploadProps,
  FlexProps,
  FormActions,
  FormProps,
  FormValidationMode,
  GridItemProps,
  GridProps,
  IconButtonProps,
  IconProps,
  InputGroupAddonAlign,
  InputGroupAddonProps,
  InputGroupButtonProps,
  InputGroupInputProps,
  InputGroupProps,
  InputGroupTextProps,
  InputGroupTextareaProps,
  InputProps,
  ItemActionsProps,
  ItemButtonProps,
  ItemContentProps,
  ItemDescriptionProps,
  ItemFooterProps,
  ItemGroupProps,
  ItemHeaderProps,
  ItemLinkProps,
  ItemMediaProps,
  ItemProps,
  ItemSeparatorProps,
  ItemSize,
  ItemTitleProps,
  ItemVariant,
  KbdProps,
  LinkProps,
  ListboxOptionProps,
  ListboxProps,
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
  PageHeaderActionsProps,
  PageHeaderContentProps,
  PageHeaderDescriptionProps,
  PageHeaderProps,
  PageHeaderTitleProps,
  PageSectionActionsProps,
  PageSectionContentProps,
  PageSectionDescriptionProps,
  PageSectionHeaderProps,
  PageSectionHeadingProps,
  PageSectionProps,
  PageSectionTitleProps,
  PasswordFieldProps,
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
  RatingProps,
  ResizablePanelsOrientation,
  ResizablePanelsProps,
  ScrollAreaProps,
  SearchFieldProps,
  SegmentedControlOption,
  SegmentedControlProps,
  SelectProps,
  SeparatorProps,
  SidebarButtonProps,
  SidebarContentProps,
  SidebarFooterProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
  SidebarHeaderProps,
  SidebarLinkProps,
  SidebarNavProps,
  SkeletonProps,
  SliderProps,
  SpinnerProps,
  StatDescriptionProps,
  StatLabelProps,
  StatProps,
  StatTrendProps,
  StatValueProps,
  StatusProps,
  StatusVariant,
  StepperOrientation,
  StepperProps,
  StepperStep,
  SwitchProps,
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
  TagInputProps,
  TabProps,
  TabsListProps,
  TabsPanelProps,
  TabsProps,
  TextareaProps,
  ThemeProps,
  TimelineItem,
  TimelineProps,
  TimelineStatus,
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
  TreeViewNode,
  TreeViewProps,
  TypographyProps,
  VisuallyHiddenProps,
  TimeFieldProps
} from '../../src';
import {
  AppShell,
  ActionRow,
  Autocomplete,
  AvatarGroup,
  AvatarGroupOverflow,
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Calendar,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CircularProgress,
  Carousel,
  CodeBlock,
  ColorField,
  Combobox,
  CommandMenu,
  Container,
  CopyButton,
  ContextMenuContent,
  DataList,
  DataTable,
  DateField,
  DatePicker,
  DialogContent,
  DrawerContent,
  Form,
  FileUpload,
  Grid,
  FieldContent,
  FieldGroup,
  FieldSeparator,
  FieldTitle,
  Input,
  InputGroup,
  InputGroupTextarea,
  IconButton,
  Item,
  ItemFooter,
  ItemHeader,
  ItemSeparator,
  Kbd,
  Link,
  Listbox,
  MenuContent,
  Menubar,
  MultiSelect,
  NavigationMenuContent,
  OTPField,
  PageHeader,
  PageSection,
  PasswordField,
  PreviewCardContent,
  Rating,
  ResizablePanels,
  ScrollArea,
  SearchField,
  SegmentedControl,
  Slider,
  Stat,
  Status,
  Stepper,
  Table,
  TagInput,
  Tabs,
  Timeline,
  ToastProvider,
  Toolbar,
  TooltipTrigger,
  TreeView,
  VisuallyHidden
} from '../../src';

type PublicProps =
  | AccordionHeaderProps
  | AccordionItemProps
  | AccordionPanelProps
  | AccordionProps
  | AccordionTriggerProps
  | ActionRowProps
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
  | AppShellFooterProps
  | AppShellHeaderProps
  | AppShellMainProps
  | AppShellProps
  | AppShellSidebarProps
  | AspectRatioProps
  | AvatarGroupOverflowProps
  | AvatarGroupProps
  | AvatarProps
  | AvatarShape
  | AvatarSize
  | BadgeProps
  | BreadcrumbCurrentProps
  | BreadcrumbItemProps
  | BreadcrumbLinkProps
  | BreadcrumbListProps
  | BreadcrumbProps
  | BreadcrumbSeparatorProps
  | ButtonProps
  | ButtonSize
  | ButtonVariant
  | ButtonGroupProps
  | ButtonGroupSeparatorProps
  | ButtonGroupTextProps
  | CalendarProps
  | CardActionProps
  | CardContentProps
  | CardDescriptionProps
  | CardFooterProps
  | CardHeaderProps
  | CardProps
  | CardTitleProps
  | CarouselProps
  | CheckboxProps
  | CheckboxGroupLegendProps
  | CheckboxGroupProps
  | CheckboxItemProps
  | CircularProgressProps
  | CollapsibleContentProps
  | CollapsibleProps
  | CollapsibleTriggerProps
  | CodeBlockProps
  | ColorFieldProps
  | ComboboxOption
  | ComboboxProps
  | CommandMenuOption
  | CommandMenuProps
  | ContainerProps
  | CopyButtonProps
  | CopyButtonStatus
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
  | DataTableColumn<unknown>
  | DataTableProps<unknown>
  | DataTableSort
  | DataTableSortDirection
  | DateFieldProps
  | DatePickerProps
  | DateTimeFieldProps
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
  | EmptyContentProps
  | EmptyHeaderProps
  | EmptyMediaProps
  | EmptyProps
  | EmptyTitleProps
  | FieldContentProps
  | FieldDescriptionProps
  | FieldErrorProps
  | FieldGroupProps
  | FieldLabelProps
  | FieldOrientation
  | FieldProps
  | FieldSeparatorProps
  | FieldTitleProps
  | FieldsetDescriptionProps
  | FieldsetLegendProps
  | FieldsetProps
  | FileUploadProps
  | FlexProps
  | FormActions
  | FormProps
  | FormValidationMode
  | GridItemProps
  | GridProps
  | IconButtonProps
  | IconProps
  | InputGroupAddonAlign
  | InputGroupAddonProps
  | InputGroupButtonProps
  | InputGroupInputProps
  | InputGroupProps
  | InputGroupTextProps
  | InputGroupTextareaProps
  | InputProps
  | ItemActionsProps
  | ItemButtonProps
  | ItemContentProps
  | ItemDescriptionProps
  | ItemFooterProps
  | ItemGroupProps
  | ItemHeaderProps
  | ItemLinkProps
  | ItemMediaProps
  | ItemProps
  | ItemSeparatorProps
  | ItemSize
  | ItemTitleProps
  | ItemVariant
  | KbdProps
  | LinkProps
  | ListboxOptionProps
  | ListboxProps
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
  | PageHeaderActionsProps
  | PageHeaderContentProps
  | PageHeaderDescriptionProps
  | PageHeaderProps
  | PageHeaderTitleProps
  | PageSectionActionsProps
  | PageSectionContentProps
  | PageSectionDescriptionProps
  | PageSectionHeaderProps
  | PageSectionHeadingProps
  | PageSectionProps
  | PageSectionTitleProps
  | PasswordFieldProps
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
  | RatingProps
  | ResizablePanelsOrientation
  | ResizablePanelsProps
  | ScrollAreaProps
  | SearchFieldProps
  | SegmentedControlOption
  | SegmentedControlProps
  | SelectProps
  | SeparatorProps
  | SidebarButtonProps
  | SidebarContentProps
  | SidebarFooterProps
  | SidebarGroupLabelProps
  | SidebarGroupProps
  | SidebarHeaderProps
  | SidebarLinkProps
  | SidebarNavProps
  | SkeletonProps
  | SliderProps
  | SpinnerProps
  | StatDescriptionProps
  | StatLabelProps
  | StatProps
  | StatTrendProps
  | StatValueProps
  | StatusProps
  | StatusVariant
  | StepperOrientation
  | StepperProps
  | StepperStep
  | SwitchProps
  | TableBodyProps
  | TableCaptionProps
  | TableCellProps
  | TableFooterProps
  | TableHeadProps
  | TableHeaderProps
  | TableProps
  | TableRowProps
  | TagInputProps
  | TabProps
  | TabsListProps
  | TabsPanelProps
  | TabsProps
  | TextareaProps
  | ThemeProps
  | TimelineItem
  | TimelineProps
  | TimelineStatus
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
  | TreeViewNode
  | TreeViewProps
  | TypographyProps
  | VisuallyHiddenProps
  | TimeFieldProps;

const publicProps = undefined as PublicProps | undefined;
void publicProps;

const closedStyleApi = () => (
  <>
    {/* @ts-expect-error application-shell layout remains internal */}
    <AppShell className="override" />
    {/* @ts-expect-error action-row layout remains internal */}
    <ActionRow style={{ justifyContent: 'start' }} />
    {/* @ts-expect-error page-header layout remains internal */}
    <PageHeader className="override" />
    {/* @ts-expect-error page-section layout remains internal */}
    <PageSection className="override" />
    {/* @ts-expect-error autocomplete styling remains internal */}
    <Autocomplete className="override" label="Search" options={[]} />
    {/* @ts-expect-error avatar-group layout remains internal */}
    <AvatarGroup className="override" />
    {/* @ts-expect-error avatar overflow presentation remains internal */}
    <AvatarGroupOverflow count={2} style={{ margin: 0 }} />
    {/* @ts-expect-error consumers cannot override component classes */}
    <Button className="override">Button</Button>
    {/* @ts-expect-error grouped-action presentation remains internal */}
    <ButtonGroup className="override" />
    {/* @ts-expect-error grouped-action separator presentation remains internal */}
    <ButtonGroupSeparator className="override" />
    {/* @ts-expect-error grouped-action text presentation remains internal */}
    <ButtonGroupText style={{ padding: 0 }}>View</ButtonGroupText>
    {/* @ts-expect-error calendar presentation remains internal */}
    <Calendar className="override" />
    {/* @ts-expect-error circular progress presentation remains internal */}
    <CircularProgress className="override" />
    {/* @ts-expect-error date-picker presentation remains internal */}
    <DatePicker className="override" label="Release date" />
    {/* @ts-expect-error consumers cannot override component styles */}
    <Card style={{ padding: 0 }}>Card</Card>
    {/* @ts-expect-error card header layout remains internal */}
    <CardHeader className="override" />
    {/* @ts-expect-error card title presentation remains internal */}
    <CardTitle style={{ margin: 1 }}>Title</CardTitle>
    {/* @ts-expect-error card description presentation remains internal */}
    <CardDescription className="override">Description</CardDescription>
    {/* @ts-expect-error card action layout remains internal */}
    <CardAction style={{ display: 'none' }} />
    {/* @ts-expect-error card content layout remains internal */}
    <CardContent className="override" />
    {/* @ts-expect-error card footer layout remains internal */}
    <CardFooter style={{ gap: 0 }} />
    {/* @ts-expect-error copy feedback presentation remains internal */}
    <CopyButton className="override" value="text" />
    {/* @ts-expect-error carousel layout remains internal */}
    <Carousel className="override">Slide</Carousel>
    {/* @ts-expect-error consumers cannot override input classes */}
    <Input className="override" />
    {/* @ts-expect-error grouped-input presentation remains internal */}
    <InputGroup className="override" />
    {/* @ts-expect-error field-group layout remains internal */}
    <FieldGroup className="override" />
    {/* @ts-expect-error field-content layout remains internal */}
    <FieldContent style={{ gap: 0 }} />
    {/* @ts-expect-error field-title presentation remains internal */}
    <FieldTitle className="override">Title</FieldTitle>
    {/* @ts-expect-error field-separator presentation remains internal */}
    <FieldSeparator style={{ margin: 0 }}>Or</FieldSeparator>
    {/* @ts-expect-error grouped-textarea presentation remains internal */}
    <InputGroupTextarea className="override" />
    {/* @ts-expect-error icon-button sizing remains an explicit semantic API */}
    <IconButton className="override" label="Action">
      !
    </IconButton>
    {/* @ts-expect-error item presentation remains internal */}
    <Item className="override" />
    {/* @ts-expect-error item header layout remains internal */}
    <ItemHeader style={{ display: 'none' }} />
    {/* @ts-expect-error item footer layout remains internal */}
    <ItemFooter className="override" />
    {/* @ts-expect-error item separator presentation remains internal */}
    <ItemSeparator style={{ margin: 0 }} />
    {/* @ts-expect-error code presentation remains internal */}
    <CodeBlock className="override" code="const value = true;" />
    {/* @ts-expect-error color field presentation remains internal */}
    <ColorField className="override" label="Color" />
    {/* @ts-expect-error password field presentation remains internal */}
    <PasswordField className="override" label="Password" />
    {/* @ts-expect-error search field presentation remains internal */}
    <SearchField style={{ width: 100 }} label="Search" />
    {/* @ts-expect-error segmented-control presentation remains internal */}
    <SegmentedControl className="override" label="View" options={[]} />
    {/* @ts-expect-error keyboard-token presentation remains internal */}
    <Kbd className="override">K</Kbd>
    {/* @ts-expect-error form layout remains a semantic API */}
    <Form className="override" />
    {/* @ts-expect-error file upload presentation remains internal */}
    <FileUpload className="override" label="Files" />
    {/* @ts-expect-error consumers cannot override link styles */}
    <Link href="#" style={{ color: 'red' }}>
      Link
    </Link>
    {/* @ts-expect-error listbox presentation remains internal */}
    <Listbox className="override" label="Components" />
    {/* @ts-expect-error grid layout remains an explicit semantic API */}
    <Grid style={{ display: 'block' }} />
    {/* @ts-expect-error container sizing remains an explicit semantic API */}
    <Container className="override" />
    {/* @ts-expect-error structured data presentation remains internal */}
    <DataList style={{ display: 'block' }} />
    {/* @ts-expect-error data table presentation remains internal */}
    <DataTable className="override" columns={[]} getRowId={() => ''} label="Rows" rows={[]} />
    {/* @ts-expect-error native date field styles remain internal */}
    <DateField className="override" label="Date" />
    {/* @ts-expect-error rating presentation remains internal */}
    <Rating style={{ gap: 0 }} label="Rating" />
    {/* @ts-expect-error Base UI styling hooks remain internal */}
    <Slider className="override" label="Volume" />
    {/* @ts-expect-error Base UI render hooks remain internal */}
    <Tabs render={<section />} />
    {/* @ts-expect-error Base UI classes remain internal */}
    <Toolbar className="override" />
    {/* @ts-expect-error combobox styling remains internal */}
    <Combobox className="override" label="Fruit" options={[]} />
    {/* @ts-expect-error command menu presentation remains internal */}
    <CommandMenu className="override" onSelect={() => undefined} options={[]} trigger="Open" />
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
    {/* @ts-expect-error stat presentation remains internal */}
    <Stat className="override" />
    {/* @ts-expect-error status presentation remains internal */}
    <Status className="override">Ready</Status>
    {/* @ts-expect-error resizable panel layout remains internal */}
    <ResizablePanels className="override" first="One" second="Two" />
    {/* @ts-expect-error native table styles remain closed */}
    <Table style={{ border: 0 }} />
    {/* @ts-expect-error tree layout remains internal */}
    <TreeView className="override" label="Tree" nodes={[]} />
    {/* @ts-expect-error stepper presentation remains internal */}
    <Stepper className="override" label="Steps" steps={[]} />
    {/* @ts-expect-error timeline presentation remains internal */}
    <Timeline style={{ display: 'block' }} items={[]} />
    {/* @ts-expect-error tag input presentation remains internal */}
    <TagInput className="override" label="Tags" />
    {/* @ts-expect-error toast presentation is provider-owned */}
    <ToastProvider className="override">Content</ToastProvider>
    {/* @ts-expect-error visually hidden behavior remains internal */}
    <VisuallyHidden style={{ position: 'static' }}>Label</VisuallyHidden>
  </>
);
void closedStyleApi;
