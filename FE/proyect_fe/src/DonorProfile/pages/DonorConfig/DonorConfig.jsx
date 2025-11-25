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
import { useEffect,useState } from "react";
import { getData } from "../../../Register/services/fetch.js";

export const DonorConfig = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const toggleSidebar = () => setSidebarOpen((s) => !s);

   const [userLogged,setUserLogged]= useState([]) // aqui guardamos la info del usuario loggeado
  
  useEffect(()=>{ // el useEffect se usa para cargar la informacion en la pagina al momento de renderizarla y se puede controlar de muchas maneras
    async function getUser() { 
      const response = await getData(`user/user_id/${localStorage.getItem('id')}/`) // aqui hacemos la peticion a la BD para obtener la informacion del usuario loggeado que esta en el LocalStorage
      setUserLogged(response[0]) // aqui guardamos la respuesta en el estado userLogged y ponemos response[0] porque la respuesta es un array con un solo objeto y es el unico que tenemos ya que solo llamamos a un ID
    }
      getUser(); // aqui llamamos a la funcion asyncrona que obtiene la informacion del usuario
  },[]) // esto es parte de la estructura del useEffect para que se ejecute solo una vez al renderizar la pagina

  return (
    <Box sx={{ 
      display: "flex", 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 25%, #f8fafc 50%, #ecfdf5 75%, #f0fdfa 100%)",
    }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={userLogged} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header onToggleSidebar={toggleSidebar} user={userLogged} />

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
