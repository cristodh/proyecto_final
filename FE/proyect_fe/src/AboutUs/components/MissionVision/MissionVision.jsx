// src/components/MissionVision.jsx
import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CampaignIcon from "@mui/icons-material/Campaign"; // substitute for 'target'
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function MissionVision() {
  return (
    <Box component="section" sx={{ py: { xs: 4, md: 8 }, px: 2 }}>
      <Grid container spacing={3} maxWidth="lg" sx={{ mx: "auto" }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 2, textAlign: "center", bgcolor: "background.paper" }}>
            <Box sx={{ mb: 2, color: "primary.main" }}>
              <CampaignIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", mb: 1 }}>
              Nuestra Misión: Conectando el Impacto
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Simplificar y potenciar la filantropía local. Actuamos como un catalizador, uniendo a donantes con ideas innovadoras para construir comunidades más fuertes, proyecto a proyecto.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 2, textAlign: "center", bgcolor: "background.paper" }}>
            <Box sx={{ mb: 2, color: "primary.main" }}>
              <VisibilityIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", mb: 1 }}>
              Nuestra Visión: Red de Confianza que Cambia Vidas
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aspiramos a ser la plataforma de referencia para el cambio social a nivel local, donde cada contribución, sin importar su tamaño, se traduce en un impacto visible, transparente y duradero.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
