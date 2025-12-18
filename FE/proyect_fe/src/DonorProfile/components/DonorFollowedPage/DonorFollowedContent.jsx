import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

import Header from "../HeaderUser/HeaderUser";
import Sidebar from "../SideBar/Sidebar";
import ProjectTabs from "./ProjectTabs/ProjectTabs";
import ProjectsGrid from "./ProjectsGrid/ProjectsGrid";
import { getUserData } from "../../../services/userService";
import { getFollowedCampaigns } from "../../../services/campaignService";

export default function DonorFollowedContent() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userLogged, setUserLogged] = useState(null);
  const [followedCampaigns, setFollowedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const userId = localStorage.getItem('id');
        const userData = await getUserData(userId);
        if (userData) setUserLogged(userData);

        const campaigns = await getFollowedCampaigns();
        if (campaigns && Array.isArray(campaigns) && campaigns.length > 0) {
          const reformatted = campaigns.map(cf => {
            const currentAmount = parseFloat(cf.campaign_current_amount || 0);
            const goalAmount = parseFloat(cf.campaign_goal_amount || 0);
            return {
              id: cf.campaign,
              title: cf.campaign_name,
              org: cf.campaign_creator_username || "Creador",
              image: cf.campaign_image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e0e0e0'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='%23757575'%3EProyecto%3C/text%3E%3C/svg%3E",
              status: cf.campaign_status === 'active' ? 'En Progreso' : cf.campaign_status === 'completed' ? 'Completado' : cf.campaign_status || 'En Progreso',
              eta: cf.campaign_end_date ? `Finaliza ${new Date(cf.campaign_end_date).toLocaleDateString('es-CR')}` : 'Sin fecha',
              progress: goalAmount > 0 ? (currentAmount / goalAmount) * 100 : 0,
              current: currentAmount,
              goal: goalAmount
            };
          });
          setFollowedCampaigns(reformatted);
        }
      } catch (error) {
        console.error('Error loading followed campaigns:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleTabChange = (_, newValue) => setTab(newValue);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  const projectsToShow = followedCampaigns.length > 0 ? followedCampaigns : [];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f8fafc 50%, #f1f5f9 75%, #f0f9ff 100%)" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={userLogged} />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header onToggleSidebar={() => setSidebarOpen((s) => !s)} user={userLogged} />
        <Box sx={{ flex: 1, ml: { xs: 0, md: "280px" } }}>
          <Box sx={{ background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)", color: "white", py: 4, position: "relative", overflow: "hidden",
            '&::before': { content: '""', position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"80\" cy=\"20\" r=\"20\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"90\" cy=\"60\" r=\"15\" fill=\"rgba(255,255,255,0.08)\"/><circle cx=\"70\" cy=\"80\" r=\"10\" fill=\"rgba(255,255,255,0.06)\"/></svg>') no-repeat", backgroundSize: "cover" } }}>
            <Container maxWidth="lg">
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
                <Box>
                  <Typography variant="h2" sx={{ color: "white", mb: 1, textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                    Proyectos Seguidos ❤️
                  </Typography>
                  <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.9)", mb: 1 }}>
                    Mantente al día con el progreso de los proyectos que más te importan
                  </Typography>
                  <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", maxWidth: 500 }}>
                    Sigue de cerca cómo tu apoyo genera cambios positivos en cada comunidad.
                  </Typography>
                </Box>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Card sx={{ p: 2, bgcolor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <FavoriteIcon sx={{ color: "#FF6B6B" }} />
                      <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                        Proyectos Activos
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ color: "white", textAlign: "center" }}>
                      {followedCampaigns.length}
                    </Typography>
                  </Card>
                </Box>
              </Box>
            </Container>
          </Box>
          <Container maxWidth="lg" sx={{ py: 3 }}>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Avatar sx={{ bgcolor: "#8B5CF6", mx: "auto", mb: 1 }}>
                      <FavoriteIcon />
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {followedCampaigns.filter(p => p.status === 'En Progreso').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Proyectos Seguidos
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Avatar sx={{ bgcolor: "#2563EB", mx: "auto", mb: 1 }}>
                      <CheckCircleIcon />
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {followedCampaigns.filter(p => p.status === 'Completado').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Proyectos Completados
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Avatar sx={{ bgcolor: "#DC2626", mx: "auto", mb: 1 }}>
                      <PeopleIcon />
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {followedCampaigns.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Proyectos
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
              <Box sx={{ flex: 1, maxWidth: { md: "calc(66.666% - 12px)" } }}>
                <Card sx={{ minHeight: 500 }}>
                  <CardContent>
                    <ProjectTabs value={tab} onChange={handleTabChange} />
                    <Box sx={{ mt: 2 }}>
                      <ProjectsGrid
                        projects={projectsToShow.map((p) => ({
                          ...p,
                          favorite: favorites.has(p.id),
                          onPrimary: (id) => { 
                            navigate(`/explore-projects?campaign=${id}`);
                          },
                          primaryLabel: "Ver Detalles"
                        }))}
                        onToggleFavorite={toggleFavorite}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ width: { xs: "100%", md: "33.333%" }, maxWidth: { md: "350px" }, minWidth: { md: "300px" } }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                        Acciones Rápidas
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Button 
                          variant="outlined" 
                          fullWidth
                          onClick={() => navigate('/explore-projects')}
                        >
                          Buscar Nuevos Proyectos
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
