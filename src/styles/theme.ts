export const theme = {
  colors: {
    // Primary colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F9F9F9',
      tertiary: '#F5F5F5',
    },
    text: {
      primary: '#0A0A0A',
      secondary: '#222222',
      tertiary: '#444444',
      muted: '#777777',
    },
    // Accent colors - subtle pastel red
    accent: {
      primary: '#E5777F',   // Subtle pastel red
      secondary: '#CB6B73', // Darker shade
      tertiary: '#F2989F',  // Lighter shade
      hover: '#F9B9BE',     // Very light for hover states
    },
    // Extended gray palette
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      950: '#0A0A0A',
    },
    // Status colors
    status: {
      success: '#9DB39C', // Desaturated green
      warning: '#D4C09E', // Desaturated yellow
      error: '#D99A98',   // Desaturated red
      info: '#9EB4C9',    // Desaturated blue
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      base: 'Inter, sans-serif',
      mono: 'monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },
  
  // Spacing values
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Animation timings
  animation: {
    timing: {
      fast: '150ms',
      default: '300ms',
      slow: '500ms',
      verySlow: '1000ms',
    },
    easing: {
      inExpo: 'cubic-bezier(0.76, 0, 0.24, 1)',
      outExpo: 'cubic-bezier(0.25, 1, 0.5, 1)',
      inOutExpo: 'cubic-bezier(0.87, 0, 0.13, 1)',
    },
  },
  
  // Border radius values
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  }
};
