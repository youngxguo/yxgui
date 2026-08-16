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
  FieldDescriptionProps,
  FieldErrorProps,
  FieldLabelProps,
  FieldProps,
  FlexProps,
  IconProps,
  InputProps,
  LinkProps,
  ProgressProps,
  SeparatorProps,
  SkeletonProps,
  SpinnerProps,
  SwitchProps,
  TextareaProps,
  ThemeProps,
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
  | FieldDescriptionProps
  | FieldErrorProps
  | FieldLabelProps
  | FieldProps
  | FlexProps
  | IconProps
  | InputProps
  | LinkProps
  | ProgressProps
  | SeparatorProps
  | SkeletonProps
  | SpinnerProps
  | SwitchProps
  | TextareaProps
  | ThemeProps
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
