import { createTheme, responsiveFontSizes, lighten, darken } from '@mui/material/styles';
import { red, blue, grey, green } from '@mui/material/colors';

// 3D Effect Styles
interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

// Define color schemes for each section
const colorSchemes: Record<string, ThemeColors> = {
  home: {
    primary: '#2196f3', // Blue
    secondary: '#f50057', // Pink
    background: '#f5f5f5',
    text: '#333333',
  },
  skills: {
    primary: '#4caf50', // Green
    secondary: '#ffeb3b', // Yellow
    background: '#f5f5f5',
    text: '#333333',
  },
  experience: {
    primary: '#f44336', // Red
    secondary: '#9c27b0', // Purple
    background: '#f5f5f5',
    text: '#333333',
  },
  resume: {
    primary: '#2196f3', // Blue
    secondary: '#f50057', // Pink
    background: '#f5f5f5',
    text: '#333333',
  },
  projects: {
    primary: '#9c27b0', // Purple
    secondary: '#4caf50', // Green
    background: '#f5f5f5',
    text: '#333333',
  },
  contact: {
    primary: '#ff9800', // Orange
    secondary: '#607d8b', // Blue Grey
    background: '#f5f5f5',
    text: '#333333',
  },
};

// Create a function to get theme based on section
const getThemeForSection = (section: string) => {
  const colors = colorSchemes[section] || colorSchemes.home;
  return createTheme({
    palette: {
      primary: {
        main: colors.primary,
        light: lighten(colors.primary, 0.3),
        dark: darken(colors.primary, 0.3),
      },
      secondary: {
        main: colors.secondary,
        light: lighten(colors.secondary, 0.3),
        dark: darken(colors.secondary, 0.3),
      },
      background: {
        default: colors.background,
        paper: '#ffffff',
      },
      text: {
        primary: colors.text,
        secondary: '#666666',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        '@media (max-width:600px)': {
          fontSize: '2rem',
        },
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
        '@media (max-width:600px)': {
          fontSize: '1.5rem',
        },
      },
      h3: {
        fontWeight: 500,
        fontSize: '1.75rem',
        '@media (max-width:600px)': {
          fontSize: '1.25rem',
        },
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
    },
    shape: {
      borderRadius: 12,
    },
    transitions: {
      create: (props = 'all') => `cubic-bezier(0.4, 0, 0.2, 1) ${props} 0.3s`,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            maxWidth: '100%',
            padding: '0 24px',
            '@media (min-width: 600px)': {
              maxWidth: '80%',
            },
            '@media (min-width: 900px)': {
              maxWidth: '70%',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colors.primary,
            color: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.3s ease',
            '&.MuiAppBar-positionFixed': {
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1200,
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: 250,
            flexShrink: 0,
            padding: 16,
            backgroundColor: '#f5f5f5',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
            maxWidth: '90vw',
            margin: 20,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 12,
            padding: '8px 16px',
            fontSize: '0.875rem',
          },
        },
      },
    },
  });
};

// Base theme configuration
const baseTheme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  transitions: {
    create: (props = 'all') => `cubic-bezier(0.4, 0, 0.2, 1) ${props} 0.3s`,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '100%',
          padding: '0 24px',
          '@media (min-width: 600px)': {
            maxWidth: '80%',
          },
          '@media (min-width: 900px)': {
            maxWidth: '70%',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2196f3',
          color: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.3s ease',
          '&.MuiAppBar-positionFixed': {
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 250,
          flexShrink: 0,
          padding: 16,
          backgroundColor: '#f5f5f5',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          maxWidth: '90vw',
          margin: 20,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 12,
          padding: '8px 16px',
          fontSize: '0.875rem',
        },
      },
    },
  },
});

// Add global styles for 3D effects
const responsiveTheme = responsiveFontSizes(baseTheme);

export default responsiveTheme;

// Export the base theme and the section-based theme function
export { baseTheme, getThemeForSection };
