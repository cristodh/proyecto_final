import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Button,
  Chip,
} from "@mui/material";

export default function ManagerCampaigns() {
  // Ejemplo de campañas — esto normalmente vendrá de tu API
  const campaigns = [
    {
      id: 1,
      title: "Becas para estudiantes",
      description:
        "Apoya a jóvenes talentosos para que continúen sus estudios universitarios.",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&w=800",
      progress: 70,
      status: "Activa",
    },
    {
      id: 2,
      title: "Refugio de animales",
      description:
        "Ayuda a rescatar y alimentar animales de la calle.",
      image:
        "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&w=800",
      progress: 45,
      status: "Activa",
    },
    {
      id: 3,
      title: "Centro comunitario",
      description:
        "Construcción de un espacio para actividades culturales y deportivas.",
      image:
        "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&w=800",
      progress: 90,
      status: "Completada",
    },
  ];

  return (
    <Box>
      {/* Título */}
      <Typography variant="h4" fontWeight="700" mb={3}>
        Campañas
      </Typography>

      {/* Grid de campañas */}
      <Grid container spacing={3}>
        {campaigns.map((c) => (
          <Grid item xs={12} md={6} lg={4} key={c.id}>
            <Card
              elevation={2}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Imagen */}
              <CardMedia
                component="img"
                height="180"
                image={c.image}
                alt={c.title}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                {/* Estado */}
                <Chip
                  label={c.status}
                  color={c.status === "Activa" ? "success" : "primary"}
                  size="small"
                  sx={{ mb: 1 }}
                />

                {/* Título */}
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  {c.title}
                </Typography>

                {/* Descripción */}
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {c.description}
                </Typography>

                {/* Barra de progreso */}
                <LinearProgress
                  variant="determinate"
                  value={c.progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    mb: 1.5,
                  }}
                />

                {/* % */}
                <Typography variant="body2" fontWeight="600">
                  {c.progress}% recaudado
                </Typography>

                {/* Botón */}
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 2, borderRadius: 2 }}
                >
                  Ver detalles
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
