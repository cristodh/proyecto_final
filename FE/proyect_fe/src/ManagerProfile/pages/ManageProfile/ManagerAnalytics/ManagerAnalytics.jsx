import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar";
import ManagerHeader from "../../../components/ManagerHeader/ManagerHeader";
import MetricCard from "../../../components/ManagerMainPage/MetricCard/MetricCard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { getData } from "../../../../services/fetch";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
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

export default function ManagerAnalytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [userLogged, setUserLogged] = useState([]);

  // Datos de ejemplo para análisis con más información
  const monthlyData = [
    { month: "Ago", recaudado: 45000, meta: 50000, donaciones: 28 },
    { month: "Sep", recaudado: 60000, meta: 55000, donaciones: 35 },
    { month: "Oct", recaudado: 80000, meta: 60000, donaciones: 42 },
    { month: "Nov", recaudado: 35000, meta: 65000, donaciones: 22 },
    { month: "Dic", recaudado: 90000, meta: 70000, donaciones: 58 },
    { month: "Ene", recaudado: 75000, meta: 75000, donaciones: 45 }
  ];

  const donorGrowthData = [
    { month: "Ago", nuevos: 25, activos: 120, retenidos: 95 },
    { month: "Sep", nuevos: 40, activos: 135, retenidos: 108 },
    { month: "Oct", nuevos: 65, activos: 165, retenidos: 125 },
    { month: "Nov", nuevos: 30, activos: 150, retenidos: 110 },
    { month: "Dic", nuevos: 85, activos: 200, retenidos: 145 },
    { month: "Ene", nuevos: 70, activos: 180, retenidos: 135 }
  ];

  const categoryData = [
    { name: "Educación", value: 35, color: "#1E3A8A" },
    { name: "Salud", value: 25, color: "#3B82F6" },
    { name: "Medio Ambiente", value: 20, color: "#60A5FA" },
    { name: "Tecnología", value: 12, color: "#93C5FD" },
    { name: "Cultura", value: 8, color: "#DBEAFE" }
  ];

  useEffect(() => {
    async function getUser() {
      const response = await getData(`user/user_id/${localStorage.getItem('id')}/`);
      setUserLogged(response[0]);
    }
    getUser();
  }, []);

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  return (
    <Box sx={{
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #f1f5f9 50%, #f8fafc 75%, #f1f5f9 100%)",
    }}>
      <ManagerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={userLogged} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ManagerHeader onToggleSidebar={toggleSidebar} user={userLogged} />

        <Box sx={{ flex: 1, ml: { xs: 0, md: "280px" }, pt: 2 }}>
          <Container maxWidth="lg" sx={{ py: 2 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: "#1a202c" }}>
                Análisis y Métricas
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Analiza el rendimiento de tus proyectos y el comportamiento de tus donadores
              </Typography>
            </Box>

            {/* Métricas principales */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <MetricCard 
                  title="Conversión promedio" 
                  value="12.5%" 
                  hint="+2.3% vs mes anterior" 
                  icon={<TrendingUpIcon />} 
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <MetricCard 
                  title="Donación promedio" 
                  value="₡15,750" 
                  hint="+5% vs mes anterior" 
                  icon={<AttachMoneyIcon />} 
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <MetricCard 
                  title="Retención donadores" 
                  value="68%" 
                  hint="Meta: 70%" 
                  icon={<PeopleIcon />} 
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <MetricCard 
                  title="ROI Campañas" 
                  value="340%" 
                  hint="Muy bueno" 
                  icon={<BarChartIcon />} 
                />
              </Grid>
            </Grid>

            {/* Gráficos de análisis avanzados */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid rgba(255,140,0,0.1)",
                    background: "linear-gradient(135deg, rgba(255, 140, 0, 0.02) 0%, rgba(255, 140, 0, 0.01) 100%)",
                    height: 400
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    Recaudación vs Meta Mensual
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Comparación de fondos recaudados vs metas establecidas
                  </Typography>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={monthlyData}>
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
                        tickFormatter={(value) => `₡${value/1000}k`}
                      />
                      <Tooltip 
                        formatter={(value, name) => [
                          `₡${value.toLocaleString()}`, 
                          name === 'recaudado' ? 'Recaudado' : 'Meta'
                        ]}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #3B82F6',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px rgba(59,130,246,0.2)'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="recaudado" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        name="Recaudado"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="meta" 
                        stroke="#1E3A8A" 
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={{ fill: '#1E3A8A', strokeWidth: 2, r: 3 }}
                        name="Meta"
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
                    borderRadius: 3,
                    border: "1px solid rgba(255,140,0,0.1)",
                    background: "linear-gradient(135deg, rgba(255, 140, 0, 0.02) 0%, rgba(255, 140, 0, 0.01) 100%)",
                    height: 400
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    Distribución por Categoría
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Proyectos por área temática
                  </Typography>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Porcentaje']}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #3B82F6',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid rgba(255,140,0,0.1)",
                    background: "linear-gradient(135deg, rgba(255, 140, 0, 0.02) 0%, rgba(255, 140, 0, 0.01) 100%)",
                    height: 350
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    Análisis de Donadores
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Crecimiento y retención de la base de donadores
                  </Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={donorGrowthData}>
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
                          backgroundColor: 'white',
                          border: '1px solid #3B82F6',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px rgba(59,130,246,0.2)'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="nuevos" fill="#3B82F6" name="Nuevos Donadores" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="activos" fill="#1E3A8A" name="Donadores Activos" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="retenidos" fill="#60A5FA" name="Donadores Retenidos" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              {/* Resumen de métricas adicionales */}
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid rgba(30,58,138,0.1)",
                    background: "linear-gradient(135deg, rgba(30, 58, 138, 0.02) 0%, rgba(30, 58, 138, 0.01) 100%)",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    Resumen del Período
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Typography variant="h4" sx={{ color: "#3B82F6", fontWeight: 700 }}>
                          85%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Meta de recaudación alcanzada
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Typography variant="h4" sx={{ color: "#059669", fontWeight: 700 }}>
                          127
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Nuevos donadores este mes
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Typography variant="h4" sx={{ color: "#1E3A8A", fontWeight: 700 }}>
                          92%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Satisfacción de donadores
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}