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
  IconButton
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
import ProfileSummary from "../../components/DonorConfigPage/ProfileSummary.jsx";
import ProfileForm from "../../components/DonorConfigPage/ProfileForm";
import SecurityForm from "../../components/DonorConfigPage/SecurityForm";
import NotificationPreferences from "../../components/DonorConfigPage/NotificationPreferences";
import { useEffect,useState } from "react";
import { getData } from "../../../Register/services/fetch.js";

export const DonorConfig = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const toggleSidebar = () => setSidebarOpen((s) => !s);

   const [userLogged,setUserLogged]= useState([]) // aqui guardamos la info del usuario loggeado
  
  useEffect(() => { 
    async function getUser() { 
      try {
        const response = await getData(`user/user_id/${localStorage.getItem('id')}/`);
        setUserLogged(response[0]);
      } catch (error) {
        console.error('Error loading user data:', error);
        // Fallback user data for demonstration
        setUserLogged({
          id: 1,
          nombre: "Usuario Demo",
          apellido: "Demostración",
          email: "usuario@demo.com",
          avatar: "/api/placeholder/100/100"
        });
      }
    }
    getUser();
  }, []);

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
              {/* Resumen del perfil mejorado */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        Tu Perfil
                      </Typography>
                      <Button 
                        variant="outlined" 
                        startIcon={<EditIcon />}
                        size="small"
                      >
                        Editar
                      </Button>
                    </Box>
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
                      <Avatar 
                        sx={{ width: 80, height: 80 }}
                        src={userLogged?.avatar}
                      >
                        {userLogged?.nombre?.[0]}
                      </Avatar>
                      
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {userLogged?.nombre} {userLogged?.apellido}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {userLogged?.email}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Chip 
                            icon={<VerifiedIcon />}
                            label="Verificado" 
                            color="success" 
                            size="small" 
                          />
                          <Chip 
                            icon={<StarIcon />}
                            label="Donante Activo" 
                            color="primary" 
                            size="small" 
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: "center", p: 2, bgcolor: "#f8fafc", borderRadius: 1 }}>
                          <Typography variant="h6" sx={{ color: "#7C3AED", fontWeight: "bold" }}>
                            15
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Donaciones
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: "center", p: 2, bgcolor: "#f8fafc", borderRadius: 1 }}>
                          <Typography variant="h6" sx={{ color: "#059669", fontWeight: "bold" }}>
                            8
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Proyectos
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: "center", p: 2, bgcolor: "#f8fafc", borderRadius: 1 }}>
                          <Typography variant="h6" sx={{ color: "#DC2626", fontWeight: "bold" }}>
                            2.3k
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Impacto
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: "center", p: 2, bgcolor: "#f8fafc", borderRadius: 1 }}>
                          <Typography variant="h6" sx={{ color: "#F59E0B", fontWeight: "bold" }}>
                            92%
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Confiabilidad
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Secciones de configuración */}
              <Grid item xs={12} md={8}>
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
                        <ProfileForm />
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

                  {/* Notificaciones */}
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                          <Avatar sx={{ bgcolor: "#059669" }}>
                            <NotificationsIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                              Preferencias de Notificaciones
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Controla cómo y cuándo recibes notificaciones
                            </Typography>
                          </Box>
                        </Box>
                        <NotificationPreferences />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              {/* Panel lateral */}
              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  {/* Progreso del perfil */}
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                          Completar Perfil
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="body2">Progreso</Typography>
                            <Typography variant="body2">85%</Typography>
                          </Box>
                          <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 1 }} />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Completa tu perfil para una mejor experiencia
                        </Typography>
                        <Button variant="outlined" size="small" fullWidth>
                          Completar Perfil
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Configuración rápida */}
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                          Configuración Rápida
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: "#f8fafc", borderRadius: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <ShieldIcon fontSize="small" color="primary" />
                              <Typography variant="body2">2FA Activado</Typography>
                            </Box>
                            <Chip label="Activo" color="success" size="small" />
                          </Box>
                          
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: "#f8fafc", borderRadius: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <NotificationsIcon fontSize="small" color="primary" />
                              <Typography variant="body2">Notificaciones</Typography>
                            </Box>
                            <Chip label="Habilitadas" color="primary" size="small" />
                          </Box>

                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: "#f8fafc", borderRadius: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <TrendingUpIcon fontSize="small" color="primary" />
                              <Typography variant="body2">Analíticas</Typography>
                            </Box>
                            <Chip label="Privadas" color="default" size="small" />
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Acciones rápidas */}
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                          Acciones Rápidas
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                          <Button variant="outlined" fullWidth size="small">
                            Exportar Datos
                          </Button>
                          <Button variant="outlined" fullWidth size="small">
                            Descargar Certificados
                          </Button>
                          <Button variant="contained" fullWidth size="small" sx={{ bgcolor: "#7C3AED" }}>
                            Ver Tutorial
                          </Button>
                        </Box>
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
