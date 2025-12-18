import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import { authenticatedGetData } from "../../../services/fetch";

export default function ManagerCampaigns({ user }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCampaigns() {
      try {
        setLoading(true);
        const userId = localStorage.getItem('id');
        const data = await authenticatedGetData(`campaigns/user_campaigns/${userId}/`);
        setCampaigns(data || []);
        setError(null);
      } catch (err) {
        console.error('Error loading campaigns:', err);
        setError('No se pudieron cargar las campañas');
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    }
    loadCampaigns();
  }, []);

  const calculateProgress = (current, goal) => {
    if (!goal || goal === 0) return 0;
    return Math.min(Math.round((current / goal) * 100), 100);
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      PENDING: "Pendiente",
      APPROVED: "Activa",
      REJECTED: "Rechazada",
      COMPLETED: "Completada",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    if (status === "APPROVED") return "success";
    if (status === "COMPLETED") return "primary";
    if (status === "REJECTED") return "error";
    return "warning";
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">{error}</Alert>
    );
  }

  if (campaigns.length === 0) {
    return (
      <Alert severity="info">No tienes campañas creadas aún</Alert>
    );
  }

  return (
    <Box>
      {/* Título */}
      <Typography variant="h4" fontWeight="700" mb={3}>
        Campañas
      </Typography>

      {/* Grid de campañas */}
      <Grid container spacing={3}>
        {campaigns.map((c) => {
          const progress = calculateProgress(c.current_amount, c.goal_amount);
          const statusLabel = getStatusLabel(c.campaign_status);
          const statusColor = getStatusColor(c.campaign_status);

          return (
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
                {c.main_image && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={c.main_image}
                    alt={c.title}
                  />
                )}

                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Estado */}
                  <Chip
                    label={statusLabel}
                    color={statusColor}
                    size="small"
                    sx={{ mb: 1 }}
                  />

                  {/* Título */}
                  <Typography variant="h6" fontWeight="600" gutterBottom>
                    {c.title}
                  </Typography>

                  {/* Descripción */}
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {c.short_description}
                  </Typography>

                  {/* Barra de progreso */}
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      mb: 1.5,
                    }}
                  />

                  {/* % */}
                  <Typography variant="body2" fontWeight="600">
                    {progress}% recaudado (${c.current_amount} de ${c.goal_amount})
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
          );
        })}
      </Grid>
    </Box>
  );
}
