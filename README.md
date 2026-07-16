# yxgui

An opinionated React component system with typed semantic themes.

Create a theme with semantic values and apply it to any element subtree with
`ThemeProvider`:

```tsx
import { createTheme, ThemeProvider } from 'yxgui';

const theme = createTheme({
  color: {
    accent: '#006adc',
    accentHover: '#0059c1',
    onAccent: '#ffffff'
  },
  control: {
    radius: '999px'
  }
});

export function Example() {
  return (
    <ThemeProvider theme={theme}>
      <main>Application content</main>
    </ThemeProvider>
  );
}
```

Unspecified values inherit yxgui's defaults. `lightTheme` and `darkTheme` are also
available as complete built-in themes. Theme values become stable `--yxg-*` CSS
custom properties on the provider element, so nested providers and application CSS
can customize the same semantic contract.
