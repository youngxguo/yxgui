import type { Theme } from './types';

export const defaultTheme: Theme = {
  palette: {
    background: '#fcfcf9',
    foreground: '#161614',
    border: '#cfcec5',
    accent: '#2855f2',
    focusRing: '#2855f2',
    mutedForeground: '#59594f'
  },
  typography: {
    fontFamily: "'IBM Plex Sans', 'Avenir Next', 'Segoe UI', sans-serif",
    fontWeightStrong: 600,
    fontSizeSm: '0.8125rem',
    fontSizeMd: '0.9375rem',
    fontSizeLg: '1.0625rem',
    lineHeightTight: 1
  },
  radius: {
    pill: '999px'
  },
  spacing: {
    xs: '0.4rem',
    sm: '0.45rem',
    md: '0.6rem',
    lg: '0.75rem'
  },
  components: {
    button: {
      primaryBackground: '#161614',
      primaryForeground: '#fcfcf9',
      primaryHoverShadow: '0 6px 16px rgba(22, 22, 20, 0.18)',
      secondaryBackground: '#fcfcf9',
      secondaryForeground: '#161614',
      secondaryBorder: '#cfcec5',
      secondaryHoverBorder: '#bcbab0',
      ghostForeground: '#161614',
      ghostHoverBackground: 'rgba(22, 22, 20, 0.06)',
      disabledOpacity: 0.55,
      activeOffset: '1px',
      paddingSm: '0.45rem 0.8rem',
      paddingMd: '0.6rem 1rem',
      paddingLg: '0.75rem 1.2rem',
      minHeightSm: '2rem',
      minHeightMd: '2.5rem',
      minHeightLg: '2.9rem'
    }
  }
};
