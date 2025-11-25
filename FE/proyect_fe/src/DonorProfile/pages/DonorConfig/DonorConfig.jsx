import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "../../components/HeaderUser/HeaderUser.jsx";
import Sidebar from "../../components/SideBar/Sidebar";
import ProfileSummary from "../../components/DonorConfigPage/ProfileSummary.jsx";
import ProfileForm from "../../components/DonorConfigPage/ProfileForm";
import SecurityForm from "../../components/DonorConfigPage/SecurityForm";
import NotificationPreferences from "../../components/DonorConfigPage/NotificationPreferences";

export const DonorConfig = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  return (
    <Box sx={{ 
      display: "flex", 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 25%, #f8fafc 50%, #ecfdf5 75%, #f0fdfa 100%)",
    }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header onToggleSidebar={toggleSidebar} />

        <Box sx={{ flex: 1, ml: { xs: 0, md: "280px" }, pt: 2 }}>
          {/* Hero Section for Configuration */}
          <Box sx={{
            background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
            color: "white",
            py: 4,
            mb: 3,
            position: "relative",
            overflow: "hidden",
            '&::before': {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              width: "200px",
              height: "200px",
              background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
              borderRadius: "50%",
              transform: "translate(50px, -50px)",
            }
          }}>
            <Container maxWidth="lg">
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                  <Box sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem"
                  }}>
                    ⚙️
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 900, textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                    Configuración
                  </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ opacity: 0.9, maxWidth: 400, fontSize: "0.9rem" }}>
                  Personaliza tu experiencia y gestiona tu perfil de donante
                </Typography>
              </Box>
            </Container>
          </Box>
          
          <Container maxWidth="lg" sx={{ py: 4, display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Bloque 1 — Resumen (avatar + stats) */}
          <ProfileSummary />

          {/* Bloque 2 — Formulario de Perfil */}
          <ProfileForm />

          {/* Bloque 3 — Seguridad */}
          <SecurityForm />

          {/* Bloque 4 — Notificaciones */}
          <NotificationPreferences />
        </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default DonorConfig;
