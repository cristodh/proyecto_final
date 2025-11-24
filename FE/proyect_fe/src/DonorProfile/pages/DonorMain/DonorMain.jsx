// src/pages/DonorDashboard.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Sidebar from "../../components/SideBar/Sidebar";
import Header from "../../components/Header/Header";
import MetricCard from "../../components/MetricCard/MetricCard";
import ImpactChart from "../../components/ImpactChart/ImpactChart";
import OverviewActions from "../../components/OverviewActions/OverviewActions";
import PaymentIcon from "@mui/icons-material/Payments";
import PeopleIcon from "@mui/icons-material/People";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function DonorMain() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header onToggleSidebar={toggleSidebar} />

        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
                <Box>
                  <Box component="h1" sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 900 }}>Resumen</Box>
                  <Box component="p" sx={{ color: "text.secondary", mt: 1 }}>Hola Carlos, aquí tienes un resumen de tu actividad.</Box>
                </Box>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <MetricCard title="Total Donado" value="€1,250" hint="Últimos 12 meses" icon={<PaymentIcon />} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MetricCard title="Proyectos Apoyados" value="15" hint="+2 este mes" icon={<PeopleIcon />} />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mt: 3 }}>
                <OverviewActions />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Box>
                    <Box component="h2" sx={{ fontSize: 18, fontWeight: 800 }}>Impacto de tus Donaciones</Box>
                    <Box component="p" sx={{ color: "text.secondary" }}>Evolución de tus contribuciones en el tiempo.</Box>
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

                <Box sx={{ p: 2, border: 1, borderColor: "divider", borderRadius: 2 }}>
                  <ImpactChart />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ position: mdUp ? "sticky" : "static", top: 96 }}>
                <MetricCard title="Contenido Moderado" value="45" hint="Ecosistema saludable" icon={<ThumbUpIcon />} />
                <Box sx={{ mt: 2 }}>
                  <MetricCard title="Impacto Total Generado" value="$1.25M" hint="+1.2% este mes" icon={<TrendingUpIcon />} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
