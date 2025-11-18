// src/pages/AdminDashboard.jsx
import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import StatCard from "../../components/StatCard/StatCard";
import CampaignTable from "../../components/CampaignTable/CampaignTable";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function AdminDashboard() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  // state for mobile drawer (if you want to expand)
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleOpenSidebar = () => setMobileOpen(true);
  const handleCloseSidebar = () => setMobileOpen(false);

  return (
    
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
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
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Actividad Reciente de Campañas</Typography>
            <CampaignTable />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
