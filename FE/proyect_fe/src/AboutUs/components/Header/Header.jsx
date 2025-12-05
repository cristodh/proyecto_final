// src/components/Header.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import logoFundify from "../../../imgs/LogoFundifyClose.png";

export default function Header() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" elevation={0} sx={{
      bgcolor: "rgba(240, 249, 255, 0.8)", // slight transparency
      borderBottom: 1,
      borderColor: theme.palette.custom?.borderLight || "#cfe7d7",
      backdropFilter: "blur(6px)",
      color: theme.palette.text.primary
    }}>
      <Toolbar sx={{ maxWidth: 1400, mx: "auto", width: "100%", px: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }} onClick={() => navigate('/')}>
          <img 
            src={logoFundify} 
            alt="Fundify Logo" 
            style={{ 
              height: "48px",
              width: "auto"
            }} 
          />
        </Box>

        {mdUp ? (
          <Stack direction="row" spacing={4} sx={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Button sx={{ textTransform: "none" }}>Explorar Proyectos</Button>
              <Button sx={{ textTransform: "none", color: "primary.main", fontWeight: 700 }}>Nuestra Esencia</Button>
            </Stack>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="contained" sx={{ textTransform: "none", minWidth: 120 }}>Inicio</Button>
              <Button variant="outlined" sx={{ textTransform: "none", minWidth: 120 }}>Iniciar Sesión</Button>
            </Box>
          </Stack>
        ) : (
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <IconButton aria-label="menu" sx={{ bgcolor: "primary.100", color: "text.primary" }}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
