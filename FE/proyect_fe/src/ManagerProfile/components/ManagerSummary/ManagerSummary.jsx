import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { authenticatedGetData } from "../../../services/fetch";

export default function ManagerSummary({ user }) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeCampaigns: 0,
    totalRaised: "$0",
    totalDonors: 0,
  });
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const userId = localStorage.getItem('id');
        
        // Cargar campañas del manager
        const campaignsData = await authenticatedGetData(`campaigns/user_campaigns/${userId}/`);
        
        if (campaignsData && Array.isArray(campaignsData)) {
          setCampaigns(campaignsData);
          
          // Calcular estadísticas
          const activeCampaigns = campaignsData.filter(c => c.campaign_status === 'APPROVED').length;
          const totalRaised = campaignsData.reduce((sum, c) => sum + (parseFloat(c.current_amount) || 0), 0);
          
          setStats({
            activeCampaigns,
            totalRaised: `$${totalRaised.toLocaleString()}`,
            totalDonors: 0, // Este dato requeriría un endpoint específico
          });
        }
      } catch (error) {
        console.error('Error loading manager data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const calculateProgress = (current, goal) => {
    if (!goal || goal === 0) return 0;
    return Math.min(Math.round((current / goal) * 100), 100);
  };

  const getDaysRemaining = (endDate) => {
    if (!endDate) return 0;
    const today = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
      {/* Header / Intro */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Resumen del Gestor
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Bienvenido/a, {user?.first_name}. Aquí tienes un resumen de tu actividad y el impacto
          que estás generando.
        </Typography>
      </Box>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
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
              Campañas Activas
            </Typography>
            <Typography variant="h5" fontWeight={800} sx={{ mt: 1 }}>
              {stats.activeCampaigns}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
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
              Total Recaudado
            </Typography>
            <Typography variant="h5" fontWeight={800} sx={{ mt: 1 }}>
              {stats.totalRaised}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
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
              Total de Campañas
            </Typography>
            <Typography variant="h5" fontWeight={800} sx={{ mt: 1 }}>
              {campaigns.length}
            </Typography>
          </Paper>
        </Grid>
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

        {campaigns.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No tienes campañas todavía. ¡Crea tu primera campaña!
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {campaigns.slice(0, 5).map((c) => {
              const progress = calculateProgress(c.current_amount, c.goal_amount);
              const daysRemaining = getDaysRemaining(c.end_date);
              
              return (
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
                        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 1 }} />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                          {progress}% completado · {daysRemaining} días restantes
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
              );
            })}
          </List>
        )}
      </Paper>
    </Box>
  );
}
