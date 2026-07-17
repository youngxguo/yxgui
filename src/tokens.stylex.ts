import * as stylex from '@stylexjs/stylex';
import type { Theme } from './theme';

export const defaultTheme: Theme = {
  color: {
    canvas: '#f7f7f4',
    surface: '#ffffff',
    text: '#20201e',
    textMuted: '#66655f',
    border: '#d9d8d1',
    accent: '#5b47d6',
    accentHover: '#4936bd',
    onAccent: '#ffffff',
    focus: '#7969e8'
  },
  typography: {
    bodyFontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  control: {
    height: '2.75rem',
    paddingInline: '1rem',
    radius: '0.75rem'
  },
  motion: {
    durationFast: '140ms',
    easingStandard: 'cubic-bezier(0.2, 0, 0, 1)'
  }
};

export const tokens = stylex.defineVars({
  '--yxg-color-canvas': defaultTheme.color.canvas,
  '--yxg-color-surface': defaultTheme.color.surface,
  '--yxg-color-text': defaultTheme.color.text,
  '--yxg-color-text-muted': defaultTheme.color.textMuted,
  '--yxg-color-border': defaultTheme.color.border,
  '--yxg-color-accent': defaultTheme.color.accent,
  '--yxg-color-accent-hover': defaultTheme.color.accentHover,
  '--yxg-color-on-accent': defaultTheme.color.onAccent,
  '--yxg-color-focus': defaultTheme.color.focus,
  '--yxg-font-body': defaultTheme.typography.bodyFontFamily,
  '--yxg-control-height': defaultTheme.control.height,
  '--yxg-control-padding-inline': defaultTheme.control.paddingInline,
  '--yxg-radius-control': defaultTheme.control.radius,
  '--yxg-duration-fast': defaultTheme.motion.durationFast,
  '--yxg-ease-standard': defaultTheme.motion.easingStandard
});
