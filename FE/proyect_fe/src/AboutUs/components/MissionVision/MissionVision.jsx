// src/components/MissionVision.jsx
import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CampaignIcon from "@mui/icons-material/Campaign"; // substitute for 'target'
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function MissionVision() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: { xs: 3, md: 4 }, 
                borderRadius: 3, 
                textAlign: "center", 
                bgcolor: "background.paper",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                '&:hover': {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
                }
              }}
            >
              <Box sx={{ mb: 3, color: "primary.main" }}>
                <CampaignIcon sx={{ fontSize: 48 }} />
              </Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600, 
                  color: "text.primary", 
                  mb: 2,
                  textAlign: "center"
                }}
              >
                Nuestra Misión: Conectando el Impacto
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ lineHeight: 1.6, textAlign: "center" }}
              >
                Simplificar y potenciar la filantropía local. Actuamos como un catalizador, uniendo a donantes con ideas innovadoras para construir comunidades más fuertes, proyecto a proyecto.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: { xs: 3, md: 4 }, 
                borderRadius: 3, 
                textAlign: "center", 
                bgcolor: "background.paper",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                '&:hover': {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
                }
              }}
            >
              <Box sx={{ mb: 3, color: "primary.main" }}>
                <VisibilityIcon sx={{ fontSize: 48 }} />
              </Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600, 
                  color: "text.primary", 
                  mb: 2,
                  textAlign: "center"
                }}
              >
                Nuestra Visión: Red de Confianza que Cambia Vidas
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ lineHeight: 1.6, textAlign: "center" }}
              >
                Aspiramos a ser la plataforma de referencia para el cambio social a nivel local, donde cada contribución, sin importar su tamaño, se traduce en un impacto visible, transparente y duradero.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
