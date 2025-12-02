import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function ManagerSummary() {
  // datos de ejemplo
  const stats = [
    { id: 1, label: "Campañas Activas", value: 2 },
    { id: 2, label: "Total Recaudado", value: "$10,750" },
    { id: 3, label: "Donantes Totales", value: 148 },
  ];

  const campaigns = [
    {
      id: "c1",
      title: "Huerto Comunitario Urbano",
      progress: 85,
      subtitle: "85% completado · 25 días restantes",
    },
    {
      id: "c2",
      title: "Limpieza de la Playa Costazul",
      progress: 45,
      subtitle: "45% completado · 52 días restantes",
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
      {/* Header / Intro */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Resumen del Gestor
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Bienvenida, Ana. Aquí tienes un resumen de tu actividad y el impacto
          que estás generando.
        </Typography>
      </Box>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((s) => (
          <Grid key={s.id} item xs={12} sm={6} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                height: "100%",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                {s.label}
              </Typography>
              <Typography variant="h5" fontWeight={800} sx={{ mt: 1 }}>
                {s.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Campañas recientes */}
      <Paper
        elevation={0}
        sx={{ p: { xs: 2, md: 3 }, border: "1px solid", borderColor: "divider", borderRadius: 2 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Campañas Recientes
          </Typography>
          <Button variant="contained" size="small">
            Nueva campaña
          </Button>
        </Box>

        <List disablePadding>
          {campaigns.map((c) => (
            <ListItem
              key={c.id}
              sx={{
                p: 2,
                mb: 1,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: "divider",
                "&:hover": { backgroundColor: "action.hover" },
              }}
              secondaryAction={
                <ListItemSecondaryAction sx={{ right: 8 }}>
                  <IconButton edge="end" aria-label="more">
                    <MoreHorizIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              }
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight={700}>
                    {c.title}
                  </Typography>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <LinearProgress variant="determinate" value={c.progress} sx={{ height: 8, borderRadius: 1 }} />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                      {c.subtitle}
                    </Typography>
                  </Box>
                }
              />
              <Box sx={{ ml: 2 }}>
                <Button variant="outlined" size="small">
                  Gestionar
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
