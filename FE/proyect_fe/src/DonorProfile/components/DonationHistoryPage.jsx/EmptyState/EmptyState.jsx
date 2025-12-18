// src/components/donations/EmptyState.jsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export default function EmptyState({ title = "Aún no has realizado donaciones", subtitle = "Tu historial aparecerá aquí una vez que apoyes tu primer proyecto. ¡Explora campañas y genera un impacto!" }) {
  return (
    <Paper sx={{ p: 6, border: 1, borderColor: "divider", borderRadius: 2, textAlign: "center" }}>
      <ReceiptLongIcon sx={{ fontSize: 64, mb: 2, color: "primary.main" }} />
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
      <Typography color="text.secondary">{subtitle}</Typography>
    </Paper>
  );
}
