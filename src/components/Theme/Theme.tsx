import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import { darkTheme, lightTheme } from '../../theme/themes';

export type ThemeProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  mode?: 'light' | 'dark';
};

const styles = stylex.create({
  root: {
    backgroundColor: colors.surface,
    color: colors.text
  }
});

export function Theme({ mode = 'light', ...props }: ThemeProps) {
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return <div {...props} {...stylex.props(theme, styles.root)} />;
}
