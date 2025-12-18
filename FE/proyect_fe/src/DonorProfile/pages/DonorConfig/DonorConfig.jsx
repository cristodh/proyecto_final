import React from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Avatar, 
  Button, 
  Chip, 
  LinearProgress, 
  Divider,
  IconButton,
  CircularProgress
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Edit as EditIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Verified as VerifiedIcon,
  Shield as ShieldIcon
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "../../components/HeaderUser/HeaderUser.jsx";
import Sidebar from "../../components/SideBar/Sidebar";
import ProfileForm from "../../components/DonorConfigPage/ProfileForm";
import SecurityForm from "../../components/DonorConfigPage/SecurityForm";
import { useEffect, useState } from "react";
import { getUserData, getUserInitials, getAvatarColor } from "../../../services/userService";
import { changePassword } from "../../../services/authService";

export const DonorConfig = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [userLogged, setUserLogged] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const toggleSidebar = () => setSidebarOpen((s) => !s);
  
  useEffect(() => { 
    async function getUser() { 
      try {
        setLoading(true);
        const userId = localStorage.getItem('id');
        const userData = await getUserData(userId);
        if (userData) {
          setUserLogged(userData);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  const handleUserUpdate = async () => {
    try {
      const userId = localStorage.getItem('id');
      const userData = await getUserData(userId);
      if (userData) {
        setUserLogged(userData);
      }
    } catch (error) {
      console.error('Error reloading user data:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: "flex", 
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <CircularProgress />
      </Box>
    );
  }

  const userInitials = getUserInitials(userLogged?.first_name || "", userLogged?.last_name || "");
  const avatarColor = getAvatarColor(userLogged?.username || "");

  return (
    <Box sx={{ 
      display: "flex", 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f8fafc 50%, #f1f5f9 75%, #f0f9ff 100%)",
    }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={userLogged} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header onToggleSidebar={toggleSidebar} user={userLogged} />

        <Box sx={{ flex: 1, ml: { xs: 0, md: "280px" } }}>
          {/* Hero Section */}
          <Box sx={{
            background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
            color: "white",
            py: 4,
            position: "relative",
            overflow: "hidden",
            '&::before': {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              width: "50%",
              height: "100%",
              background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"20\" cy=\"20\" r=\"10\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"80\" cy=\"30\" r=\"8\" fill=\"rgba(255,255,255,0.08)\"/><circle cx=\"60\" cy=\"70\" r=\"12\" fill=\"rgba(255,255,255,0.06)\"/><circle cx=\"30\" cy=\"80\" r=\"6\" fill=\"rgba(255,255,255,0.05)\"/></svg>') no-repeat",
              backgroundSize: "cover",
            }
          }}>
            <Container maxWidth="lg">
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
                <Box>
                  <Typography variant="h2" sx={{ color: "white", mb: 1, textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                    Configuración ⚙️
                  </Typography>
                  <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.9)", mb: 1 }}>
                    Personaliza tu experiencia de donante
                  </Typography>
                  <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", maxWidth: 500 }}>
                    Gestiona tu perfil, seguridad y preferencias para optimizar tu impacto.
                  </Typography>
                </Box>
                
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Card sx={{ p: 2, bgcolor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <VerifiedIcon sx={{ color: "#FFD700" }} />
                      <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                        Estado del Perfil
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ color: "white", textAlign: "center" }}>
                      Verificado
                    </Typography>
                  </Card>
                </Box>
              </Box>
            </Container>
          </Box>
          
          <Container maxWidth="lg" sx={{ py: 3 }}>
            <Grid container spacing={3}>
              {/* Secciones de configuración */}
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  {/* Información Personal */}
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                          <Avatar sx={{ bgcolor: "#7C3AED" }}>
                            <PersonIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                              Información Personal
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Gestiona tus datos personales y de contacto
                            </Typography>
                          </Box>
                        </Box>
                        <ProfileForm user={userLogged} onUpdate={handleUserUpdate} />
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Seguridad */}
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                          <Avatar sx={{ bgcolor: "#DC2626" }}>
                            <SecurityIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                              Seguridad y Privacidad
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Protege tu cuenta con configuraciones de seguridad
                            </Typography>
                          </Box>
                        </Box>
                        <SecurityForm />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default DonorConfig;
