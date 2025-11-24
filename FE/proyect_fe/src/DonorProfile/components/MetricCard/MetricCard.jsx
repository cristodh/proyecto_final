// src/components/MetricCard.jsx
import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function MetricCard({ title, value, hint, icon }) {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: 1, borderColor: "divider", display: "flex", gap: 2, alignItems: "center" }}>
      <Box sx={{ width: 48, height: 48, borderRadius: 1.5, display: "grid", placeItems: "center", bgcolor: "primary.50", color: "primary.main" }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" color="text.secondary">{title}</Typography>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>{value}</Typography>
        {hint && <Typography variant="caption" color="text.secondary">{hint}</Typography>}
      </Box>
    </Paper>
  );
}
