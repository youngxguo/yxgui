import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import {
  Button,
  Card,
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Flex,
  GitHubIcon,
  Input,
  Link,
  MailIcon,
  Textarea,
  Theme,
  Typography
} from './index';

describe('public component contracts', () => {
  it('composes a native, accessible form surface', () => {
    const html = renderToStaticMarkup(
      <Theme mode="dark">
        <Card>
          <Flex direction="column" gap="md">
            <Typography variant="h1">Contact</Typography>
            <Link href="mailto:hello@example.com">
              <MailIcon />
              Email
            </Link>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                aria-describedby="email-help"
                aria-invalid="true"
                id="email"
                name="email"
                type="email"
              />
              <FieldDescription id="email-help">Used only for replies.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea id="message" name="message" />
              <FieldError id="message-error">A message is required.</FieldError>
            </Field>
            <FieldLabel>
              <Checkbox name="updates" /> Updates
            </FieldLabel>
            <Button type="submit">Send</Button>
          </Flex>
        </Card>
      </Theme>
    );

    expect(html).toContain('<h1');
    expect(html).toContain('href="mailto:hello@example.com"');
    expect(html).toContain('for="email"');
    expect(html).toContain('aria-describedby="email-help"');
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain('role="alert"');
    expect(html).toContain('type="checkbox"');
    expect(html).toContain('type="submit"');
  });

  it('gives icons decorative semantics unless a label is provided', () => {
    const decorative = renderToStaticMarkup(<GitHubIcon />);
    const labelled = renderToStaticMarkup(<GitHubIcon label="GitHub" />);

    expect(decorative).toContain('aria-hidden="true"');
    expect(decorative).not.toContain('role="img"');
    expect(labelled).toContain('aria-label="GitHub"');
    expect(labelled).toContain('role="img"');
  });
});
