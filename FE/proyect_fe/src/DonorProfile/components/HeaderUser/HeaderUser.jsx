// src/components/Header.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import userIcon from "../../../imgs/UserIcon.png";
import LogoFundify from "../../../imgs/LogoFundifyClose.png";
import { useNavigate } from "react-router-dom";

export default function HeaderUser({ onToggleSidebar, user}) {
  const navigate = useNavigate();

  // Función para obtener la ruta del perfil según el rol
  const getProfileRoute = () => {
    const roleId = user?.role;
    switch (roleId) {
      case 1:
        return '/manager_profile/main';  // Manager
      case 2:
        return '/donor_profile/main';     // Donor
      case 5:
        return '/admin/dashboard';        // Admin
      default:
        return '/donor_profile/main';     // Default
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/auth-user');
  };
  const formaterDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return 'Fecha no disponible';
      }
      
      const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };
      
      const day = date.toLocaleDateString("es-CR", { day: "numeric" });
      const month = date.toLocaleDateString("es-CR", { month: "long" });
      const year = date.toLocaleDateString("es-CR", { year: "numeric" });
      
      return `${day} de ${capitalizeFirstLetter(month)}, ${year}`;
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return 'Fecha no disponible';
    }
  };
  return (
    <AppBar 
      position="sticky" 
      color="transparent" 
      elevation={0} 
      sx={{ 
        borderBottom: "1px solid rgba(0,0,0,0.08)", 
        bgcolor: "rgba(240, 249, 255, 0.8)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
      }}
    >
      <Toolbar sx={{ 
        minHeight: 88, 
        height: 88, 
        px: 3, 
        justifyContent: "space-between", 
        maxWidth: "100vw", 
        boxSizing: "border-box" 
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, height: 80, cursor: "pointer" }} onClick={() => navigate('/')}>
          <IconButton onClick={onToggleSidebar} aria-label="toggle sidebar" sx={{ display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          {/* Logo totalmente a la izquierda */}
          <img src={LogoFundify} alt="Fundify Logo" style={{ height: '72px', maxHeight: '100%', width: 'auto', objectFit: 'contain', display: 'block' }} />
        </Box>

        {/* Botones de navegación */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
          <Button 
            startIcon={<HomeIcon />} 
            onClick={() => navigate('/')} 
            sx={{ 
              textTransform: "none",
              color: "#64748b",
              fontWeight: 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              transition: "all 0.2s ease",
              '&:hover': {
                color: "#2A9D8F",
                bgcolor: "rgba(42, 157, 143, 0.08)",
              }
            }}
          >
            Inicio
          </Button>
          <Button 
            startIcon={<ExploreIcon />} 
            onClick={() => navigate('/explore-projects')} 
            sx={{ 
              textTransform: "none",
              color: "#64748b",
              fontWeight: 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              transition: "all 0.2s ease",
              '&:hover': {
                color: "#2A9D8F",
                bgcolor: "rgba(42, 157, 143, 0.08)",
              }
            }}
          >
            Explorar Proyectos
          </Button>
          <Button 
            startIcon={<LogoutIcon />} 
            onClick={handleLogout} 
            sx={{ 
              textTransform: "none",
              color: "#dc2626",
              fontWeight: 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              transition: "all 0.2s ease",
              '&:hover': {
                color: "#ffffff",
                bgcolor: "#dc2626",
              }
            }}
          >
            Cerrar Sesión
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar alt="user-icon" src={userIcon} onClick={() => navigate(getProfileRoute())} sx={{ cursor: "pointer" ,'&:hover': {
              boxShadow: "0 0 0 2px #0f1414ff",
              transform: "scale(1.05)",
              }
             }} />
            <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", alignItems: "flex-start" }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>{user.first_name} {user.last_name}</Typography>
              <Typography variant="caption" color="text.secondary">{user.email}</Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
