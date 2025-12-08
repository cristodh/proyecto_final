// src/components/Topbar.jsx
import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import userIcon from "../../../imgs/UserIcon.png";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onOpenSidebar, adminData }) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  const adminName = adminData 
    ? `${adminData.first_name || adminData.username} ${adminData.last_name || ''}`.trim() 
    : 'Admin Fundify';

  const handleLogout = () => {
    // Limpiar datos de administrador
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('isAdmin');
    // Redirigir al login
    navigate('/auth-user');
  };

  return (
    <Box component="header" sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      px: { xs: 2, md: 4 },
      py: 1.5,
      borderBottom: 1,
      borderColor: "custom.borderLight",
      bgcolor: "rgba(240, 249, 255, 0.8)",
      position: "sticky",
      top: 0,
      zIndex: 9
    }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {!mdUp && (
          <IconButton onClick={onOpenSidebar} aria-label="open sidebar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" /></svg>
          </IconButton>
        )}
        <Typography variant="h6" sx={{ fontWeight: 800 }}>Panel de Administración</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton sx={{ border: 1, borderColor: "custom.borderLight", bgcolor: "custom.cardLight" }} aria-label="notifications">
          <NotificationsIcon />
        </IconButton>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Avatar src={userIcon} />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>{adminName}</Typography>
            <Typography variant="caption" color="text.secondary">Supervisor del Ecosistema</Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          color="error"
          size="small"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ ml: 2 }}
        >
          Salir
        </Button>
      </Box>
    </Box>
  );
}
