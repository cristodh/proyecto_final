import React from "react";
import { Box } from "@mui/material";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: 1,
    category: "Educación",
    location: "San José, CR",
    title: "Aulas Digitales para el Futuro",
    description: "Llevando tecnología a escuelas rurales.",
    progress: 75,
    current: "CRC 4,275,000",
    goal: "CRC 5,700,000",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350",
  },
  {
    id: 2,
    category: "Medio Ambiente",
    location: "Alajuela, CR",
    title: "Pulmón Verde para la Ciudad",
    description: "Reforestación de zonas urbanas.",
    progress: 45,
    current: "CRC 1,282,500",
    goal: "CRC 2,850,000",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
  },
];

export default function ProjectGrid() {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
      gap={3}
    >
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </Box>
  );
}
