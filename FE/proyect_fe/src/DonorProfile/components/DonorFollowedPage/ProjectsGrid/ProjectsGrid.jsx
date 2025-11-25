// src/components/projects/ProjectsGrid.jsx
import React from "react";
import Grid from "@mui/material/Grid";
import ProjectCard from "../ProjectCard/ProjectCard";

/**
 * Receives `projects` array and renders a responsive grid of ProjectCard.
 * project: { id, title, org, image, status, eta, type }
 */
export default function ProjectsGrid({ projects = [] , onToggleFavorite = () => {}}) {
  if (!projects.length) {
    return <p style={{ color: "gray" }}>No hay proyectos para mostrar.</p>;
  }

  return (
    <Grid container spacing={3}>
      {projects.map((p) => (
        <Grid key={p.id} item xs={12} sm={6}>
          <ProjectCard
            {...p}
            onToggleFavorite={() => onToggleFavorite(p.id)}
            primaryAction={{ label: p.primaryLabel ?? "Ver Actualizaciones", onClick: () => p.onPrimary?.(p.id) }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
