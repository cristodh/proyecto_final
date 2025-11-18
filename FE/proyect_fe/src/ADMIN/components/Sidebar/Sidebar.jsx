// src/components/Sidebar.jsx
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import SidebarItem from "../SidebarItem/SidebarItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CampaignIcon from "@mui/icons-material/Campaign";
import GavelIcon from "@mui/icons-material/Gavel";
import MonitoringIcon from "@mui/icons-material/MonitorHeart";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 260;

export default function Sidebar({ mobileOpen, onMobileClose, activeKey = "dashboard" }) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const content = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", pt: 2 }}>
      <Box sx={{ px: 2, mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ color: "primary.main" }}>
          <svg width="40" height="40" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" />
          </svg>
        </Box>
        <Typography variant="h6">Fundify</Typography>
      </Box>

      <List sx={{ px: 1 }}>
        <SidebarItem icon={<DashboardIcon />} label="Panel Principal" active={activeKey === "dashboard"} />
        <SidebarItem icon={<CampaignIcon />} label="Campañas" active={activeKey === "campaigns"} />
        <SidebarItem icon={<GavelIcon />} label="Moderación" active={activeKey === "moderation"} />
        <SidebarItem icon={<MonitoringIcon />} label="Reportes de Impacto" active={activeKey === "reports"} />
        <SidebarItem icon={<GroupIcon />} label="Gestión de Usuarios" active={activeKey === "users"} />
      </List>

      <Box sx={{ mt: "auto", px: 1, pb: 2 }}>
        <Divider sx={{ mb: 1 }} />
        <List sx={{ px: 1 }}>
          <SidebarItem icon={<SettingsIcon />} label="Configuración" />
          <SidebarItem icon={<LogoutIcon />} label="Cerrar Sesión" />
        </List>
      </Box>
    </Box>
  );

  if (mdUp) {
    return (
      <Box component="aside" sx={{
        width: drawerWidth,
        flexShrink: 0,
        borderRight: 1,
        borderColor: "custom.borderLight",
        bgcolor: "custom.cardLight",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0
      }}>
        {content}
      </Box>
    );
  }

  return (
    <Drawer
      open={mobileOpen}
      onClose={onMobileClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
      }}
    >
      {content}
    </Drawer>
  );
}
