import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import StatCard from "../../../components/StatCard/StatCard";
import CampaignTable from "../../../components/CampaignTable/CampaignTable";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardMain() {
  const [loading, setLoading] = useState(true);
  const [ecosystemData, setEcosystemData] = useState([]);
  const [moderationData, setModerationData] = useState([]);
  const [stats, setStats] = useState({
    pendingCampaigns: 0,
    totalDonations: 0,
    moderatedContent: 0,
    totalImpact: 0,
  });

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // Cargar campañas desde endpoint público
        let campaigns = [];
        try {
          const campaignsResponse = await fetch('http://127.0.0.1:8000/campaigns/explore/');
          if (campaignsResponse.ok) {
            campaigns = await campaignsResponse.json();
            campaigns = Array.isArray(campaigns) ? campaigns : [];
          }
        } catch (e) {
          console.warn('No se pudieron cargar campañas:', e);
        }
        
        // Cargar donaciones
        let donations = [];
        try {
          const token = localStorage.getItem('token');
          const donationsResponse = await fetch('http://127.0.0.1:8000/campaigns/donations/', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          if (donationsResponse.ok) {
            donations = await donationsResponse.json();
            donations = Array.isArray(donations) ? donations : [];
          }
        } catch (e) {
          console.warn('No se pudieron cargar donaciones:', e);
        }
        
        // Si no hay datos, usar datos por defecto
        if (campaigns.length === 0 && donations.length === 0) {
          campaigns = [];
          donations = [];
        }
        
        // Calcular estadísticas
        const pendingCampaigns = campaigns.filter(c => c.campaign_status === 'PENDING').length;
        const totalDonations = donations.length;
        const totalRaised = donations.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
        const approvedContent = campaigns.filter(c => c.campaign_status === 'APPROVED').length;
        
        setStats({
          pendingCampaigns,
          totalDonations,
          moderatedContent: approvedContent,
          totalImpact: totalRaised,
        });
        
        // Generar datos de ecosistema (últimos 6 meses)
        const currentMonth = new Date().getMonth();
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const last6Months = [];
        
        for (let i = 5; i >= 0; i--) {
          const monthIndex = (currentMonth - i + 12) % 12;
          last6Months.push({
            month: months[monthIndex],
            campaigns: campaigns.filter(c => {
              try {
                return new Date(c.created_at).getMonth() === monthIndex;
              } catch {
                return false;
              }
            }).length,
            users: 0,
            donations: donations.filter(d => {
              try {
                return new Date(d.created_at).getMonth() === monthIndex;
              } catch {
                return false;
              }
            }).length,
          });
        }
        
        setEcosystemData(last6Months);
        
        // Datos de moderación
        const approveds = campaigns.filter(c => c.campaign_status === 'APPROVED').length;
        const pendings = campaigns.filter(c => c.campaign_status === 'PENDING').length;
        const rejecteds = campaigns.filter(c => c.campaign_status === 'REJECTED').length;
        
        setModerationData([
          { category: 'Aprobados', value: approveds, color: '#10B981' },
          { category: 'Pendientes', value: pendings, color: '#F59E0B' },
          { category: 'Rechazados', value: rejecteds, color: '#EF4444' }
        ]);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Usar datos por defecto en caso de error
        setStats({
          pendingCampaigns: 0,
          totalDonations: 0,
          moderatedContent: 0,
          totalImpact: 0,
        });
        setModerationData([
          { category: 'Aprobados', value: 0, color: '#10B981' },
          { category: 'Pendientes', value: 0, color: '#F59E0B' },
          { category: 'Rechazados', value: 0, color: '#EF4444' }
        ]);
        setEcosystemData([
          { month: 'Ene', campaigns: 0, users: 0, donations: 0 },
          { month: 'Feb', campaigns: 0, users: 0, donations: 0 },
          { month: 'Mar', campaigns: 0, users: 0, donations: 0 },
          { month: 'Abr', campaigns: 0, users: 0, donations: 0 },
          { month: 'May', campaigns: 0, users: 0, donations: 0 },
          { month: 'Jun', campaigns: 0, users: 0, donations: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          Gestión del Ecosistema Fundify
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Supervisando la conexión transparente entre donantes, proyectos y campañas.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Campañas por Validar"
            value={stats.pendingCampaigns}
            hint="Requieren atención inmediata"
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Donaciones Totales"
            value={stats.totalDonations.toLocaleString()}
            hint="+28 esta semana"
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Contenido Aprobado"
            value={stats.moderatedContent}
            hint="Ecosistema saludable"
            color="text.primary"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Impacto Total Generado"
            value={`$${(stats.totalImpact / 1000000).toFixed(2)}M`}
            hint="+1.2% este mes"
            color="success.main"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Panel de Control del Ecosistema
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: 1,
                borderColor: "custom.borderLight",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Actividad del Ecosistema
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ecosystemData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="campaigns"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Campañas"
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Usuarios"
                  />
                  <Line
                    type="monotone"
                    dataKey="donations"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    name="Donaciones"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: 1,
                borderColor: "custom.borderLight",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Estado de Moderación
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={moderationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {moderationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Actividad Reciente de Campañas
        </Typography>
        <CampaignTable />
      </Box>
    </Container>
  );
}