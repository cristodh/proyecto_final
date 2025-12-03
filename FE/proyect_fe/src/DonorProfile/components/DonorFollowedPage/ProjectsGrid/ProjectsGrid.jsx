// src/components/projects/ProjectsGrid.jsx
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProjectCard from "../ProjectCard/ProjectCard";

/**
 * Receives `projects` array and renders a responsive grid of ProjectCard.
 * project: { id, title, org, image, status, eta, type }
 */
export default function ProjectsGrid({ projects = [] , onToggleFavorite = () => {}}) {
  if (!projects.length) {
    return (
      <Box sx={{ 
        textAlign: "center", 
        py: 4, 
        color: "text.secondary",
        minHeight: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Typography variant="body1">No hay proyectos para mostrar.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: 400 }}>
      <Box sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 3,
        "& > *": {
          height: "200px"
        }
      }}>
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            {...p}
            onToggleFavorite={() => onToggleFavorite(p.id)}
            primaryAction={{ label: p.primaryLabel ?? "Ver Actualizaciones", onClick: () => p.onPrimary?.(p.id) }}
          />
        ))}
      </Box>
    </Box>
  );
}
