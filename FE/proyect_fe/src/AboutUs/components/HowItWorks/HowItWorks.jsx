// src/components/HowItWorks.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArticleIcon from "@mui/icons-material/Article";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

const steps = [
  {
    title: "1. Un Proyecto se Une a la Plataforma",
    text: "Un creador con una idea de impacto social presenta su proyecto. Nuestro equipo revisa su legitimidad y viabilidad para asegurar que cada causa en Fundify es confiable y está lista para recibir apoyo.",
    icon: <ArticleIcon />
  },
  {
    title: "2. Los Donantes Apoyan la Causa",
    text: "Los donantes exploran los proyectos verificados y contribuyen de forma fácil y segura. Cada donación es un paso más para que el proyecto alcance su meta y se haga realidad.",
    icon: <VolunteerActivismIcon />
  },
  {
    title: "3. Se Genera el Impacto",
    text: "Una vez financiado, los creadores utilizan los fondos y publican actualizaciones sobre el progreso. Los donantes pueden ver en tiempo real cómo su apoyo se transforma en resultados concretos y transparentes.",
    icon: <TrendingUpIcon />
  },
  {
    title: "4. La Comunidad se Fortalece",
    text: "Al finalizar, el proyecto comparte su impacto final, cerrando un ciclo de colaboración exitoso. El puente de Fundify ha conectado una necesidad con una solución, fortaleciendo el tejido social.",
    icon: <LeaderboardIcon />
  }
];

export default function HowItWorks() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600, 
              color: "text.primary",
              mb: 2
            }}
          >
            Cómo Funciona: El Puente en Acción
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 600, 
              mx: "auto",
              lineHeight: 1.6
            }}
          >
            Desde la idea hasta el impacto, así es como facilitamos la conexión para generar cambios reales en tu comunidad.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {steps.map((s, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Box sx={{ 
                display: "flex", 
                alignItems: "flex-start", 
                gap: 3,
                p: 3,
                borderRadius: 2,
                bgcolor: "background.paper",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                transition: "transform 0.2s ease",
                '&:hover': {
                  transform: "translateY(-2px)"
                }
              }}>
                <Box sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  p: 1.5,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 56,
                  height: 56,
                  flexShrink: 0
                }}>
                  {s.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      color: "text.primary",
                      mb: 1.5,
                      lineHeight: 1.3
                    }}
                  >
                    {s.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ lineHeight: 1.6 }}
                  >
                    {s.text}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
