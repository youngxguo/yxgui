import * as stylex from '@stylexjs/stylex';
import { describe, expect, it } from 'vitest';
import { darkTheme, lightTheme } from './themes';

describe('themes', () => {
  it('exports distinct StyleX themes', () => {
    const lightClassName = stylex.props(lightTheme).className;
    const darkClassName = stylex.props(darkTheme).className;

    expect(lightClassName).toBeTruthy();
    expect(darkClassName).toBeTruthy();
    expect(lightClassName).not.toBe(darkClassName);
  });
});
