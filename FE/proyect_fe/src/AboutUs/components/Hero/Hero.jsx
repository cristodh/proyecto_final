// src/components/Hero.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Hero() {
  const bg = "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=60";

  return (
    <Box component="section" sx={{
      py: { xs: 6, sm: 8 },
      backgroundImage: `linear-gradient(rgba(13,27,18,0.4), rgba(13,27,18,0.8)), url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "common.white"
    }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Box sx={{ py: { xs: 4, sm: 6 } }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: "1.8rem", md: "2.75rem" } }}>
            Fundify: Nuestra Esencia y Nuestro Puente
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.95, maxWidth: 900, mx: "auto" }}>
            Somos el puente digital que conecta tus ganas de ayudar con proyectos que transforman realidades locales.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

