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
    <Box component="section" sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
            Cómo Funciona: El Puente en Acción
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Desde la idea hasta el impacto, así es como facilitamos la conexión para generar cambios reales en tu comunidad.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <Grid item xs={12} sm={2} sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Box sx={{
                    bgcolor: "primary.main",
                    color: "#0d1b12",
                    p: 1.2,
                    borderRadius: "50%"
                  }}>
                    {s.icon}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Box sx={{ pb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary" }}>{s.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{s.text}</Typography>
                </Box>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
