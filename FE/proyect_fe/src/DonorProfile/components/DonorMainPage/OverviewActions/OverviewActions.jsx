// src/components/OverviewActions.jsx
import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";

export default function OverviewActions() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={0} sx={{ p: 2, border: 1, borderColor: "divider", borderRadius: 2, display: "flex", gap: 2 }}>
          <Box sx={{ width: 48, height: 48, bgcolor: "primary.50", color: "primary.main", borderRadius: 1.5, display: "grid", placeItems: "center" }}>
            <HistoryIcon />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>Ver Historial Completo</Typography>
            <Typography variant="body2" color="text.secondary">Revisa todas tus donaciones pasadas.</Typography>
            <Box sx={{ mt: 1 }}>
              <Button size="small">Ver historial</Button>
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper elevation={0} sx={{ p: 2, border: 1, borderColor: "divider", borderRadius: 2, display: "flex", gap: 2 }}>
          <Box sx={{ width: 48, height: 48, bgcolor: "primary.50", color: "primary.main", borderRadius: 1.5, display: "grid", placeItems: "center" }}>
            <FavoriteIcon />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>Gestionar Proyectos Seguidos</Typography>
            <Typography variant="body2" color="text.secondary">Mantente al día con tus proyectos favoritos.</Typography>
            <Box sx={{ mt: 1 }}>
              <Button size="small">Ver proyectos</Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
