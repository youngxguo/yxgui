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
  AlertTitle,
  Avatar,
  Badge,
  Button,
  Card,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
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
  Meter,
  NumberField,
  Progress,
  Radio,
  RadioGroup,
  RadioGroupLegend,
  Separator,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
  Theme,
  Toggle,
  ToggleGroup,
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
