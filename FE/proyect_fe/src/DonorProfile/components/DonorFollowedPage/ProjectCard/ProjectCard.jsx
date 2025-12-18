// src/components/projects/ProjectCard.jsx
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";

export default function ProjectCard({
  title,
  org,
  image,
  status = "En Progreso",
  eta = "Finaliza en XX días",
  progress = 0,
  current = 0,
  goal = 0,
  primaryAction = { label: "Ver Actualizaciones", onClick: () => {} },
  favorite = true,
  onToggleFavorite = () => {}
}) {
  const statusColorMap = {
    "En Progreso": { color: "warning", bg: "warning.main", alpha: 0.12 },
    "Financiado": { color: "success", bg: "success.main", alpha: 0.12 },
    "Nueva Meta": { color: "info", bg: "info.main", alpha: 0.12 },
    "Finalizada": { color: "neutral", bg: "neutral.main", alpha: 0.12 }
  };

  const cfg = statusColorMap[status] ?? statusColorMap["En Progreso"];

  return (
    <Card 
      elevation={0} 
      sx={{ 
        border: 1, 
        borderColor: "divider", 
        borderRadius: 2,
        height: 250,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <CardContent sx={{ 
        p: 2, 
        display: "flex", 
        flexDirection: "column", 
        height: "100%",
        overflow: "hidden",
        "&:last-child": {
          paddingBottom: 2
        }
      }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 2, alignItems: "flex-start" }}>
          <Box sx={{ display: "flex", gap: 2, flex: 1, minWidth: 0, alignItems: "flex-start" }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 1.5,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                flexShrink: 0
              }}
            />
            <Box sx={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 700,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  lineHeight: 1.2,
                  height: "2.4em",
                  mb: 0.5
                }}
              >
                {title}
              </Typography>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ 
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "block"
                }}
              >
                Por: {org}
              </Typography>
            </Box>
          </Box>

          <Button
            onClick={onToggleFavorite}
            variant="text"
            size="small"
            sx={{ minWidth: 32, width: 32, height: 32, p: 0.5, color: "primary.main", flexShrink: 0 }}
            aria-label="toggle favorite"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px", fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
          </Button>
        </Box>

        {/* Progress bar and funding info */}
        <Box sx={{ mt: 2, mb: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
              ₡{current.toLocaleString()} recaudado
            </Typography>
            <Typography variant="caption" fontWeight={600} sx={{ fontSize: "0.7rem" }}>
              {Math.round(progress)}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={Math.min(progress, 100)} 
            sx={{ 
              height: 6, 
              borderRadius: 3,
              bgcolor: "grey.200",
              "& .MuiLinearProgress-bar": {
                borderRadius: 3,
                bgcolor: cfg.bg
              }
            }} 
          />
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem", mt: 0.5, display: "block" }}>
            Meta: ₡{goal.toLocaleString()}
          </Typography>
        </Box>

        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          gap: 1,
          flexWrap: "nowrap"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1, minWidth: 0 }}>
            <Chip
              label={status}
              size="small"
              sx={{
                bgcolor: `${cfg.bg}22`,
                color: cfg.bg,
                fontWeight: 600,
                borderRadius: 1,
                flexShrink: 0,
                fontSize: "0.7rem",
                height: 24
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, minWidth: 0, overflow: "hidden" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>schedule</span>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ 
                  fontSize: "0.7rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
              >
                {eta}
              </Typography>
            </Box>
          </Box>

          <Button 
            onClick={primaryAction.onClick} 
            variant="contained" 
            size="small"
            sx={{ 
              flexShrink: 0,
              fontSize: "0.7rem",
              py: 0.5,
              px: 1,
              minWidth: "auto"
            }}
          >
            {primaryAction.label}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
