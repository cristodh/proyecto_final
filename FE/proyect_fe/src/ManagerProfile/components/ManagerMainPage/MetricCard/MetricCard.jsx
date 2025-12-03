// src/ManagerProfile/components/ManagerMainPage/MetricCard/MetricCard.jsx
import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function MetricCard({ title, value, hint, icon }) {
  const colors = {
    "Proyectos Activos": { bg: "linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(30, 58, 138, 0.05) 100%)", iconBg: "rgba(30, 58, 138, 0.1)", iconColor: "#1E3A8A" },
    "Fondos Recaudados": { bg: "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)", iconBg: "rgba(34, 197, 94, 0.1)", iconColor: "#059669" },
    "Donadores Totales": { bg: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)", iconBg: "rgba(59, 130, 246, 0.1)", iconColor: "#3B82F6" },
    "Impacto Generado": { bg: "linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)", iconBg: "rgba(96, 165, 250, 0.1)", iconColor: "#60A5FA" }
  };
  
  const cardColors = colors[title] || { bg: "linear-gradient(135deg, rgba(30, 58, 138, 0.08) 0%, rgba(30, 58, 138, 0.04) 100%)", iconBg: "rgba(30, 58, 138, 0.1)", iconColor: "#1E3A8A" };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 3, 
        border: "1px solid rgba(30,58,138,0.05)", 
        display: "flex", 
        gap: 2, 
        alignItems: "center",
        bgcolor: "#ffffff",
        background: cardColors.bg,
        boxShadow: "0 4px 20px rgba(30,58,138,0.06)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        '&:hover': {
          boxShadow: "0 8px 32px rgba(30,58,138,0.12)",
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