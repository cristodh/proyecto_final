// src/components/ProjectCard.jsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ProjectCard({ title, subtitle, image }) {
  return (
    <Box sx={{
      width: { xs: 300, sm: 360 },
      borderRadius: 2,
      overflow: "hidden",
      position: "relative",
      flexShrink: 0,
      mr: 2,
      boxShadow: 4
    }}>
      <Box sx={{
        height: 0,
        paddingTop: "75%", // aspect ratio 4/3
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} />
      <Box sx={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1))",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        p: 2,
        color: "common.white"
      }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{title}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>{subtitle}</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" size="small">Ver Proyecto</Button>
        </Box>
      </Box>
    </Box>
  );
}
