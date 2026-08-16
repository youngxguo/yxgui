import type {
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
  ProgressProps,
  RadioGroupLegendProps,
  RadioGroupProps,
  RadioProps,
  SelectProps,
  SeparatorProps,
  SkeletonProps,
  SpinnerProps,
  SwitchProps,
  TextareaProps,
  ThemeProps,
  ToggleProps,
  TypographyProps
} from '../../src';
import { Button, Card, Input, Link } from '../../src';

type PublicProps =
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
  | ProgressProps
  | RadioGroupLegendProps
  | RadioGroupProps
  | RadioProps
  | SelectProps
  | SeparatorProps
  | SkeletonProps
  | SpinnerProps
  | SwitchProps
  | TextareaProps
  | ThemeProps
  | ToggleProps
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
  </>
);
void closedStyleApi;
