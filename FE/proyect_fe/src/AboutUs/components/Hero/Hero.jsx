// src/components/Hero.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Hero() {
  const bg = "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=60";

  return (
    <Box component="section" sx={{
      py: { xs: 8, sm: 10 },
      backgroundImage: `linear-gradient(rgba(13,27,18,0.4), rgba(13,27,18,0.8)), url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "common.white",
      display: "flex",
      alignItems: "center",
      minHeight: { xs: "50vh", md: "60vh" }
    }}>
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Box sx={{ px: { xs: 2, sm: 4 } }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              mb: 3, 
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.2,
              letterSpacing: "-0.02em"
            }}
          >
            Fundify: Nuestra Esencia y Nuestro Puente
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 0, 
              opacity: 0.95, 
              maxWidth: 700, 
              mx: "auto",
              fontWeight: 400,
              lineHeight: 1.6,
              fontSize: { xs: "1.1rem", md: "1.25rem" }
            }}
          >
            Somos el puente digital que conecta tus ganas de ayudar con proyectos que transforman realidades locales.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

