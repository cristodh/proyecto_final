import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Sidebar from "../../components/SideBar/Sidebar";
import Header from "../../components/HeaderUser/HeaderUser";
import MetricCard from "../../components/DonorMainPage/MetricCard/MetricCard";
import PaymentIcon from "@mui/icons-material/Payments";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import NatureIcon from "@mui/icons-material/Nature";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HandshakeIcon from "@mui/icons-material/Handshake";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { getData, tokenGetData } from "../../../services/fetch";

export default function DonorMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [userLogged, setUserLogged] = useState([]); // aqui guardamos la info del usuario loggeado
  
  // Datos de ejemplo para las estadísticas del donador
  const [donorStats] = useState({
    totalDonated: 85750,
    projectsSupported: 12,
    donationStreak: 8
  });

  // Proyectos recientes apoyados
  const [recentProjects] = useState([
    {
      id: 1,
      name: "Agua Limpia para Guanacaste",
      category: "Medio Ambiente",
      donated: 15000,
      progress: 78,
      icon: <NatureIcon />
    },
    {
      id: 2,
      name: "Educación Digital Rural",
      category: "Educación",
      donated: 12500,
      progress: 65,
      icon: <SchoolIcon />
    },
    {
      id: 3,
      name: "Centro de Salud Comunitario",
      category: "Salud",
      donated: 20000,
      progress: 89,
      icon: <LocalHospitalIcon />
    }
  ]);

  // Actividad reciente
  const [recentActivity] = useState([
    {
      id: 1,
      action: "Donación realizada",
      project: "Agua Limpia para Guanacaste",
      amount: 5000,
      date: "Hace 2 días"
    },
    {
      id: 2,
      action: "Comentario agregado",
      project: "Educación Digital Rural",
      amount: null,
      date: "Hace 5 días"
    },
    {
      id: 3,
      action: "Donación realizada",
      project: "Centro de Salud Comunitario",
      amount: 8000,
      date: "Hace 1 semana"
    }
  ]);

  // Logros del donador
  const [achievements] = useState([
    { name: "Primer Donador", description: "Primera donación realizada", earned: true },
    { name: "Corazón Generoso", description: "10+ proyectos apoyados", earned: true }, 
    { name: "Impacto Verde", description: "Apoyo a proyectos ambientales", earned: true },
    { name: "Filántropo", description: "₡100,000+ donados", earned: false }
  ]);
  
  useEffect(() => { // el useEffect se usa para cargar la informacion en la pagina al momento de renderizarla y se puede controlar de muchas maneras
    async function getUser() { 
      try {
        const response = await tokenGetData(`user/user_id/${localStorage.getItem('id')}/`) // aqui hacemos la peticion a la BD para obtener la informacion del usuario loggeado que esta en el LocalStorage
        if (response && response[0]) {
          setUserLogged(response[0]) // aqui guardamos la respuesta en el estado userLogged y ponemos response[0] porque la respuesta es un array con un solo objeto y es el unico que tenemos ya que solo llamamos a un ID
        } else {
          // Si no hay respuesta válida, usar datos de ejemplo
          setUserLogged({ 
            first_name: "Usuario", 
            id: localStorage.getItem('id') || '1' 
          })
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        // En caso de error, usar datos de ejemplo
        setUserLogged({ 
          first_name: "Usuario", 
          id: localStorage.getItem('id') || '1' 
        })
      }
    }
    getUser(); // aqui llamamos a la funcion asyncrona que obtiene la informacion del usuario
  }, []) // esto es parte de la estructura del useEffect para que se ejecute solo una vez al renderizar la pagina


  const toggleSidebar = () => setSidebarOpen((s) => !s);
  
  return (
    <Box sx={{ 
      display: "flex", 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f8fafc 50%, #f1f5f9 75%, #f0f9ff 100%)",
    }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={userLogged}/>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header onToggleSidebar={toggleSidebar} user={userLogged}/>
        
        <Box sx={{ flex: 1, ml: { xs: 0, md: "280px" } }}>
          {/* Hero Section with Gradient Background */}
          <Box sx={{
            background: "linear-gradient(135deg, #2A9D8F 0%, #02695D 100%)",
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
              background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"80\" cy=\"20\" r=\"20\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"90\" cy=\"60\" r=\"15\" fill=\"rgba(255,255,255,0.08)\"/><circle cx=\"70\" cy=\"80\" r=\"10\" fill=\"rgba(255,255,255,0.06)\"/></svg>') no-repeat",
              backgroundSize: "cover",
            }
          }}>
            <Container maxWidth="lg">
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
                <Box>
                  <Typography variant="h2" sx={{ color: "white", mb: 1, textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                    ¡Hola, {userLogged.first_name}! 👋
                  </Typography>
                  <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.9)", mb: 1 }}>
                    Tu generosidad siempre impactará vidas
                  </Typography>
                  <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", maxWidth: 500 }}>
                    Cada donación cuenta una historia de esperanza y transformación.
                  </Typography>
                </Box>
                
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Card sx={{ p: 2, bgcolor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <FavoriteIcon sx={{ color: "#FF6B6B" }} />
                      <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                        Racha de Donaciones
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ color: "white", textAlign: "center" }}>
                      {donorStats.donationStreak} meses
                    </Typography>
                  </Card>
                </Box>
              </Box>
            </Container>
          </Box>
          
          <Container maxWidth="lg" sx={{ py: 3 }}>
            <Grid container spacing={3}>
              {/* Métricas principales */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <MetricCard 
                      title="Total Donado" 
                      value={`₡${donorStats.totalDonated.toLocaleString()}`} 
                      hint="Últimos 12 meses" 
                      icon={<PaymentIcon />} 
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <MetricCard 
                      title="Proyectos Apoyados" 
                      value={donorStats.projectsSupported} 
                      hint="+3 este mes" 
                      icon={<PeopleIcon />} 
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <MetricCard 
                      title="Vidas Impactadas" 
                      value={donorStats.livesImpacted} 
                      hint="Estimación directa" 
                      icon={<HandshakeIcon />} 
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <MetricCard 
                      title="Racha Activa" 
                      value={`${donorStats.donationStreak} meses`} 
                      hint="¡Increíble!" 
                      icon={<TrendingUpIcon />} 
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Proyectos recientes apoyados */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                      <Box>
                        <Typography variant="h5" sx={{ mb: 0.5, fontWeight: "bold" }}>
                          Proyectos que Apoyas
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Tu impacto en tiempo real
                        </Typography>
                      </Box>
                      <Button variant="outlined" size="small">
                        Ver Todos
                      </Button>
                    </Box>
                    
                    {recentProjects.map((project) => (
                      <Box key={project.id} sx={{ mb: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                          <Avatar sx={{ bgcolor: "#2A9D8F", color: "white" }}>
                            {project.icon}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                              {project.name}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Chip label={project.category} size="small" />
                              <Typography variant="body2" color="text.secondary">
                                Tu aporte: ₡{project.donated.toLocaleString()}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        
                        <Box sx={{ mb: 1 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="body2">Progreso del proyecto</Typography>
                            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                              {project.progress}%
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={project.progress} 
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              backgroundColor: "#e0e0e0",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#2A9D8F"
                              }
                            }} 
                          />
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>

              {/* Panel lateral con actividad y logros */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={3} direction="column">
                  {/* Actividad Reciente */}
                  <Grid item>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                          Actividad Reciente
                        </Typography>
                        <List dense>
                          {recentActivity.map((activity) => (
                            <ListItem key={activity.id} sx={{ px: 0 }}>
                              <ListItemAvatar>
                                <Avatar sx={{ bgcolor: "#e8f5e8", color: "#2A9D8F", width: 32, height: 32 }}>
                                  {activity.amount ? "₡" : "💬"}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography variant="body2" sx={{ fontWeight: "medium" }} component="span">
                                    {activity.action}
                                  </Typography>
                                }
                                secondary={
                                  <Box component="span">
                                    <Typography variant="body2" color="text.secondary" component="span" sx={{ display: "block" }}>
                                      {activity.project}
                                    </Typography>
                                    {activity.amount && (
                                      <Typography variant="body2" sx={{ color: "#2A9D8F", fontWeight: "bold", display: "block" }} component="span">
                                        ₡{activity.amount.toLocaleString()}
                                      </Typography>
                                    )}
                                    <Typography variant="caption" color="text.secondary" component="span" sx={{ display: "block" }}>
                                      {activity.date}
                                    </Typography>
                                  </Box>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Logros */}
                  <Grid item>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                          Tus Logros
                        </Typography>
                        <Grid container spacing={1}>
                          {achievements.map((achievement, index) => (
                            <Grid item xs={6} key={index}>
                              <Box sx={{ 
                                p: 1, 
                                textAlign: "center", 
                                border: "1px solid #e0e0e0", 
                                borderRadius: 2,
                                opacity: achievement.earned ? 1 : 0.5 
                              }}>
                                <StarIcon sx={{ 
                                  color: achievement.earned ? "#FFD700" : "#ccc", 
                                  mb: 0.5 
                                }} />
                                <Typography variant="caption" sx={{ 
                                  display: "block", 
                                  fontWeight: "bold",
                                  fontSize: "0.7rem"
                                }}>
                                  {achievement.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
                                  {achievement.description}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              {/* Sección de impacto personal */}
              <Grid item xs={12} sx={{ px: { xs: 2, sm: 4, md: 8, lg: 12 } }}>
                <Card sx={{ 
                  background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                  border: "1px solid #bbf7d0"
                }}>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Box sx={{ textAlign: "center", mb: { xs: 1.5, sm: 2 } }}>
                      <Typography variant="h5" sx={{ mb: 0.5, color: "#059669", fontWeight: "bold", fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
                        Tu Impacto en Números
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                        Así es como tus donaciones están cambiando vidas
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ textAlign: "center", py: { xs: 0.5, sm: 0 } }}>
                          <Typography variant="h4" sx={{ color: "#059669", fontWeight: "bold", fontSize: { xs: "1.5rem", sm: "1.75rem" } }}>
                            5
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem" } }}>
                            Comunidades impactadas
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ textAlign: "center", py: { xs: 0.5, sm: 0 } }}>
                          <Typography variant="h4" sx={{ color: "#059669", fontWeight: "bold", fontSize: { xs: "1.5rem", sm: "1.75rem" } }}>
                            12
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem" } }}>
                            Meses de impacto continuo
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ textAlign: "center", py: { xs: 0.5, sm: 0 } }}>
                          <Typography variant="h4" sx={{ color: "#059669", fontWeight: "bold", fontSize: { xs: "1.5rem", sm: "1.75rem" } }}>
                            8
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem" } }}>
                            Campañas completadas
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
