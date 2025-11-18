// src/components/SidebarItem.jsx
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function SidebarItem({ icon, label, active = false, onClick }) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={onClick}
        sx={{
          borderRadius: 1,
          bgcolor: active ? "primary.100" : "transparent",
          "&:hover": { bgcolor: active ? "primary.100" : "action.hover" },
          px: 2,
        }}
      >
        <ListItemIcon sx={{ minWidth: 36, color: active ? "primary.main" : "text.primary" }}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={label} primaryTypographyProps={{ variant: "body2", fontWeight: 600 }} />
      </ListItemButton>
    </ListItem>
  );
}
