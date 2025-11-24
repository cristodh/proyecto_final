// src/components/Header.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import LogoFundify from "../../../imgs/LogoFundifyClose.png";
import { useNavigate } from "react-router-dom";

export default function Header({ onToggleSidebar }) {
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/loginUser');
  };

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.default" }}>
      <Toolbar sx={{ minHeight: 88, height: 88, px: 2, justifyContent: "space-between", maxWidth: "100vw", boxSizing: "border-box" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, height: 80 }}>
          <IconButton onClick={onToggleSidebar} aria-label="toggle sidebar" sx={{ display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          {/* Logo totalmente a la izquierda */}
          <img src={LogoFundify} alt="Fundify Logo" style={{ height: '72px', maxHeight: '100%', width: 'auto', objectFit: 'contain', display: 'block' }} />
        </Box>

        {/* Botones de navegación */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
          <Button startIcon={<HomeIcon />} onClick={() => navigate('/')} sx={{ textTransform: "none" }}>
            Inicio
          </Button>
          <Button startIcon={<ExploreIcon />} onClick={() => navigate('/explorar-proyectos')} sx={{ textTransform: "none" }}>
            Explorar Proyectos
          </Button>
          <Button startIcon={<LogoutIcon />} onClick={handleLogout} color="error" sx={{ textTransform: "none" }}>
            Cerrar Sesión
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton aria-label="notifications">
            <Badge variant="dot" color="success">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar alt="Carlos Mendoza" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=60" />
            <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", alignItems: "flex-start" }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>Carlos Mendoza</Typography>
              <Typography variant="caption" color="text.secondary">Miembro desde Oct 2023</Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
