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
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
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
import { getUserData, getUserInitials, getAvatarColor } from "../../../services/userService";
import { getUserDonations, calculateDonationStats, groupDonationsByMonth } from "../../../services/donationService";
import { getFollowedCampaigns, getFollowedCampaignsStats } from "../../../services/campaignService";

export default function DonorMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const [userLogged, setUserLogged] = useState(null);
  const [donorStats, setDonorStats] = useState({
    totalDonated: 0,
    projectsSupported: 0,
    donationStreak: 0,
    livesImpacted: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [achievements] = useState([
    { name: "Primer Donador", description: "Primera donación realizada", earned: true },
    { name: "Corazón Generoso", description: "10+ proyectos apoyados", earned: false }, 
    { name: "Impacto Verde", description: "Apoyo a proyectos ambientales", earned: false },
    { name: "Filántropo", description: "₡100,000+ donados", earned: false }
  ]);
  
  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        const userId = localStorage.getItem('id');
        
        // Cargar datos del usuario
        const userData = await getUserData(userId);
        if (userData) {
          setUserLogged(userData);
        }

        // Cargar donaciones y estadísticas
        const donationsData = await getUserDonations();
        if (donationsData && donationsData.donations) {
          const donations = donationsData.donations;
          const stats = calculateDonationStats(donations);
          
          setDonorStats({
            totalDonated: stats.totalDonated,
            projectsSupported: stats.projectsSupported,
            donationStreak: Math.min(12, donations.length), // Simulación
            livesImpacted: Math.floor(stats.totalDonated / 1000), // Simulación: 1000 por vida
            ...stats
          });

          // Preparar proyectos recientes (últimas 3 donaciones aprobadas)
          const approvedDonations = donations
            .filter(d => d.donation_status === 'approved')
            .slice(0, 3)
            .map((donation, index) => ({
              id: donation.id,
              name: donation.campaign_name,
              category: "Donación",
              donated: parseFloat(donation.amount),
              progress: Math.floor(Math.random() * 100),
              icon: [<NatureIcon />, <SchoolIcon />, <LocalHospitalIcon />][index % 3]
            }));
          
          setRecentProjects(approvedDonations);
        
          // Only set achievements if there are donations (filter already applied above)
          // Achievements will be removed from rendering in next step

          // Preparar actividad reciente
          const activity = donations.slice(0, 5).map(d => ({
            id: d.id,
            action: d.donation_status === 'pending' ? 'Donación en revisión' : 'Donación realizada',
            project: d.campaign_name,
            amount: parseFloat(d.amount),
            date: new Date(d.donated_at).toLocaleDateString('es-CR')
          }));
          
          setRecentActivity(activity);

          // Actualizar logros según estadísticas
          const updatedAchievements = achievements.map(ach => {
            if (ach.name === "Primer Donador" && donations.length > 0) {
              return { ...ach, earned: true };
            }
            if (ach.name === "Corazón Generoso" && stats.projectsSupported >= 10) {
              return { ...ach, earned: true };
            }
            if (ach.name === "Filántropo" && stats.totalDonated >= 100000) {
              return { ...ach, earned: true };
            }
            return ach;
          });
          
          // Actualizar estado de logros
        }
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);


  const toggleSidebar = () => setSidebarOpen((s) => !s);

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

  const userName = userLogged?.first_name || "Usuario";
  const userInitials = getUserInitials(userLogged?.first_name || "", userLogged?.last_name || "");
  const avatarColor = getAvatarColor(userLogged?.username || "");
  
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
                    ¡Hola, {userName}! 👋
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
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={() => navigate('/donor_profile/history')}
                      >
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
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
