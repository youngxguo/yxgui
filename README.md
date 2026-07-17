# yxgui

An opinionated React component system built with StyleX.

The foundation currently includes one Button, semantic themes, and a small public
token set. Create a theme with typed semantic values and apply it to any element
subtree with `ThemeProvider`:

```tsx
import { Button, createTheme, ThemeProvider } from 'yxgui';
import 'yxgui/styles.css';

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
      <Button>Save changes</Button>
    </ThemeProvider>
  );
}
```

Unspecified values inherit yxgui's defaults. `lightTheme` and `darkTheme` are also
available as complete built-in themes. Theme values become stable `--yxg-*` CSS
custom properties on the provider element, so nested providers and application CSS
can customize the same semantic contract. Applications own their global reset; the
yxgui stylesheet contains only its compiled component and token CSS.
