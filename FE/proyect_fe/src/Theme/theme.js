// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    // Tailwind-based brand palette
    brand: {
      primary: "#2A9D8F",
      primaryHover: "#23867a",
      secondary: "#333333",
      accent: "#E76F51",

      background: "#F8F9FA",
      backgroundDark: "#102216",
    },

    // Standard MUI palette mapping
    primary: {
      main: "#2A9D8F",
      dark: "#23867a",
      light: "#4AB4A8",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#333333",
    },
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#6B7280", // gris suave del diseño original
    },
  },

  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',

    h1: { 
      fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: { 
      fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h3: { 
      fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: { 
      fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: { 
      fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    h6: { 
      fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
      fontSize: '1rem',
      fontWeight: 500,
    },

    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    
    subtitle1: {
      fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    subtitle2: {
      fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#6B7280',
    },

    button: {
      fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
      textTransform: "none",
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 12, // global rounded-lg
  },

  shadows: [
    "none",
    "0px 2px 4px rgba(0,0,0,0.04)",
    "0px 4px 10px rgba(0,0,0,0.06)",
    "0px 6px 18px rgba(0,0,0,0.08)",
    ...Array(21).fill("none"),
  ],

  components: {
    // Global Buttons
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
          fontWeight: 500,
          paddingTop: 10,
          paddingBottom: 10,
        },
        containedPrimary: {
          backgroundColor: "#2A9D8F",
          ":hover": { backgroundColor: "#23867a" },
        },
      },
    },

    // Global Typography
    MuiTypography: {
      styleOverrides: {
        root: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      },
    },

    // Global TextFields
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            background: "#F8F9FA",
          },
        },
      },
    },

    // Cards
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: "0px 4px 16px rgba(0,0,0,0.05)",
        },
      },
    },

    // Tabs (for Login / Register)
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 48,
        },
        indicator: {
          backgroundColor: "#2A9D8F",
          height: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
          color: "#6B7280",
          "&.Mui-selected": {
            color: "#333333",
          },
        },
      },
    },
  },

  // register custom colors
  custom: {
  backgroundLight: "#f6f8f6",
  backgroundDark: "#112116",
  textLightPrimary: "#0d1b12",
  textDarkPrimary: "#f6f8f6",
  textLightSecondary: "#2A9D8F",
  textDarkSecondary: "#a3b3a9",
  borderLight: "#cfe7d7",
  borderDark: "#34493c",
  surfaceLight: "#f8fcf9",
  surfaceDark: "#182e1f",
},

});

// Dark Mode theme
export const darkTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    mode: "dark",

    background: {
      default: "#102216",
      paper: "#1B3A2E",
    },
    text: {
      primary: "#E5E7EB",
      secondary: "#9CA3AF",
    },
  },

  custom: {
    ...theme.custom,
    // Override para dark mode
    background: "#102216",
    surface: "#182e1f",
    textPrimary: "#f6f8f6",
    textSecondary: "#a3b3a9",
  },
});



export default theme;



