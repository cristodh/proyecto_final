// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Box, Typography, Button, IconButton, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const theme = useTheme();

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        bgcolor: theme.palette.mode === "dark" ? "#102216cc" : "#f8fcf9cc",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid rgba(19,236,91,0.2)"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* LOGO */}
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{ width: 26, height: 26, color: "#13ec5b" }}
            dangerouslySetInnerHTML={{
              __html: `
                <svg fill="currentColor" viewBox="0 0 48 48">
                  <path d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"/>
                </svg>
              `,
            }}
          />
          <Typography fontSize="1.2rem" fontWeight={700}>
            Fundify
          </Typography>
        </Box>

        {/* LINKS */}
        <Box 
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 4
          }}
        >
          <Button variant="text">Explorar Proyectos</Button>
          <Button variant="text">¿Cómo Funciona?</Button>
          <Button variant="text">Crear Campaña</Button>
        </Box>

        {/* BOTONES DERECHA */}
        <Box display="flex" alignItems="center" gap={1}>
          <Button 
            variant="contained"
            sx={{
              bgcolor: "rgba(19,236,91,0.2)",
              color: "#111"
            }}
          >
            Iniciar Sesión
          </Button>
          <Button 
            variant="contained"
            sx={{
              bgcolor: "#13ec5b",
              color: "#111",
              "&:hover": { opacity: 0.9 }
            }}
          >
            Registrarse
          </Button>

          {/* Mobile Menu */}
          <IconButton sx={{ display: { xs: "flex", md: "none" } }}>
            <MenuIcon />
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  );
}
