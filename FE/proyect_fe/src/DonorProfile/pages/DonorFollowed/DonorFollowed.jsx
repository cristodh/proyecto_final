// src/pages/FollowedProjectsPage.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Header from "../../components/HeaderUser/HeaderUser";
import Sidebar from "../../components/SideBar/Sidebar";
import ProjectTabs from "../../components/DonorFollowedPage/ProjectTabs/ProjectTabs";
import ProjectsGrid from "../../components/DonorFollowedPage/ProjectsGrid/ProjectsGrid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect,useState } from "react";
import { getData } from "../../../Register/services/fetch";

/**
 * Page integrated in the dashboard layout.
 * Uses Sidebar and Header already present in the app
 */
export default function DonorFollowed() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

   const [userLogged,setUserLogged]= useState([]) // aqui guardamos la info del usuario loggeado
  
  useEffect(() => { // el useEffect se usa para cargar la informacion en la pagina al momento de renderizarla y se puede controlar de muchas maneras
    async function getUser() { 
      try {
        const response = await getData(`user/user_id/${localStorage.getItem('id')}/`) // aqui hacemos la peticion a la BD para obtener la informacion del usuario loggeado que esta en el LocalStorage
        if (response && response[0]) {
          setUserLogged(response[0]) // aqui guardamos la respuesta en el estado userLogged y ponemos response[0] porque la respuesta es un array con un solo objeto y es el unico que tenemos ya que solo llamamos a un ID
        } else {
          setUserLogged({ 
            first_name: "Usuario", 
            id: localStorage.getItem('id') || '1' 
          })
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        setUserLogged({ 
          first_name: "Usuario", 
          id: localStorage.getItem('id') || '1' 
        })
      }
    }
    getUser(); // aqui llamamos a la funcion asyncrona que obtiene la informacion del usuario
  }, []) // esto es parte de la estructura del useEffect para que se ejecute solo una vez al renderizar la pagina

  // tab 0 = Seguidos, 1 = Completados
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (_, newValue) => setTab(newValue);

  // sample data (copy images/urls from your HTML)
  const allProjects = React.useMemo(() => ({
    followed: [
      {
        id: "p1",
        title: "Reforestación del Parque Central",
        org: "Asociación Verde Urbano",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW2Z8RgBvFDlmzuvl9_-PgEwECT3yIlFhBhv1HQGQpywgPlQtOKpSaKelrIGyb4X0O0IdjX7wgZiN00uY6LIwXmM2R_WU8-ZyPsNrMjnA6EJC1DRdo6kIcbBfX0_nncxkQQ3bWZNnwLIGW_YlsT-cg15wRa8v0v7fAcrWIbWzOViUgbThptUo1M5teIz6CfLgjH24_64pqIm48H-gzWKMfflcCYbwEjczY-ICk0clbvsUQgy9FGe4KAajXlDqurNst27IZH7k4Qio",
        status: "En Progreso",
        eta: "Finaliza en 15 días"
      },
      {
        id: "p2",
        title: "Kits Escolares para Todos",
        org: "Fundación Educar es Futuro",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKYjTY5VHCM4_uq8-V-6mNo_XHPv1ZMr9dkZebt0s6A-t-FRfpWkOkVi3OIn5jHx2qcOLSVAC_1wv1Pz3ZJ8MrilpgDUER1NBvZl12VSJ7NQEzoXm9-KaKEdx8FdJVux34eti4cRc_rw9arrSmOFRiVaPMihhKI97siXOBeprCa-sCUw9ij0NT8q6sKLwnhuh2GumId4OEekFjPA-XrLLobWYL_lz2ST4GC16Sk9UDWaxivBMxuMO2_bydSNblPgthLL6DTLEZIw4",
        status: "Financiado",
        eta: "Campaña finalizada"
      },
      {
        id: "p3",
        title: "Clases de Arte para Mayores",
        org: 'Colectivo "Pinceles de Vida"',
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsSPsNC8cZ0QNdsqae5gJxbfW6lm8Kd5UrJIIzi6dpK64w07WYJSmozP5XAuP2hmQAjjrbGUTswh91ScL0hlCic-cCgRF98S8aaXPM6qjOZG8r6zCW0828U3WJJimNKrWWCgQ6J0bQrSxI5rqO14VY1m-RmYcPFNQHDL98tQ6d5VNXBOVq76uucBt0U9j9eKVW_0s7JEvryIJ51rcEn_OoNuMuWlVfpf7vQcvDf8gIi-SM3zgxbXutP8xd4KuzSdOPq5rb1OLkojQ",
        status: "Nueva Meta",
        eta: "Finaliza en 28 días"
      }
    ],
    published: [
      {
        id: "pub1",
        title: "Proyecto Comunitario X",
        org: "Colectivo Local",
        image: "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=60",
        status: "En Progreso",
        eta: "Finaliza en 7 días"
      }
    ],
    completed: [
      {
        id: "c1",
        title: "Refugio \"Patitas Felices\"",
        org: "Amigos de los Animales",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvNqGifh0JkekdXwyfOI3gSW1jfzefYlMP_vYlixsH7wBrGl0aUR6Y36NuSYsTQDWr0I0yNVxqMxd_cLxLOULOQfbdZwKFs7deYDVaLU_ZS5frBDiOd2491SnBDay3xCrk54d0xM9lcUJoYttvovxfgpn9Wh6jSVCEkAdo-5jWpJ6pWK9LUlzVug5-F10Maqr06-lOFn6LF6nYQBQ1jbFYqbsYTPCjUc-fbuEuhNFszr2BCmRNo5nRDmtVUul5aKpSt1EVaTe81K0",
        status: "Financiado",
        eta: "Campaña finalizada"
      }
    ]
  }), []);

  const [favorites, setFavorites] = React.useState(() => new Set());

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const projectsToShow = tab === 0 ? allProjects.followed : allProjects.completed;

  return (
    <Box sx={{ 
      display: "flex", 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f8fafc 50%, #f1f5f9 75%, #f0f9ff 100%)",
    }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={userLogged} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header onToggleSidebar={() => setSidebarOpen((s) => !s)} user={userLogged} />

        <Box sx={{ flex: 1, ml: { xs: 0, md: "280px" } }}>
          {/* Hero Section */}
          <Box sx={{
            background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
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
                      {allProjects.followed.length}
                    </Typography>
                  </Card>
                </Box>
              </Box>
            </Container>
          </Box>
          
          <Container maxWidth="lg" sx={{ py: 3 }}>
            {/* Estadísticas rápidas */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Avatar sx={{ bgcolor: "#8B5CF6", mx: "auto", mb: 1 }}>
                      <FavoriteIcon />
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {allProjects.followed.length}
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
                      {allProjects.completed.length}
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
                      {allProjects.followed.length + allProjects.completed.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Proyectos
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Layout usando Flexbox para evitar problemas de Grid */}
            <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
              {/* Contenido principal */}
              <Box sx={{ flex: 1, maxWidth: { md: "calc(66.666% - 12px)" } }}>
                <Card sx={{ minHeight: 500 }}>
                  <CardContent>
                    <ProjectTabs value={tab} onChange={handleTabChange} />

                    <Box sx={{ mt: 2 }}>
                      <ProjectsGrid
                        projects={projectsToShow.map((p) => ({
                          ...p,
                          favorite: favorites.has(p.id),
                          onPrimary: (id) => { console.log("view updates", id); },
                          primaryLabel: (p.status === "Financiado" || p.status === "Finalizada") ? "Ver Impacto" : "Ver Actualizaciones"
                        }))}
                        onToggleFavorite={toggleFavorite}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              {/* Panel lateral usando posición absoluta dentro de un contenedor fijo */}
              <Box sx={{ 
                width: { xs: "100%", md: "33.333%" },
                maxWidth: { md: "350px" },
                minWidth: { md: "300px" }
              }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {/* Progreso general - completamente estático */}
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                        Progreso General
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                            Reforestación del Parque Central
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            78%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={78} 
                          sx={{ 
                            height: 6, 
                            borderRadius: 3,
                            backgroundColor: "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#8B5CF6"
                            }
                          }} 
                        />
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                            Kits Escolares para Todos
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            100%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={100} 
                          sx={{ 
                            height: 6, 
                            borderRadius: 3,
                            backgroundColor: "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#059669"
                            }
                          }} 
                        />
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                            Clases de Arte para Mayores
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            65%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={65} 
                          sx={{ 
                            height: 6, 
                            borderRadius: 3,
                            backgroundColor: "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#8B5CF6"
                            }
                          }} 
                        />
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Acciones rápidas - completamente estáticas */}
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                        Acciones Rápidas
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Button variant="outlined" fullWidth>
                          Buscar Nuevos Proyectos
                        </Button>
                        <Button variant="outlined" fullWidth>
                          Ver Historial Completo
                        </Button>
                        <Button variant="contained" fullWidth sx={{ bgcolor: "#8B5CF6" }}>
                          Explorar Categorías
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
