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
    sm: '0.375rem',
    md: '0.625rem',
    lg: '0.875rem',
    pill: '999px'
  },
  spacing: {
    xs: '0.4rem',
    sm: '0.45rem',
    md: '0.6rem',
    lg: '0.75rem'
  },
  surface: {
    base: '#fcfcf9',
    elevated: '#ffffff',
    subtle: '#f4f4ef'
  },
  border: {
    default: '#cfcec5',
    muted: '#e3e1d7',
    strong: '#aead9f',
    focus: '#2855f2'
  },
  control: {
    background: '#ffffff',
    backgroundDisabled: '#f4f4ef',
    foreground: '#161614',
    placeholder: '#76766b',
    border: '#cfcec5',
    borderFocus: '#2855f2'
  },
  variants: {
    primary: {
      background: '#161614',
      foreground: '#fcfcf9'
    },
    secondary: {
      background: '#fcfcf9',
      foreground: '#161614',
      border: '#cfcec5',
      hoverBorder: '#bcbab0'
    },
    ghost: {
      foreground: '#161614',
      hoverBackground: 'rgba(22, 22, 20, 0.06)'
    },
    outline: {
      border: '#cfcec5',
      foreground: '#161614'
    }
  },
  components: {
    button: {
      primaryHoverShadow: '0 6px 16px rgba(22, 22, 20, 0.18)',
      disabledOpacity: 0.55,
      activeOffset: '1px',
      paddingSm: '0.45rem 0.8rem',
      paddingMd: '0.6rem 1rem',
      paddingLg: '0.75rem 1.2rem',
      minHeightSm: '2rem',
      minHeightMd: '2.5rem',
      minHeightLg: '2.9rem'
    },
    input: {
      invalidBorder: '#c43d3d'
    },
    card: {
      shadow: '0 8px 24px rgba(22, 22, 20, 0.06)'
    }
  }
};
