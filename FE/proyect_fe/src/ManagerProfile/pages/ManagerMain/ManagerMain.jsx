import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Sidebar from "../../components/SideBar/Sidebar";
import Header from "../../components/HeaderUser/HeaderUser";
import MetricCard from "../../components/ManagerMainPage/MetricCard/MetricCard";
import ProjectChart from "../../components/ManagerMainPage/ProjectChart/ProjectChart";
import OverviewActions from "../../components/ManagerMainPage/OverviewActions/OverviewActions";
import CampaignIcon from "@mui/icons-material/Campaign";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { backdropClasses } from "@mui/material";
import { getData } from "../../../Register/services/fetch";

export default function ManagerMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [userLogged,setUserLogged]= useState([]) // aqui guardamos la info del usuario loggeado
  
  
  useEffect(()=>{ // el useEffect se usa para cargar la informacion en la pagina al momento de renderizarla y se puede controlar de muchas maneras
    async function getUser() { 
      const response = await getData(`user/user_id/${localStorage.getItem('id')}/`) // aqui hacemos la peticion a la BD para obtener la informacion del usuario loggeado que esta en el LocalStorage
      setUserLogged(response[0]) // aqui guardamos la respuesta en el estado userLogged y ponemos response[0] porque la respuesta es un array con un solo objeto y es el unico que tenemos ya que solo llamamos a un ID
    }
      getUser(); // aqui llamamos a la funcion asyncrona que obtiene la informacion del usuario
  },[]) // esto es parte de la estructura del useEffect para que se ejecute solo una vez al renderizar la pagina


  const toggleSidebar = () => setSidebarOpen((s) => !s);
  return (
    <Box sx={{ 
      display: "flex", 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #fef7f0 0%, #fff4e6 25%, #fef7f0 50%, #fff8f3 75%, #fef7f0 100%)",
    }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={userLogged}/>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header onToggleSidebar={toggleSidebar} user={userLogged}/>
        
        <Box sx={{ flex: 1, ml: { xs: 0, md: "280px" }, pt: 2 }}>
          {/* Hero Section with Gradient Background */}
          <Box sx={{
            background: "linear-gradient(135deg, #FF8C00 0%, #E67C00 100%)",
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
                  <Typography variant="h2" sx={{ color: "white", mb: 1, textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>¡Bienvenido de vuelta, {userLogged.first_name}!</Typography> {/* Aqui mostramos el nombre del usuario loggeado con el estado userLogged */}
                  <Typography variant="body1" sx={{ color: "white", opacity: 0.9, maxWidth: 500 }}>Aquí tienes un resumen de tus proyectos y el impacto que has generado. Gestiona tus campañas y haz crecer tu impacto social.</Typography>
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
                    <MetricCard title="Proyectos Activos" value="5" hint="+2 este mes" icon={<CampaignIcon />} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MetricCard title="Fondos Recaudados" value="₡2.5M" hint="Últimos 12 meses" icon={<AttachMoneyIcon />} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MetricCard title="Donadores Totales" value="127" hint="+15 este mes" icon={<PeopleIcon />} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MetricCard title="Impacto Generado" value="850" hint="Vidas impactadas" icon={<TrendingUpIcon />} />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mt: 3 }}>
                <OverviewActions />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Box>
                    <Typography variant="h4" sx={{ mb: 0.5 }}>Rendimiento de tus Proyectos</Typography>
                    <Typography variant="body2" color="text.secondary">Evolución de la recaudación en el tiempo.</Typography>
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

                <Box sx={{ 
                  p: 3, 
                  border: "1px solid rgba(255,140,0,0.1)", 
                  borderRadius: 3,
                  background: "linear-gradient(135deg, rgba(255, 140, 0, 0.02) 0%, rgba(255, 140, 0, 0.01) 100%)",
                  height: 320
                }}>
                  <ProjectChart data={[
                    { label: "Ago", value: 35000 },
                    { label: "Sep", value: 42000 },
                    { label: "Oct", value: 28000 },
                    { label: "Nov", value: 65000 },
                    { label: "Dic", value: 58000 },
                    { label: "Ene", value: 72000 }
                  ]} />
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