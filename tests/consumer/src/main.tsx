import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
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
  CheckboxGroup,
  CheckboxGroupLegend,
  CheckboxItem,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Empty,
  EmptyDescription,
  EmptyTitle,
  Field,
  FieldDescription,
  FieldLabel,
  Flex,
  Fieldset,
  FieldsetLegend,
  Input,
  MailIcon,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Meter,
  NumberField,
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  Radio,
  RadioGroup,
  RadioGroupLegend,
  ScrollArea,
  Separator,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
  Theme,
  Toggle,
  ToggleGroup,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Typography
} from 'yxgui';
import 'yxgui/styles.css';

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
            </Flex>
            <Alert>
              <AlertTitle>Package exports loaded</AlertTitle>
              <AlertDescription>This renders from the built yxgui package.</AlertDescription>
            </Alert>
            <Separator />
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
            <RadioGroup>
              <RadioGroupLegend>Plan</RadioGroupLegend>
              <Radio defaultChecked label="Personal" name="consumer-plan" />
            </RadioGroup>
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
