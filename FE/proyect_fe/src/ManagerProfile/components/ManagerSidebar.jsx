import React from "react";
import { Box, Typography } from "@mui/material";

export default function ManagerSidebar({ view, setView }) {
  const menu = [
    { label: "Resumen", id: "summary" },
    { label: "Campañas", id: "campaigns" },
    { label: "Nueva Campaña", id: "create" },
    { label: "Mensajes", id: "messages" },
    { label: "Informes", id: "reports" },
    { label: "Configuración", id: "config" },
  ];

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        width: 260,
        borderRight: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        p: 3,
      }}
    >
      {/* Title */}
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
        Panel del Gestor
      </Typography>

      {/* Menu */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {menu.map((item) => {
          const active = view === item.id;

          return (
            <Box
              key={item.id}
              onClick={() => setView(item.id)}
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                padding: "10px 12px",
                borderRadius: 2,
                fontWeight: 500,
                fontSize: "0.95rem",
                color: active ? "success.dark" : "text.secondary",
                bgcolor: active ? "success.light" : "transparent",
                transition: "0.2s",
                "&:hover": {
                  bgcolor: active ? "success.light" : "grey.100",
                },
              }}
            >
              {item.label}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
