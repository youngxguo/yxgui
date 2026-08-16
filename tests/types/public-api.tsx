import type {
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionPanelProps,
  AccordionProps,
  AccordionTriggerProps,
  AlertDescriptionProps,
  AlertProps,
  AlertTitleProps,
  AspectRatioProps,
  AvatarProps,
  BadgeProps,
  ButtonProps,
  CardProps,
  CheckboxProps,
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
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
  MeterProps,
  NumberFieldInputProps,
  NumberFieldProps,
  ProgressProps,
  RadioGroupLegendProps,
  RadioGroupProps,
  RadioProps,
  SelectProps,
  SeparatorProps,
  SkeletonProps,
  SliderProps,
  SpinnerProps,
  SwitchProps,
  TabProps,
  TabsListProps,
  TabsPanelProps,
  TabsProps,
  TextareaProps,
  ThemeProps,
  ToggleProps,
  ToggleGroupProps,
  TypographyProps
} from '../../src';
import { Button, Card, Input, Link, Slider, Tabs } from '../../src';

type PublicProps =
  | AccordionHeaderProps
  | AccordionItemProps
  | AccordionPanelProps
  | AccordionProps
  | AccordionTriggerProps
  | AlertDescriptionProps
  | AlertProps
  | AlertTitleProps
  | AspectRatioProps
  | AvatarProps
  | BadgeProps
  | ButtonProps
  | CardProps
  | CheckboxProps
  | CollapsibleContentProps
  | CollapsibleProps
  | CollapsibleTriggerProps
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
  | MeterProps
  | NumberFieldInputProps
  | NumberFieldProps
  | ProgressProps
  | RadioGroupLegendProps
  | RadioGroupProps
  | RadioProps
  | SelectProps
  | SeparatorProps
  | SkeletonProps
  | SliderProps
  | SpinnerProps
  | SwitchProps
  | TabProps
  | TabsListProps
  | TabsPanelProps
  | TabsProps
  | TextareaProps
  | ThemeProps
  | ToggleProps
  | ToggleGroupProps
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
  </>
);
void closedStyleApi;
