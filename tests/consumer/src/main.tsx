import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Autocomplete,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  Card,
  Carousel,
  CheckboxGroup,
  CheckboxGroupLegend,
  CheckboxItem,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ColorField,
  Combobox,
  CommandMenu,
  Container,
  CopyButton,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  DataList,
  DataListDescription,
  DataListItem,
  DataListTerm,
  DataTable,
  DateField,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  Empty,
  EmptyDescription,
  EmptyTitle,
  Field,
  FieldDescription,
  FieldLabel,
  FileUpload,
  Flex,
  Form,
  Grid,
  GridItem,
  Fieldset,
  FieldsetLegend,
  Input,
  Kbd,
  MailIcon,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Menubar,
  Meter,
  MultiSelect,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NumberField,
  OTPField,
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PasswordField,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  PreviewCard,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardTitle,
  PreviewCardTrigger,
  Radio,
  RadioGroup,
  RadioGroupLegend,
  Rating,
  ResizablePanels,
  ScrollArea,
  SearchField,
  Separator,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Stepper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TagInput,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
  Theme,
  Timeline,
  Toggle,
  ToggleGroup,
  ToastProvider,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TreeView,
  Typography,
  VisuallyHidden,
  useToast
} from 'yxgui';
import 'yxgui/styles.css';

function ConsumerToastButton() {
  const toast = useToast();
  return (
    <Button
      type="button"
      onClick={() =>
        toast.add({
          description: 'The packaged notification manager is working.',
          title: 'Consumer toast',
          variant: 'success'
        })
      }
    >
      Show toast
    </Button>
  );
}

function ConsumerApp() {
  return (
    <Theme>
      <Flex align="center" justify="center" minHeight="viewport" padding="lg">
        <Card>
          <Flex direction="column" gap="lg">
            <Flex align="center" gap="md">
              <Avatar alt="Consumer build" />
              <Typography variant="h1">Consumer build</Typography>
              <Badge variant="success">Ready</Badge>
              <Kbd>⌘K</Kbd>
            </Flex>
            <Alert>
              <AlertTitle>Package exports loaded</AlertTitle>
              <AlertDescription>This renders from the built yxgui package.</AlertDescription>
            </Alert>
            <Separator />
            <Grid columns={2} gap="md">
              <GridItem>Packaged grid item</GridItem>
              <GridItem>Second grid item</GridItem>
            </Grid>
            <Container padding="none" size="sm">
              <DataList>
                <DataListItem>
                  <DataListTerm>Package</DataListTerm>
                  <DataListDescription>yxgui</DataListDescription>
                </DataListItem>
              </DataList>
            </Container>
            <Carousel aria-label="Consumer carousel">
              <Card>
                <Typography>First packaged slide</Typography>
              </Card>
              <Card>
                <Typography>Second packaged slide</Typography>
              </Card>
            </Carousel>
            <Autocomplete
              label="Consumer search"
              options={[
                { label: 'Accordion', value: 'accordion' },
                { label: 'Alert', value: 'alert' }
              ]}
            />
            <SearchField defaultValue="dialog" label="Consumer search field" />
            <PasswordField defaultValue="consumer secret" label="Consumer password" />
            <ColorField defaultValue="#2563eb" label="Consumer color" name="color" />
            <CopyButton value="pnpm add yxgui" />
            <Stepper
              defaultStep={1}
              label="Consumer setup"
              steps={[
                { id: 'details', label: 'Details' },
                { id: 'review', label: 'Review' },
                { id: 'publish', label: 'Publish' }
              ]}
            />
            <Timeline
              items={[
                { id: 'installed', status: 'complete', title: 'Package installed' },
                { id: 'rendered', status: 'current', title: 'Consumer rendered' }
              ]}
              label="Consumer activity"
            />
            <MultiSelect
              defaultValue={['react']}
              label="Consumer technologies"
              options={[
                { label: 'React', value: 'react' },
                { label: 'StyleX', value: 'stylex' }
              ]}
            />
            <TagInput defaultValue={['consumer']} label="Consumer tags" name="tags" />
            <DateField defaultValue="2026-08-16" label="Consumer date" name="date" />
            <FileUpload label="Consumer files" name="files" />
            <TreeView
              defaultExpandedIds={['components']}
              label="Consumer tree"
              nodes={[
                {
                  children: [{ id: 'button', label: 'Button' }],
                  id: 'components',
                  label: 'Components'
                }
              ]}
            />
            <DataTable
              columns={[
                {
                  cell: (row) => row.name,
                  header: 'Name',
                  id: 'name',
                  sortValue: (row) => row.name
                }
              ]}
              getRowId={(row) => row.id}
              label="Consumer data"
              rows={[{ id: 'yxgui', name: 'yxgui' }]}
            />
            <ResizablePanels first="Consumer navigation" second="Consumer workspace" />
            <Button type="button">
              ?<VisuallyHidden>Consumer help</VisuallyHidden>
            </Button>
            <CommandMenu
              onSelect={() => undefined}
              options={[
                { id: 'search', label: 'Search components' },
                { id: 'theme', label: 'Switch theme' }
              ]}
              trigger="Open consumer commands"
            />
            <Form errors={{ packageName: 'Use a scoped package name.' }}>
              <Field name="packageName">
                <FieldLabel>Package name</FieldLabel>
                <Input defaultValue="yxgui" fullWidth />
              </Field>
            </Form>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#home">Home</BreadcrumbLink>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbCurrent>Consumer</BreadcrumbCurrent>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <NavigationMenu aria-label="Consumer navigation">
              <NavigationMenuList>
                <NavigationMenuItem value="library">
                  <NavigationMenuTrigger>Library</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink href="#components">Components</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Field>
              <FieldLabel htmlFor="consumer-email">Email</FieldLabel>
              <Input fullWidth id="consumer-email" type="email" />
              <FieldDescription>Built through the published package exports.</FieldDescription>
            </Field>
            <Fieldset>
              <FieldsetLegend>Workspace</FieldsetLegend>
              <Select aria-label="Workspace" fullWidth>
                <option>Personal</option>
              </Select>
            </Fieldset>
            <Combobox
              label="Region"
              options={[
                { label: 'North America', value: 'na' },
                { label: 'Europe', value: 'eu' }
              ]}
            />
            <OTPField label="Verification code" length={4} />
            <RadioGroup>
              <RadioGroupLegend>Plan</RadioGroupLegend>
              <Radio defaultChecked label="Personal" name="consumer-plan" />
            </RadioGroup>
            <Rating defaultValue={4} label="Consumer rating" name="consumer-rating" />
            <CheckboxGroup>
              <CheckboxGroupLegend>Updates</CheckboxGroupLegend>
              <CheckboxItem label="Product" name="consumer-updates" />
            </CheckboxGroup>
            <Button type="button">
              <MailIcon />
              Continue
            </Button>
            <Progress aria-label="Consumer verification" value={100} />
            <Meter aria-label="Storage" fullWidth max={100} value={64} />
            <Slider defaultValue={64} label="Storage target" />
            <NumberField defaultValue={2} label="Seats" min={1} />
            <Flex align="center" gap="md">
              <Switch aria-label="Consumer switch" />
              <Toggle>Bold</Toggle>
              <Spinner label="Verifying" size="sm" />
              <Skeleton width="sm" />
            </Flex>
            <ToggleGroup aria-label="Alignment" defaultValue={['left']}>
              <Toggle value="left">Left</Toggle>
              <Toggle value="right">Right</Toggle>
            </ToggleGroup>
            <Toolbar aria-label="Consumer actions">
              <ToolbarButton>Undo</ToolbarButton>
              <ToolbarSeparator />
              <ToolbarButton>Redo</ToolbarButton>
            </Toolbar>
            <Dialog>
              <DialogTrigger>Open dialog</DialogTrigger>
              <DialogContent>
                <DialogTitle>Consumer dialog</DialogTitle>
                <DialogDescription>Portal behavior loaded through yxgui.</DialogDescription>
                <DialogClose>Close</DialogClose>
              </DialogContent>
            </Dialog>
            <Drawer>
              <DrawerTrigger>Open drawer</DrawerTrigger>
              <DrawerContent>
                <DrawerTitle>Consumer drawer</DrawerTitle>
                <DrawerDescription>Swipe behavior loaded through yxgui.</DrawerDescription>
                <DrawerClose>Close</DrawerClose>
              </DrawerContent>
            </Drawer>
            <AlertDialog>
              <AlertDialogTrigger>Reset consumer</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Reset consumer?</AlertDialogTitle>
                <AlertDialogDescription>This verifies alert dialog exports.</AlertDialogDescription>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Reset</AlertDialogAction>
              </AlertDialogContent>
            </AlertDialog>
            <Popover>
              <PopoverTrigger>Consumer details</PopoverTrigger>
              <PopoverContent>
                <PopoverTitle>Package popover</PopoverTitle>
                <PopoverDescription>Positioning loaded through yxgui.</PopoverDescription>
                <PopoverClose>Done</PopoverClose>
              </PopoverContent>
            </Popover>
            <PreviewCard>
              <PreviewCardTrigger delay={0} href="#consumer-preview">
                Preview consumer
              </PreviewCardTrigger>
              <PreviewCardContent>
                <PreviewCardTitle>Consumer preview</PreviewCardTitle>
                <PreviewCardDescription>
                  Hover behavior loaded through yxgui.
                </PreviewCardDescription>
              </PreviewCardContent>
            </PreviewCard>
            <TooltipProvider delay={0}>
              <Tooltip>
                <TooltipTrigger aria-label="Consumer tooltip">Info</TooltipTrigger>
                <TooltipContent>Consumer tooltip</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Menu>
              <MenuTrigger>Consumer menu</MenuTrigger>
              <MenuContent>
                <MenuItem>Duplicate</MenuItem>
              </MenuContent>
            </Menu>
            <Menubar aria-label="Consumer menubar">
              <Menu>
                <MenuTrigger variant="menubar">File</MenuTrigger>
                <MenuContent>
                  <MenuItem>New</MenuItem>
                </MenuContent>
              </Menu>
              <Menu>
                <MenuTrigger variant="menubar">Edit</MenuTrigger>
                <MenuContent>
                  <MenuItem>Undo</MenuItem>
                </MenuContent>
              </Menu>
            </Menubar>
            <ToastProvider>
              <ConsumerToastButton />
            </ToastProvider>
            <ContextMenu>
              <ContextMenuTrigger>Right click for consumer actions</ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Open</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            <ScrollArea aria-label="Consumer activity" size="sm">
              <Typography>First packaged update</Typography>
              <Typography>Second packaged update</Typography>
              <Typography>Third packaged update</Typography>
            </ScrollArea>
            <Table aria-label="Consumer workspaces">
              <TableHeader>
                <TableRow>
                  <TableHead>Workspace</TableHead>
                  <TableHead numeric>Members</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Personal</TableCell>
                  <TableCell numeric>1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Collapsible>
              <CollapsibleTrigger>Details</CollapsibleTrigger>
              <CollapsibleContent>Native disclosure behavior loaded.</CollapsibleContent>
            </Collapsible>
            <Accordion defaultValue={['details']}>
              <AccordionItem value="details">
                <AccordionHeader>
                  <AccordionTrigger>Package details</AccordionTrigger>
                </AccordionHeader>
                <AccordionPanel>Base behavior loaded through yxgui.</AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Tabs defaultValue="one">
              <TabsList aria-label="Consumer tabs">
                <Tab value="one">One</Tab>
                <Tab value="two">Two</Tab>
              </TabsList>
              <TabsPanel value="one">First panel.</TabsPanel>
              <TabsPanel value="two">Second panel.</TabsPanel>
            </Tabs>
            <Pagination>
              <PaginationList>
                <PaginationItem>
                  <PaginationLink current href="#1">
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#2">2</PaginationLink>
                </PaginationItem>
              </PaginationList>
            </Pagination>
            <Empty>
              <EmptyTitle>No more checks</EmptyTitle>
              <EmptyDescription>The consumer surface compiled successfully.</EmptyDescription>
            </Empty>
          </Flex>
        </Card>
      </Flex>
    </Theme>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConsumerApp />
  </StrictMode>
);
