import * as stylex from '@stylexjs/stylex';
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ComponentProps,
  type Ref
} from 'react';
import { colors } from '../../theme/colors.stylex';
import { darkTheme, lightTheme } from '../../theme/themes';

export type ThemeProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  mode?: 'light' | 'dark';
};

const styles = stylex.create({
  root: {
    backgroundColor: colors.surface,
    color: colors.text
  },
  light: { colorScheme: 'light' },
  dark: { colorScheme: 'dark' }
});

const ThemePortalContext = createContext<HTMLDivElement | null | undefined>(undefined);

export function useThemePortalContainer() {
  return useContext(ThemePortalContext);
}

function assignRef(ref: Ref<HTMLDivElement> | undefined, node: HTMLDivElement | null) {
  if (typeof ref === 'function') {
    ref(node);
  } else if (ref) {
    ref.current = node;
  }
}

export function Theme({ mode = 'light', ref, ...props }: ThemeProps) {
  const theme = mode === 'dark' ? darkTheme : lightTheme;
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);
  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      setPortalContainer(node);
      assignRef(ref, node);
    },
    [ref]
  );

  return (
    <ThemePortalContext.Provider value={portalContainer}>
      <div
        {...props}
        ref={setRootRef}
        {...stylex.props(theme, styles.root, mode === 'dark' ? styles.dark : styles.light)}
      />
    </ThemePortalContext.Provider>
  );
}
