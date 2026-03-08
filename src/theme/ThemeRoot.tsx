import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { mergeStylexProps } from '../styles/mergeStylexProps';
import { getThemeRootStyleProps, type ThemeName } from './themes.stylex';

export interface ThemeRootProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  theme?: ThemeName;
  applyColorScheme?: boolean;
  children?: ReactNode;
}

export function ThemeRoot({
  ref,
  theme = 'light',
  applyColorScheme = true,
  className,
  style,
  children,
  ...props
}: ThemeRootProps) {
  const themedStyleProps = mergeStylexProps(getThemeRootStyleProps(theme), {
    className,
    style: applyColorScheme ? { colorScheme: theme, ...style } : style
  });

  return (
    <div {...props} {...themedStyleProps} data-theme={theme} ref={ref}>
      {children}
    </div>
  );
}
