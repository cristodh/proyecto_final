import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Sidebar from "../../components/SideBar/Sidebar";
import Header from "../../components/HeaderUser/HeaderUser";
import MetricCard from "../../components/DonorMainPage/MetricCard/MetricCard";
import ImpactChart from "../../components/DonorMainPage/ImpactChart/ImpactChart";
import OverviewActions from "../../components/DonorMainPage/OverviewActions/OverviewActions";
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
    <Box sx={{ 
      display: "flex", 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f8fafc 50%, #f1f5f9 75%, #f0f9ff 100%)",
    }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header onToggleSidebar={toggleSidebar} />
        
        <Box sx={{ flex: 1, ml: { xs: 0, md: "280px" }, pt: 2 }}>
          {/* Hero Section with Gradient Background */}
          <Box sx={{
            background: "linear-gradient(135deg, #2A9D8F 0%, #02695D 100%)",
            color: "white",
            py: 3,
            mb: 2,
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
                  <Typography variant="h2" sx={{ color: "white", mb: 1, textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>¡Bienvenido de vuelta, Carlos!</Typography>
                  <Typography variant="body1" sx={{ color: "white", opacity: 0.9, maxWidth: 500 }}>Aquí tienes un resumen de tu impacto y actividad reciente. Cada donación cuenta para hacer del mundo un lugar mejor.</Typography>
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
                    <Typography variant="h4" sx={{ mb: 0.5 }}>Impacto de tus Donaciones</Typography>
                    <Typography variant="body2" color="text.secondary">Evolución de tus contribuciones en el tiempo.</Typography>
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
          </Grid>
        </Container>
        </Box>
      </Box>
    </Box>
  );
}
