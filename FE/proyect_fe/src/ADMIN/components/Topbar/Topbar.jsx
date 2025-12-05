// src/components/Topbar.jsx
import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import userIcon from "../../../imgs/UserIcon.png";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Topbar({ onOpenSidebar }) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

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
            <Typography variant="body1" sx={{ fontWeight: 700 }}>Admin Fundify</Typography>
            <Typography variant="caption" color="text.secondary">Supervisor del Ecosistema</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
