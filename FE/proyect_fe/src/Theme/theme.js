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
    fontFamily: "Inter, sans-serif",

    h1: { fontWeight: 900 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },

    button: {
      textTransform: "none",
      fontWeight: 700,
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
          fontWeight: 700,
          paddingTop: 10,
          paddingBottom: 10,
        },
        containedPrimary: {
          backgroundColor: "#2A9D8F",
          ":hover": { backgroundColor: "#23867a" },
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



