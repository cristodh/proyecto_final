import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Alert,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { authenticatedGetData } from "../../../services/fetch";

export default function Statistics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    summaryCards: [],
    campaignFunds: [],
    donorsChart: [],
  });

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const userId = localStorage.getItem('id');
        
        // Cargar campañas del usuario
        const campaigns = await authenticatedGetData(`campaigns/user_campaigns/${userId}/`);
        
        if (campaigns && Array.isArray(campaigns)) {
          // Calcular estadísticas
          const last30DaysStart = new Date();
          last30DaysStart.setDate(last30DaysStart.getDate() - 30);
          
          const totalRaised = campaigns.reduce((sum, c) => sum + (parseFloat(c.current_amount) || 0), 0);
          const avgProgress = campaigns.length > 0 
            ? Math.round(campaigns.reduce((sum, c) => {
                const progress = (parseFloat(c.current_amount) || 0) / (parseFloat(c.goal_amount) || 1) * 100;
                return sum + progress;
              }, 0) / campaigns.length)
            : 0;
          
          const summaryCards = [
            {
              icon: "volunteer_activism",
              label: "Recaudación Total",
              value: `$${totalRaised.toLocaleString()}`,
            },
            {
              icon: "moving",
              label: "Progreso Medio de Campañas",
              value: `${avgProgress}%`,
            },
            {
              icon: "campaign",
              label: "Total de Campañas",
              value: campaigns.length.toString(),
            },
          ];
          
          // Fondos por campaña
          const campaignFunds = campaigns.map(c => ({
            name: c.title.substring(0, 20),
            value: parseFloat(c.current_amount) || 0,
            progress: Math.min(100, Math.round((parseFloat(c.current_amount) || 0) / (parseFloat(c.goal_amount) || 1) * 100)),
          }));
          
          // Donantes por campaña (necesitaría endpoint específico)
          const donorsChart = campaigns.map(c => ({
            name: c.title.substring(0, 15),
            donors: 0, // Requeriría endpoint adicional
          }));
          
          setStats({
            summaryCards,
            campaignFunds: campaignFunds.slice(0, 5),
            donorsChart: donorsChart.slice(0, 5),
          });
          setError(null);
        }
      } catch (err) {
        console.error('Error loading statistics:', err);
        setError('No se pudieron cargar las estadísticas');
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* TITLE */}
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Informes y Estadísticas
        </Typography>
        <Typography color="text.secondary">
          Visualiza el rendimiento y el impacto de tus campañas.
        </Typography>
      </Box>

      {/* SUMMARY CARDS */}
      <Grid container spacing={3}>
        {stats.summaryCards.map((card, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
              <Box
                sx={{
                  fontSize: 36,
                  color: "primary.main",
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                }}
                className="material-symbols-outlined"
              >
                {card.icon}
              </Box>
              <Typography color="text.secondary" fontSize={14} fontWeight={500}>
                {card.label}
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* FUNDS + DONORS CHART */}
      <Grid container spacing={4}>
        {/* FUNDS PER CAMPAIGN */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Fondos Recaudados por Campaña
            </Typography>

            {stats.campaignFunds && stats.campaignFunds.length > 0 ? (
              stats.campaignFunds.map((item, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography fontSize={14} fontWeight={500} color="text.secondary">
                      {item.name}
                    </Typography>
                    <Typography fontSize={14} fontWeight={500}>
                      ${item.value.toLocaleString()}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      height: 10,
                      borderRadius: 50,
                      backgroundColor: "grey.200",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${item.progress}%`,
                        height: "100%",
                        borderRadius: 50,
                        backgroundColor: "warning.main",
                      }}
                    />
                  </Box>
                </Box>
              ))
            ) : (
              <Typography color="text.secondary">Sin campañas</Typography>
            )}
          </Paper>
        </Grid>

        {/* DONORS BAR CHART */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Campañas Activas
            </Typography>

            {stats.donorsChart && stats.donorsChart.length > 0 ? (
              <Box sx={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                  <BarChart data={stats.donorsChart}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="donors" fill="#E9C46A" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <Typography color="text.secondary">Sin datos disponibles</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
