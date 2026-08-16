import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  Badge,
  Button,
  Card,
  Field,
  FieldDescription,
  FieldLabel,
  Flex,
  Input,
  MailIcon,
  Progress,
  Separator,
  Skeleton,
  Spinner,
  Switch,
  Theme,
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
            <Button type="button">
              <MailIcon />
              Continue
            </Button>
            <Progress aria-label="Consumer verification" value={100} />
            <Flex align="center" gap="md">
              <Switch aria-label="Consumer switch" />
              <Spinner label="Verifying" size="sm" />
              <Skeleton width="sm" />
            </Flex>
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
