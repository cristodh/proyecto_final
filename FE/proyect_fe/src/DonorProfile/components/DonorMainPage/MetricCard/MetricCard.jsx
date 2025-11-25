// src/components/MetricCard.jsx
import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function MetricCard({ title, value, hint, icon }) {
  const colors = {
    "Total Donado": { bg: "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)", iconBg: "rgba(34, 197, 94, 0.1)", iconColor: "#059669" },
    "Proyectos Apoyados": { bg: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.05) 100%)", iconBg: "rgba(99, 102, 241, 0.1)", iconColor: "#4F46E5" },
    "Contenido Moderado": { bg: "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)", iconBg: "rgba(168, 85, 247, 0.1)", iconColor: "#7C3AED" },
    "Impacto Total Generado": { bg: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%)", iconBg: "rgba(245, 158, 11, 0.1)", iconColor: "#D97706" }
  };
  
  const cardColors = colors[title] || { bg: "linear-gradient(135deg, rgba(42, 157, 143, 0.08) 0%, rgba(42, 157, 143, 0.04) 100%)", iconBg: "rgba(42, 157, 143, 0.1)", iconColor: "#2A9D8F" };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 3, 
        border: "1px solid rgba(0,0,0,0.05)", 
        display: "flex", 
        gap: 2, 
        alignItems: "center",
        bgcolor: "#ffffff",
        background: cardColors.bg,
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        '&:hover': {
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          transform: "translateY(-2px)",
        },
        '&::before': {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: 100,
          height: 100,
          background: `radial-gradient(circle, ${cardColors.iconColor}15 0%, transparent 70%)`,
          borderRadius: "50%",
          transform: "translate(30px, -30px)",
        },
      }}
    >
      <Box 
        sx={{ 
          width: 56, 
          height: 56, 
          borderRadius: 2, 
          display: "grid", 
          placeItems: "center", 
          bgcolor: cardColors.iconBg, 
          color: cardColors.iconColor,
          boxShadow: `0 4px 12px ${cardColors.iconColor}30`,
          position: "relative",
          zIndex: 1,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, position: "relative", zIndex: 1 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: "#64748b", 
            fontWeight: 500, 
            mb: 0.5,
            textTransform: "uppercase",
            fontSize: "0.65rem",
            letterSpacing: "0.05em"
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            color: "#1a202c",
            letterSpacing: "-0.02em",
            mb: hint ? 0.5 : 0,
            fontSize: "1.1rem"
          }}
        >
          {value}
        </Typography>
        {hint && (
          <Typography 
            variant="caption" 
            sx={{ 
              color: cardColors.iconColor, 
              fontWeight: 500,
              bgcolor: cardColors.iconBg,
              px: 1,
              py: 0.25,
              borderRadius: 1,
              fontSize: "0.65rem"
            }}
          >
            {hint}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
