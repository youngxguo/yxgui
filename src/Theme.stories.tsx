import type { ArgTypes, Decorator, Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { useArgs, useEffect, useGlobals, useRef } from 'storybook/preview-api';
import { Button } from './Button';
import { darkTheme, defaultTheme, ThemeProvider, type Theme } from './theme';

type EditorValue = string | number;
type ThemeEditorArgs = Record<string, EditorValue>;

type ThemeEntry = {
  key: string;
  path: string[];
  value: EditorValue;
};

const editorKey = (path: string[]) => path.join('__');

function flattenTheme(value: unknown, path: string[] = []): ThemeEntry[] {
  if (typeof value === 'string' || typeof value === 'number') {
    return [{ key: editorKey(path), path, value }];
  }

  return Object.entries(value as Record<string, unknown>).flatMap(([name, child]) =>
    flattenTheme(child, [...path, name])
  );
}

function themeToEditorArgs(theme: Theme): ThemeEditorArgs {
  return Object.fromEntries(flattenTheme(theme).map(({ key, value }) => [key, value]));
}

function editorArgsToTheme(args: ThemeEditorArgs): Theme {
  function resolve(template: unknown, path: string[] = []): unknown {
    if (typeof template === 'string' || typeof template === 'number') {
      return args[editorKey(path)] ?? template;
    }

    return Object.fromEntries(
      Object.entries(template as Record<string, unknown>).map(([name, child]) => [
        name,
        resolve(child, [...path, name])
      ])
    );
  }

  return resolve(defaultTheme) as Theme;
}

const defaultThemeValues = themeToEditorArgs(defaultTheme);
const darkThemeValues = themeToEditorArgs(darkTheme);
const themeEntries = flattenTheme(defaultTheme);

const SyncEditorWithTheme: Decorator<ThemeEditorArgs> = (Story) => {
  const [globals] = useGlobals();
  const [, updateArgs] = useArgs<ThemeEditorArgs>();
  const previousThemeRef = useRef<string | undefined>(undefined);
  const theme = globals.theme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    if (previousThemeRef.current === theme) return;

    previousThemeRef.current = theme;
    updateArgs(theme === 'dark' ? darkThemeValues : defaultThemeValues);
  }, [theme, updateArgs]);

  return <Story />;
};

const token = (name: string) => `var(--yxg-${name})`;

const styles = {
  canvas: {
    background: token('color-background-canvas'),
    color: token('color-foreground-default'),
    fontFamily: token('font-body-family'),
    fontSize: token('font-body-size'),
    lineHeight: token('font-body-line-height'),
    minHeight: '100vh',
    padding: '1.5rem'
  },
  preview: {
    background: token('color-background-surface'),
    border: `1px solid ${token('color-border-default')}`,
    borderRadius: token('radius-container'),
    boxShadow: '0 1px 3px rgb(0 0 0 / 0.08)',
    maxWidth: '42rem',
    overflow: 'hidden'
  },
  header: {
    borderBottom: `1px solid ${token('color-border-default')}`,
    padding: '1.5rem'
  },
  heading: {
    fontFamily: token('font-heading-family'),
    fontSize: token('font-heading-size'),
    fontWeight: token('font-heading-weight'),
    letterSpacing: token('font-heading-letter-spacing'),
    lineHeight: token('font-heading-line-height'),
    margin: 0
  },
  muted: {
    color: token('color-foreground-muted'),
    fontFamily: token('font-body-small-family'),
    fontSize: token('font-body-small-size'),
    lineHeight: token('font-body-small-line-height'),
    marginBottom: 0
  },
  content: {
    display: 'grid',
    gap: '1rem',
    padding: '1.5rem'
  },
  card: {
    background: token('color-background-raised'),
    border: `1px solid ${token('color-border-default')}`,
    borderRadius: token('radius-control'),
    padding: '1rem'
  },
  fieldLabel: {
    display: 'block',
    fontFamily: token('font-label-family'),
    fontSize: token('font-label-size'),
    fontWeight: token('font-label-weight'),
    letterSpacing: token('font-label-letter-spacing'),
    lineHeight: token('font-label-line-height'),
    marginBottom: '0.5rem'
  },
  input: {
    background: token('color-background-surface'),
    border: `1px solid ${token('color-border-strong')}`,
    borderRadius: token('radius-control'),
    boxSizing: 'border-box',
    color: token('color-foreground-default'),
    font: 'inherit',
    height: token('control-height'),
    outlineColor: token('color-focus-ring'),
    paddingInline: token('control-padding-inline'),
    width: '100%'
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: token('control-gap'),
    marginTop: '1rem'
  },
  status: {
    background: token('color-danger-subtle'),
    border: `1px solid ${token('color-danger-border')}`,
    borderRadius: token('radius-full'),
    color: token('color-danger-foreground'),
    display: 'inline-block',
    fontFamily: token('font-label-family'),
    fontSize: token('font-label-size'),
    fontWeight: token('font-label-weight'),
    padding: '0.125rem 0.625rem'
  },
  code: {
    background: token('color-background-subtle'),
    borderRadius: token('radius-control'),
    color: token('color-accent-foreground'),
    fontFamily: token('font-code-family'),
    fontSize: token('font-code-size'),
    fontWeight: token('font-code-weight'),
    letterSpacing: token('font-code-letter-spacing'),
    lineHeight: token('font-code-line-height'),
    padding: '0.125rem 0.375rem'
  }
} satisfies Record<string, CSSProperties>;

function ThemeEditor(args: ThemeEditorArgs) {
  return (
    <ThemeProvider theme={editorArgsToTheme(args)} style={styles.canvas}>
      <main style={styles.preview}>
        <header style={styles.header}>
          <h1 style={styles.heading}>Theme tokens</h1>
          <p style={styles.muted}>Edit any semantic value in Controls and inspect it here.</p>
        </header>
        <div style={styles.content}>
          <section style={styles.card}>
            <label style={styles.fieldLabel} htmlFor="theme-preview-name">
              Display name
            </label>
            <input defaultValue="Young" id="theme-preview-name" style={styles.input} type="text" />
            <div style={styles.actions}>
              <Button>Save changes</Button>
              <Button disabled>Disabled</Button>
            </div>
          </section>
          <section style={styles.card}>
            <span style={styles.status}>Needs attention</span>
            <p style={styles.muted}>
              Semantic values also style application content such as{' '}
              <code style={styles.code}>code</code>.
            </p>
          </section>
        </div>
      </main>
    </ThemeProvider>
  );
}

const argTypes = Object.fromEntries(
  themeEntries.map(({ key, path, value }) => [
    key,
    {
      name: path.slice(1).join('.'),
      control: path[0] === 'color' ? 'color' : typeof value === 'number' ? 'number' : 'text',
      description: path.join('.'),
      table: {
        category: path[0][0].toUpperCase() + path[0].slice(1)
      }
    }
  ])
) as ArgTypes<ThemeEditorArgs>;

const meta = {
  title: 'Foundations/Theme tokens',
  component: ThemeEditor,
  args: defaultThemeValues,
  argTypes,
  parameters: {
    layout: 'fullscreen',
    controls: {
      expanded: true
    },
    docs: {
      description: {
        component:
          'An editing surface for every semantic theme property. Use the Storybook toolbar to switch the complete light and dark presets.'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof ThemeEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Editor: Story = {
  decorators: [SyncEditorWithTheme]
};
