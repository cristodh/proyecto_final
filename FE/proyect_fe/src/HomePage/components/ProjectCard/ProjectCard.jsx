// src/components/ProjectCard.jsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

export default function ProjectCard({ campaign, onViewProject }) {
  if (!campaign) return null;

  const currentAmount = parseFloat(campaign.current_amount || 0);
  const goalAmount = parseFloat(campaign.goal_amount || 0);
  const progress = goalAmount > 0 ? (currentAmount / goalAmount) * 100 : 0;

  const image = campaign.main_image || "https://images.unsplash.com/photo-1542614476-6a6f9a1b6f72?auto=format&fit=crop&w=1200&q=60";

  return (
    <Box sx={{
      width: { xs: 300, sm: 360 },
      borderRadius: 2,
      overflow: "hidden",
      position: "relative",
      flexShrink: 0,
      mr: 2,
      boxShadow: 4,
      display: "flex",
      flexDirection: "column"
    }}>
      <Box sx={{
        height: 0,
        paddingTop: "75%", // aspect ratio 4/3
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
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
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {campaign.name || "Sin título"}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {campaign.short_description || campaign.description?.substring(0, 60) + "..."}
          </Typography>
        </Box>

        {/* Barra de progreso */}
        <Box sx={{ mt: 2, mb: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {Math.round(progress)}%
            </Typography>
            <Typography variant="caption">
              {goalAmount > 0 ? `₡${currentAmount.toLocaleString('es-CR')}` : "No especificado"}
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={Math.min(progress, 100)} sx={{ height: 6, borderRadius: 1, backgroundColor: "rgba(255,255,255,0.3)" }} />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            size="small"
            onClick={onViewProject}
          >
            Ver Proyecto
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
