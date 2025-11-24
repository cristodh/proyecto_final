// src/components/Sidebar.jsx
import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 280;

export default function Sidebar({ open, onClose }) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const content = (
    <Box sx={{ width: drawerWidth, display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
      <Box sx={{ p: 2, display: "flex", gap: 2, alignItems: "center" }}>
        <Avatar src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=60" sx={{ width: 64, height: 64 }} />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Carlos Mendoza</Typography>
          <Typography variant="caption" color="text.secondary">Miembro desde Oct 2023</Typography>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Box sx={{ flex: 1, borderRadius: 1, p: 1.5, border: 1, borderColor: "divider", textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>€1,250</Typography>
            <Typography variant="caption" color="text.secondary">Total Donado</Typography>
          </Box>
          <Box sx={{ flex: 1, borderRadius: 1, p: 1.5, border: 1, borderColor: "divider", textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>15</Typography>
            <Typography variant="caption" color="text.secondary">Proyectos Apoyados</Typography>
          </Box>
        </Box>

        <List>
          <ListItemButton selected>
            <ListItemIcon><DashboardIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Resumen" primaryTypographyProps={{ fontWeight: 700 }} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon><HistoryIcon /></ListItemIcon>
            <ListItemText primary="Historial de Donaciones" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon><FavoriteIcon /></ListItemIcon>
            <ListItemText primary="Proyectos Seguidos" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Configuración" />
          </ListItemButton>
        </List>
      </Box>

      <Box sx={{ p: 2, mt: 3 }}>
        <Divider />
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
          © Fundify
        </Typography>
      </Box>
    </Box>
  );

  if (mdUp) {
    // permanent sidebar on md+ (fixed position)
    return (
      <Box component="aside" sx={{ width: drawerWidth, flexShrink: 0, position: "fixed", left: 0, top: 88, bottom: 0, overflow: "auto" }}>
        {content}
      </Box>
    );
  }

  return (
    <Drawer open={open} onClose={onClose} ModalProps={{ keepMounted: true }}>
      {content}
    </Drawer>
  );
}
