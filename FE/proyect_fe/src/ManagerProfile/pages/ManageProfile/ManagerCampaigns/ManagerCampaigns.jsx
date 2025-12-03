import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar";
import ManagerHeader from "../../../components/ManagerHeader/ManagerHeader";
import AddCampaign from "../../../components/NewCampaign/AddCampaign";
import CampaignDetails from "../../../components/CampaignDetails/CampaignDetails";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { getData } from "../../../../Register/services/fetch";

export default function ManagerCampaigns() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [userLogged, setUserLogged] = useState([]);
  const [addCampaignOpen, setAddCampaignOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Datos de ejemplo para proyectos
  const projects = [
    {
      id: 1,
      title: "Educación para Niños en Riesgo",
      description: "Programa educativo integral para niños en situación de vulnerabilidad",
      goal: 500000,
      raised: 325000,
      status: "Activo",
      donors: 45,
      daysLeft: 12
    },
    {
      id: 2,
      title: "Centro de Salud Comunitario",
      description: "Construcción de un centro de salud para comunidades rurales",
      goal: 1200000,
      raised: 850000,
      status: "Activo",
      donors: 78,
      daysLeft: 25
    },
    {
      id: 3,
      title: "Programa de Alimentación Escolar",
      description: "Desayunos nutritivos para estudiantes de escaelas públicas",
      goal: 300000,
      raised: 300000,
      status: "Completado",
      donors: 120,
      daysLeft: 0
    }
  ];

  useEffect(() => {
    async function getUser() {
      const response = await getData(`user/user_id/${localStorage.getItem('id')}/`);
      setUserLogged(response[0]);
    }
    getUser();
  }, []);

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  const handleCreateProject = () => {
    setAddCampaignOpen(true);
  };

  const handleCloseAddCampaign = () => {
    setAddCampaignOpen(false);
  };

  const handleViewDetails = (project) => {
    setSelectedCampaign(project);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedCampaign(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Activo": return { bg: "rgba(30, 58, 138, 0.1)", color: "#1E3A8A" };
      case "Completado": return { bg: "rgba(34, 197, 94, 0.1)", color: "#059669" };
      case "Pausado": return { bg: "rgba(156, 163, 175, 0.1)", color: "#6B7280" };
      default: return { bg: "rgba(30, 58, 138, 0.1)", color: "#1E3A8A" };
    }
  };

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
            {/* Header con botón crear proyecto */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: "#1a202c" }}>
                  Mis Proyectos
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Gestiona y monitorea todos tus proyectos de recaudación de fondos
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateProject}
                sx={{
                  bgcolor: "#1E3A8A",
                  color: "white",
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)",
                  '&:hover': {
                    bgcolor: "#3B82F6",
                    boxShadow: "0 6px 16px rgba(30, 58, 138, 0.4)",
                  }
                }}
              >
                Crear Nuevo Proyecto
              </Button>
            </Box>

            {/* Grid de proyectos */}
            <Grid container spacing={3}>
              {projects.map((project) => {
                const progress = (project.raised / project.goal) * 100;
                const statusStyle = getStatusColor(project.status);

                return (
                  <Grid item xs={12} md={6} lg={4} key={project.id}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        border: "1px solid rgba(30,58,138,0.1)",
                        background: "linear-gradient(135deg, rgba(30, 58, 138, 0.02) 0%, rgba(30, 58, 138, 0.01) 100%)",
                        transition: "all 0.3s ease",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        '&:hover': {
                          borderColor: "rgba(30,58,138,0.2)",
                          boxShadow: "0 8px 32px rgba(30,58,138,0.12)",
                          transform: "translateY(-2px)",
                        }
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                        <Chip
                          label={project.status}
                          size="small"
                          sx={{
                            bgcolor: statusStyle.bg,
                            color: statusStyle.color,
                            fontWeight: 600,
                            fontSize: "0.7rem",
                          }}
                        />
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                          <Button
                            size="small"
                            onClick={() => handleViewDetails(project)}
                            sx={{ 
                              minWidth: 0, 
                              p: 0.5, 
                              color: "#3B82F6",
                              '&:hover': { 
                                bgcolor: "rgba(59, 130, 246, 0.1)",
                                color: "#1E3A8A" 
                              }
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </Button>
                          <Button
                            size="small"
                            sx={{ 
                              minWidth: 0, 
                              p: 0.5, 
                              color: "#3B82F6",
                              '&:hover': { 
                                bgcolor: "rgba(59, 130, 246, 0.1)",
                                color: "#1E3A8A" 
                              }
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </Button>
                        </Box>
                      </Box>

                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.3 }}>
                        {project.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                        {project.description}
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            ₡{project.raised.toLocaleString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {Math.round(progress)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "rgba(30,58,138,0.1)",
                            '& .MuiLinearProgress-bar': {
                              bgcolor: "#3B82F6",
                              borderRadius: 3,
                            }
                          }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                          Meta: ₡{project.goal.toLocaleString()}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="caption" color="text.secondary">
                          {project.donors} donadores
                        </Typography>
                        {project.daysLeft > 0 && (
                          <Typography variant="caption" color="text.secondary">
                            {project.daysLeft} días restantes
                          </Typography>
                        )}
                      </Box>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        {/* Modal para agregar nueva campaña */}
        <Dialog 
          open={addCampaignOpen} 
          onClose={handleCloseAddCampaign}
          maxWidth="lg"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              borderRadius: 3,
              overflow: 'visible'
            }
          }}
        >
          <AddCampaign onClose={handleCloseAddCampaign} />
        </Dialog>

        {/* Modal para ver detalles de campaña */}
        <CampaignDetails 
          open={detailsOpen}
          onClose={handleCloseDetails}
          campaign={selectedCampaign}
        />
      </Box>
    </Box>
  );
}