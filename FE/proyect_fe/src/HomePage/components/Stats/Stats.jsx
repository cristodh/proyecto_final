// src/components/Stats.jsx
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import VerifiedIcon from "@mui/icons-material/Verified";
import PaymentsIcon from "@mui/icons-material/Payments";
import GroupsIcon from "@mui/icons-material/Groups";

export default function Stats() {
  const items = [
    { icon: <VerifiedIcon fontSize="large" />, label: "Proyectos Financiados", value: "1,200+" },
    { icon: <PaymentsIcon fontSize="large" />, label: "Fondos Recaudados", value: "$5,400,000" },
    { icon: <GroupsIcon fontSize="large" />, label: "Donantes Activos", value: "15,000+" }
  ];

  return (
    <Box component="section" sx={{ py: 8 }}>
      <Box sx={{ maxWidth: 1100, mx: "auto", textAlign: "center", mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>Nuestro Impacto en Cifras</Typography>
        <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
          El poder de la comunidad se refleja en nuestros logros.
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 1100, mx: "auto" }}>
        {items.map((it, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Paper elevation={2} sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>{it.icon}</Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{it.label}</Typography>
              <Typography variant="h4" sx={{ mt: 1, fontWeight: 900 }}>{it.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
