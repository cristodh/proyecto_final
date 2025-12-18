// src/components/Hero.jsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import fondoHome from "../../../imgs/Fondo_home.jpg";

export default function Hero() {
  const bgImage = fondoHome;

  return (
    <Box component="section" sx={{
      position: "relative",
      overflow: "hidden",
      pt: 8, pb: 8,
      color: "common.white",
      // Capa de fondo con blur
      "&::before": {
        content: "''",
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.45)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center 35%", // desplaza más para mostrar la parte superior
        filter: "blur(3px)",
        transform: "scale(1.05)", // evita bordes visibles al hacer blur
        zIndex: 0
      }
    }}>
      <Container maxWidth="lg" sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <Box sx={{ maxWidth: 900, mx: "auto", py: { xs: 6, md: 12 } }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: "1.8rem", md: "2.8rem" } }}>
            Financia proyectos locales y transforma tu comunidad
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4, opacity: 0.9 }}>
            Descubre y apoya las causas que te importan. Juntos, podemos crear un gran impacto.
          </Typography>

        </Box>
      </Container>
    </Box>
  );
}
