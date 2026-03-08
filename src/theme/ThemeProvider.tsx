import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { mergeStylexProps } from '../styles/mergeStylexProps';
import { getThemeStyleProps, type ThemeName } from './themes.stylex';

export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  theme?: ThemeName;
  children?: ReactNode;
}

export function ThemeProvider({
  ref,
  theme = 'light',
  className,
  style,
  children,
  ...props
}: ThemeProviderProps) {
  const themedStyleProps = mergeStylexProps(getThemeStyleProps(theme), { className, style });

  return (
    <div {...props} {...themedStyleProps} data-theme={theme} ref={ref}>
      {children}
    </div>
  );
}
