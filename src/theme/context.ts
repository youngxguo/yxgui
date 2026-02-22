import { createContext } from 'react';
import { defaultTheme } from './defaultTheme';
import type { Theme } from './types';

export const ThemeContext = createContext<Theme>(defaultTheme);
export const ThemeRootContext = createContext<boolean>(false);
