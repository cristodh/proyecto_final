import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home"; // 1. Importa el icono de Home
import { useNavigate } from "react-router-dom"; // 2. Importa useNavigate
import LogoFundify from "../../../imgs/LogoFundifyClose.png";

export default function TopNavBar() {
  const navigate = useNavigate(); // 3. Inicializa el hook

  return (
    <AppBar position="static" elevation={0} sx={(t) => ({
      bgcolor: t.palette.background.default,
      color: t.palette.text.primary,
      borderBottom: `1px solid ${t.palette.divider}`,
      backdropFilter: "blur(6px)"
    })}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: { xs: 2, md: 4 }, minHeight: 64 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Reemplazo el icono y texto por el logo */}
          <img src={LogoFundify} alt="Fundify Logo" style={{ height: 36, width: 36, objectFit: "contain" }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* 4. Botón para ir al Home */}
          <IconButton size="large" aria-label="home" onClick={() => navigate("/")} sx={{
            bgcolor: (t) => t.palette.primary.main + "22",
            "&:hover": { bgcolor: (t) => t.palette.primary.dark + "28" },
            borderRadius: "999px"
          }}>
            <HomeIcon />
          </IconButton>

          <IconButton size="large" aria-label="notificaciones" sx={{
            bgcolor: (t) => t.palette.primary.main + "22",
            "&:hover": { bgcolor: (t) => t.palette.primary.dark + "28" },
            borderRadius: "999px"
          }}>
            <NotificationsIcon />
          </IconButton>

          <Avatar
            alt="Carlos Mendoza"
            src="/mnt/data/bfb6a193-579b-4204-b354-362f9b6bd151.png"
            sx={{ width: 40, height: 40, boxShadow: "0px 2px 6px rgba(0,0,0,0.06)" }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
