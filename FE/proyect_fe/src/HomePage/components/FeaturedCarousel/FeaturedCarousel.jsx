// src/components/FeaturedCarousel.jsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ProjectCard from "../ProjectCard/ProjectCard";

const projects = [
  {
    title: "Parque Comunitario 'La Esperanza'",
    subtitle: "Un espacio verde para que nuestros niños jueguen seguros.",
    image: "https://images.unsplash.com/photo-1542614476-6a6f9a1b6f72?auto=format&fit=crop&w=1200&q=60"
  },
  {
    title: "Comedor Social 'Manos Unidas'",
    subtitle: "Asegurando una comida caliente para quienes más lo necesitan.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=60"
  },
  {
    title: "Murales que Unen Vecindarios",
    subtitle: "Llenando de color y arte las calles de nuestro barrio.",
    image: "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?auto=format&fit=crop&w=1200&q=60"
  }
];

export default function FeaturedCarousel() {
  return (
    <Box component="section" sx={{ py: 8, bgcolor: "action.hover" }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Campañas Destacadas</Typography>
          <Typography component="a" href="#" sx={{ color: "primary.main", fontWeight: 700, textDecoration: "none" }}>Ver todas</Typography>
        </Box>

        <Box sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          "& > div": { scrollSnapAlign: "center" },
          py: 1,
          // hide scrollbar (some browsers)
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" }
        }}>
          {projects.map((p, i) => (
            <ProjectCard key={i} title={p.title} subtitle={p.subtitle} image={p.image} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
