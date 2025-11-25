// src/components/projects/ProjectCard.jsx
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

export default function ProjectCard({
  title,
  org,
  image,
  status = "En Progreso",
  eta = "Finaliza en XX días",
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
    <Card elevation={0} sx={{ border: 1, borderColor: "divider", borderRadius: 2 }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: 1.5,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                flexShrink: 0
              }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{title}</Typography>
              <Typography variant="body2" color="text.secondary">Por: {org}</Typography>
            </Box>
          </Box>

          <Button
            onClick={onToggleFavorite}
            variant="text"
            sx={{ minWidth: 40, color: "primary.main" }}
            aria-label="toggle favorite"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
          </Button>
        </Box>

        <Box sx={{ mt: 2, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={status}
              size="small"
              sx={{
                bgcolor: `${cfg.bg}22`,
                color: cfg.bg,
                fontWeight: 700,
                borderRadius: 1
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", ml: 1 }}>
              <span className="material-symbols-outlined">schedule</span>
              <Typography variant="caption" color="text.secondary">{eta}</Typography>
            </Box>
          </Box>

          <Button onClick={primaryAction.onClick} variant="contained" size="small">{primaryAction.label}</Button>
        </Box>
      </CardContent>
    </Card>
  );
}
