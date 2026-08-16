import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Button,
  Card,
  Field,
  FieldDescription,
  FieldLabel,
  Flex,
  Input,
  MailIcon,
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
            <Typography variant="h1">Consumer build</Typography>
            <Field>
              <FieldLabel htmlFor="consumer-email">Email</FieldLabel>
              <Input fullWidth id="consumer-email" type="email" />
              <FieldDescription>Built through the published package exports.</FieldDescription>
            </Field>
            <Button type="button">
              <MailIcon />
              Continue
            </Button>
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
