// src/components/StatCard.jsx
import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function StatCard({ title, value, hint, color = "text.primary" }) {
  return (
    <Paper elevation={0} sx={{
      p: 3,
      borderRadius: 2,
      border: 1,
      borderColor: "custom.borderLight",
      bgcolor: "custom.cardLight"
    }}>
      <Typography variant="body2" color="text.secondary">{title}</Typography>
      <Typography variant="h4" sx={{ fontWeight: 800, color, mt: 0.5 }}>{value}</Typography>
      {hint && <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{hint}</Typography>}
    </Paper>
  );
}
