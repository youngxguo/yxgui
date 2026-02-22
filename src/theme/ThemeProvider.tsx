import { useContext, useEffect, useMemo, type ReactNode } from 'react';
import { createTheme } from './createTheme';
import { ThemeContext, ThemeRootContext } from './context';
import { themeToCSSVariables } from './cssVariables';
import type { Theme, ThemeOptions } from './types';

export interface ThemeProviderProps {
  children: ReactNode;
  theme?: Theme | ThemeOptions;
}

function applyThemeVariables(theme: Theme): () => void {
  if (typeof document === 'undefined') {
    return () => undefined;
  }

  const root = document.documentElement;
  const variables = themeToCSSVariables(theme);
  const previousValues = new Map<`--${string}`, string>();

  for (const [name, value] of Object.entries(variables) as Array<
    [`--${string}`, number | string]
  >) {
    previousValues.set(name, root.style.getPropertyValue(name));
    root.style.setProperty(name, String(value));
  }

  return () => {
    for (const [name, previousValue] of previousValues.entries()) {
      if (previousValue === '') {
        root.style.removeProperty(name);
      } else {
        root.style.setProperty(name, previousValue);
      }
    }
  };
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  const hasExistingRootProvider = useContext(ThemeRootContext);
  const resolvedTheme = useMemo(() => createTheme(theme), [theme]);

  useEffect(() => {
    if (hasExistingRootProvider) {
      return () => undefined;
    }

    return applyThemeVariables(resolvedTheme);
  }, [hasExistingRootProvider, resolvedTheme]);

  if (hasExistingRootProvider) {
    if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
      // Keep v1 provider behavior simple and deterministic.
      console.error('yxgui ThemeProvider does not support nesting. Inner theme is ignored.');
    }

    return <>{children}</>;
  }

  return (
    <ThemeRootContext.Provider value={true}>
      <ThemeContext.Provider value={resolvedTheme}>{children}</ThemeContext.Provider>
    </ThemeRootContext.Provider>
  );
}
