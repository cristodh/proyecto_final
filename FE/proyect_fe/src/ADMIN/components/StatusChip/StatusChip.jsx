// src/components/StatusChip.jsx
import React from "react";
import Chip from "@mui/material/Chip";

export default function StatusChip({ status = "Activa" }) {
  const map = {
    Activa: { color: "success", label: "Activa" },
    "Pendiente de Validación": { color: "warning", label: "Pendiente de Validación" },
    Finalizada: { color: "default", label: "Finalizada" },
    Rechazada: { color: "error", label: "Rechazada" }
  };
  const cfg = map[status] ?? { color: "default", label: status };
  return (
    <Chip label={cfg.label} color={cfg.color} size="small" sx={{ px: 1.2 }} />
  );
}
