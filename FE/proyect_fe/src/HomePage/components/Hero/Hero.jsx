// src/components/Hero.jsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SearchBar from "../SearchBar/SearchBar";

export default function Hero() {
  const bgImage = "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1600&q=60";

  return (
    <Box component="section" sx={{
      pt: 8, pb: 8,
      backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.45)), url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "common.white"
    }}>
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Box sx={{ maxWidth: 900, mx: "auto", py: { xs: 6, md: 12 } }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: "1.8rem", md: "2.8rem" } }}>
            Financia proyectos locales y transforma tu comunidad
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4, opacity: 0.9 }}>
            Descubre y apoya las causas que te importan. Juntos, podemos crear un gran impacto.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <SearchBar />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
