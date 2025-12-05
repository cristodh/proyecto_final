// src/pages/AdminDashboard.jsx
import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import StatCard from "../../components/StatCard/StatCard";
import CampaignTable from "../../components/CampaignTable/CampaignTable";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart,
  Area,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";

export default function AdminDashboard() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  // state for mobile drawer (if you want to expand)
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleOpenSidebar = () => setMobileOpen(true);
  const handleCloseSidebar = () => setMobileOpen(false);

  // Datos para gráficos avanzados
  const ecosystemData = [
    { month: "Jul", campaigns: 45, users: 1200, donations: 2800 },
    { month: "Ago", campaigns: 52, users: 1350, donations: 3200 },
    { month: "Sep", campaigns: 38, users: 1280, donations: 2900 },
    { month: "Oct", campaigns: 65, users: 1480, donations: 3800 },
    { month: "Nov", campaigns: 58, users: 1520, donations: 4100 },
    { month: "Dic", campaigns: 72, users: 1680, donations: 4600 }
  ];

  const moderationData = [
    { category: "Aprobados", value: 85, color: "#10B981" },
    { category: "Pendientes", value: 12, color: "#F59E0B" },
    { category: "Rechazados", value: 3, color: "#EF4444" }
  ];

  const impactData = [
    { month: "Jul", impact: 125000, projects: 42 },
    { month: "Ago", impact: 165000, projects: 48 },
    { month: "Sep", impact: 145000, projects: 38 },
    { month: "Oct", impact: 205000, projects: 55 },
    { month: "Nov", impact: 185000, projects: 51 },
    { month: "Dic", impact: 250000, projects: 63 }
  ];

  return (
    
    <Box sx={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f8fafc 50%, #f1f5f9 75%, #f0f9ff 100%)" }}>
      <Sidebar mobileOpen={mobileOpen} onMobileClose={handleCloseSidebar} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar onOpenSidebar={handleOpenSidebar} />

        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>Gestión del Ecosistema Fundify</Typography>
            <Typography variant="body2" color="text.secondary">Supervisando la conexión transparente entre donantes, proyectos y campañas.</Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard title="Campañas por Validar" value="12" hint="Requieren atención inmediata" color="warning.main" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard title="Conexiones Realizadas" value="1,432" hint="+28 esta semana" color="success.main" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard title="Contenido Moderado" value="45" hint="Ecosistema saludable" color="text.primary" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard title="Impacto Total Generado" value="$1.25M" hint="+1.2% este mes" color="success.main" />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Panel de Control del Ecosistema</Typography>
            
            {/* Gráficos avanzados */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: 1, borderColor: "custom.borderLight" }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Actividad del Ecosistema
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={ecosystemData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="campaigns" stroke="#3B82F6" strokeWidth={2} name="Campañas" />
                      <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2} name="Usuarios" />
                      <Line type="monotone" dataKey="donations" stroke="#F59E0B" strokeWidth={2} name="Donaciones" />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: 1, borderColor: "custom.borderLight" }}>
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
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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

              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: 1, borderColor: "custom.borderLight" }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Impacto Financiero y Proyectos Completados
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={impactData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis 
                        yAxisId="left"
                        tick={{ fontSize: 12 }} 
                        axisLine={false} 
                        tickLine={false}
                        tickFormatter={(value) => `$${value/1000}k`}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right"
                        tick={{ fontSize: 12 }} 
                        axisLine={false} 
                        tickLine={false}
                      />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'impact' ? `$${value.toLocaleString()}` : value,
                          name === 'impact' ? 'Impacto Total' : 'Proyectos Completados'
                        ]}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend />
                      <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="impact" 
                        stackId="1"
                        stroke="#8B5CF6" 
                        fill="url(#colorImpact)"
                        name="Impacto Total"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="projects" 
                        stroke="#F59E0B" 
                        strokeWidth={3}
                        name="Proyectos Completados"
                      />
                      <defs>
                        <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Actividad Reciente de Campañas</Typography>
            <CampaignTable />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
