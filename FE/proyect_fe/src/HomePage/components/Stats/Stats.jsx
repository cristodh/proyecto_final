// src/components/Stats.jsx
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import VerifiedIcon from "@mui/icons-material/Verified";
import PaymentsIcon from "@mui/icons-material/Payments";
import GroupsIcon from "@mui/icons-material/Groups";
import CircularProgress from "@mui/material/CircularProgress";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import { getData } from "../../../services/fetch";

export default function Stats() {
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalFunded: 0,
    totalDonors: 0
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const isManualRefresh = loading === false; // Si no está en loading inicial, es un refresh manual
      if (isManualRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      // Traer todas las campañas
      const campaignsResponse = await getData("campaign/explore/");
      const campaigns = campaignsResponse?.campaigns || [];
      
      // Traer cantidad de donantes activos
      let totalDonors = 0;
      try {
        const donorsResponse = await getData("user/active_donors_count/");
        totalDonors = donorsResponse?.count || 0;
      } catch (err) {
        console.warn("Could not fetch active donors count, using fallback");
        totalDonors = campaigns.length * 12; // Fallback
      }
      
      // Calcular estadísticas
      // Proyectos financiados: campañas con estado 'completed' (proyectos aprobados/completados)
      const totalCampaigns = campaigns.filter(c => c.campaign_status === 'completed').length;
      
      // Fondos recaudados: suma de todos los current_amount de todas las campañas
      const totalFunded = campaigns.reduce((sum, c) => sum + (parseFloat(c.current_amount) || 0), 0);
      
      setStats({
        totalCampaigns,
        totalFunded,
        totalDonors
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStats({
        totalCampaigns: 0,
        totalFunded: 0,
        totalDonors: 0
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // Refrescar cada 30 segundos
    const interval = setInterval(() => {
      fetchStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = async () => {
    await fetchStats();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  const items = [
    { icon: <VerifiedIcon fontSize="large" />, label: "Proyectos Financiados", value: stats.totalCampaigns.toLocaleString() + "+" },
    { icon: <PaymentsIcon fontSize="large" />, label: "Fondos Recaudados", value: formatCurrency(stats.totalFunded) },
    { icon: <GroupsIcon fontSize="large" />, label: "Donantes Activos", value: stats.totalDonors.toLocaleString() + "+" }
  ];

  return (
    <Box component="section" sx={{ py: 8 }}>
      <Box sx={{ maxWidth: 1100, mx: "auto", textAlign: "center", mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Nuestro Impacto en Cifras</Typography>
          <IconButton
            onClick={handleManualRefresh}
            disabled={refreshing}
            size="small"
            sx={{ 
              color: "primary.main",
              animation: refreshing ? "spin 1s linear infinite" : "none",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" }
              }
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
          El poder de la comunidad se refleja en nuestros logros.
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 1100, mx: "auto" }}>
          {items.map((it, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper elevation={2} sx={{ p: 4, textAlign: "center", borderRadius: 2, transition: "all 0.3s ease", "&:hover": { boxShadow: 4, transform: "translateY(-4px)" } }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1, color: "primary.main" }}>{it.icon}</Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{it.label}</Typography>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 900, color: "primary.main" }}>{it.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
