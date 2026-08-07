import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { darkTheme, lightTheme } from '../themes';

type ThemeProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  mode?: 'light' | 'dark';
};

export function Theme({ mode = 'light', ...props }: ThemeProps) {
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return <div {...props} {...stylex.props(theme)} />;
}
