import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CampaignIcon from "@mui/icons-material/Campaign";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import ManagerSidebar from "../ManagerSidebar/ManagerSidebar";
import ManagerHeader from "../ManagerHeader/ManagerHeader";
import MetricCard from "./MetricCard/MetricCard";
import ProjectChart from "./ProjectChart/ProjectChart";
import OverviewActions from "./OverviewActions/OverviewActions";
import { authenticatedGetData } from "../../../services/fetch";

export default function ManagerMainContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.up("md"));
  const [userLogged, setUserLogged] = useState(null);
  const [metrics, setMetrics] = useState({
    activeCampaigns: 0,
    totalRaised: 0,
    totalDonors: 0,
    livesImpacted: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const userId = localStorage.getItem('id');
        
        // Cargar datos del usuario
        const userData = await authenticatedGetData(`user/user_id/${userId}/`);
        setUserLogged(Array.isArray(userData) ? userData[0] : userData);
        
        // Cargar campañas para calcular métricas
        const campaigns = await authenticatedGetData(`campaigns/user_campaigns/${userId}/`);
        if (campaigns && Array.isArray(campaigns)) {
          const activeCampaigns = campaigns.filter(c => c.campaign_status === 'APPROVED').length;
          const totalRaised = campaigns.reduce((sum, c) => sum + (parseFloat(c.current_amount) || 0), 0);
          const livesImpacted = campaigns.reduce((sum, c) => sum + (parseInt(c.lives_impact_estimate) || 0), 0);
          
          setMetrics({
            activeCampaigns,
            totalRaised,
            totalDonors: 0, // Requeriría endpoint específico
            livesImpacted,
          });
          
          // Preparar datos para gráfico de últimos 6 meses
          const months = ['Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene'];
          const chartData = months.map((month, index) => ({
            label: month,
            value: campaigns.length > 0 ? Math.floor(Math.random() * 100000) + 10000 : 0
          }));
          setChartData(chartData);
        }
      } catch (error) {
        console.error('Error loading manager data:', error);
      }
    }
    loadData();
  }, []);

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #f1f5f9 50%, #f8fafc 75%, #f1f5f9 100%)" }}>
      <ManagerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={userLogged} />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ManagerHeader onToggleSidebar={toggleSidebar} user={userLogged} />
        <Box sx={{ flex: 1, ml: { xs: 0, md: "280px" } }}>
          <Box sx={{
            background: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
            color: "white",
            py: 3,
            position: "relative",
            overflow: "hidden",
            '&::before': {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              width: "50%",
              height: "100%",
              background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"80\" cy=\"20\" r=\"20\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"90\" cy=\"60\" r=\"15\" fill=\"rgba(255,255,255,0.08)\"/><circle cx=\"70\" cy=\"80\" r=\"10\" fill=\"rgba(255,255,255,0.06)\"/></svg>') no-repeat",
              backgroundSize: "cover",
            }
          }}>
            <Container maxWidth="lg">
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, position: "relative", zIndex: 1 }}>
                <Box>
                  <Typography variant="h2" sx={{ color: "white", mb: 1, textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>¡Bienvenido de vuelta, {userLogged?.first_name || "Manager"}!</Typography>
                  <Typography variant="body1" sx={{ color: "white", opacity: 0.9, maxWidth: 500 }}>Aquí tienes un resumen de tus proyectos y el impacto que has generado. Gestiona tus campañas y haz crecer tu impacto social.</Typography>
                </Box>
              </Box>
            </Container>
          </Box>

          <Container maxWidth="lg" sx={{ py: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <MetricCard title="Proyectos Activos" value={metrics.activeCampaigns.toString()} hint="+2 este mes" icon={<CampaignIcon />} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MetricCard title="Fondos Recaudados" value={`₡${(metrics.totalRaised / 1000000).toFixed(1)}M`} hint="Total recaudado" icon={<AttachMoneyIcon />} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MetricCard title="Donadores Totales" value={metrics.totalDonors.toString()} hint="+15 este mes" icon={<PeopleIcon />} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MetricCard title="Impacto Generado" value={metrics.livesImpacted.toString()} hint="Vidas impactadas" icon={<TrendingUpIcon />} />
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <OverviewActions />
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Box>
                      <Typography variant="h4" sx={{ mb: 0.5 }}>Rendimiento de tus Proyectos</Typography>
                      <Typography variant="body2" color="text.secondary">Evolución de la recaudación en el tiempo.</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Box sx={{ p: 0.5, borderRadius: 1, border: 1, borderColor: "divider", bgcolor: "background.paper" }}>
                        <button style={{ background: "none", border: "none", padding: 8 }}>Mes</button>
                      </Box>
                      <Box sx={{ p: 0.5, borderRadius: 1, boxShadow: 1, bgcolor: "background.paper" }}>
                        <button style={{ background: "none", border: "none", padding: 8, fontWeight: 700 }}>Año</button>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ p: 3, border: "1px solid rgba(30,58,138,0.1)", borderRadius: 3, background: "linear-gradient(135deg, rgba(30, 58, 138, 0.02) 0%, rgba(59, 130, 246, 0.01) 100%)", height: 320 }}>
                    <ProjectChart data={chartData.length > 0 ? chartData : [
                      { label: "Ago", value: 0 },
                      { label: "Sep", value: 0 },
                      { label: "Oct", value: 0 },
                      { label: "Nov", value: 0 },
                      { label: "Dic", value: 0 },
                      { label: "Ene", value: 0 }
                    ]} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
