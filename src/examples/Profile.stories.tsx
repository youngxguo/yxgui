import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { Field, FieldDescription, FieldLabel } from '../components/Field';
import { Flex } from '../components/Flex';
import { GitHubIcon, LinkedInIcon, MailIcon } from '../components/Icon';
import { Input } from '../components/Input';
import { Link } from '../components/Link';
import { Textarea } from '../components/Textarea';
import { Typography } from '../components/Typography';

const styles = stylex.create({
  page: {
    marginInline: 'auto',
    maxWidth: '440px',
    width: '100%'
  }
});

const meta = {
  title: 'Examples/Profile'
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contact: Story = {
  render: () => (
    <main {...stylex.props(styles.page)}>
      <Card>
        <Flex direction="column" gap="lg">
          <Flex direction="column" gap="sm">
            <Typography variant="h1">Young Guo</Typography>
            <Typography color="muted">Engineer building thoughtful product interfaces.</Typography>
          </Flex>

          <Flex gap="lg" wrap>
            <Link href="https://github.com/youngxguo">
              <GitHubIcon />
              GitHub
            </Link>
            <Link href="https://www.linkedin.com/">
              <LinkedInIcon />
              LinkedIn
            </Link>
          </Flex>

          <form>
            <Flex direction="column" gap="lg">
              <Field>
                <FieldLabel htmlFor="profile-email">Email</FieldLabel>
                <Input
                  fullWidth
                  id="profile-email"
                  name="email"
                  placeholder="you@example.com"
                  type="email"
                />
                <FieldDescription>I will only use this to reply.</FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="profile-message">Message</FieldLabel>
                <Textarea
                  fullWidth
                  id="profile-message"
                  name="message"
                  placeholder="What would you like to build?"
                  rows={4}
                />
              </Field>

              <FieldLabel>
                <Flex align="center" gap="md">
                  <Checkbox name="updates" />
                  Send me occasional project updates
                </Flex>
              </FieldLabel>

              <Button type="submit">
                <MailIcon />
                Send message
              </Button>
            </Flex>
          </form>
        </Flex>
      </Card>
    </main>
  )
};
