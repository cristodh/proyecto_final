// src/components/Header.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" elevation={0} sx={{
      bgcolor: "background.paper",
      borderBottom: 1,
      borderColor: "primary.main",
      backdropFilter: "blur(6px)"
    }}>
      <Toolbar sx={{ maxWidth: 1400, mx: "auto", width: "100%", px: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* SVG logo */}
          <Box sx={{ width: 36, height: 36, color: "primary.main" }}>
            <svg viewBox="0 0 48 48" width="100%" height="100%" fill="currentColor">
              <g>
                <path d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"></path>
              </g>
            </svg>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>Fundify</Typography>
        </Box>

        {isMdUp ? (
          <Stack direction="row" spacing={4} sx={{ flex: 1, justifyContent: "center" }}>
            <Button sx={{ textTransform: "none" }}>Explorar Proyectos</Button>
            <Button sx={{ textTransform: "none" }}>¿Cómo Funciona?</Button>
            <Button sx={{ textTransform: "none" }}>Crear Campaña</Button>
          </Stack>
        ) : <Box sx={{ flex: 1 }} />}

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
          onClick={()=>navigate('/auth-user')}
          variant="outlined" sx={{ textTransform: "none", minWidth: 100 }}>Iniciar Sesión</Button>
          <Button
          onClick={()=>navigate('/auth-user')}
          variant="contained" sx={{ textTransform: "none", minWidth: 100 }}>Registrarse</Button>
          {!isMdUp && (
            <IconButton aria-label="menu" sx={{ ml: 1 }}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
