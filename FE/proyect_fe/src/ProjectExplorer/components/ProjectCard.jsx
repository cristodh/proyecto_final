import React from "react";
import { Box, Card, CardContent, Typography, Chip, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function ProjectCard({ project }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "0.25s",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <Box
        sx={{
          height: 180,
          backgroundImage: `url(${project.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Chip label={project.category} color="primary" size="small" />
          <Box display="flex" alignItems="center" gap={0.5}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="caption">{project.location}</Typography>
          </Box>
        </Box>

        <Typography fontWeight={700}>{project.title}</Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          {project.description}
        </Typography>

        <Box sx={{ height: 8, bgcolor: "grey.200", borderRadius: 5, mb: 1 }}>
          <Box
            sx={{
              height: "100%",
              width: `${project.progress}%`,
              bgcolor: "primary.main",
              borderRadius: 5,
            }}
          />
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight={700}>{project.current}</Typography>
          <Typography color="text.secondary">{project.goal}</Typography>
        </Box>

        <Button variant="contained" fullWidth sx={{ mt: 2 }}>
          Apoyar Proyecto
        </Button>
      </CardContent>
    </Card>
  );
}
