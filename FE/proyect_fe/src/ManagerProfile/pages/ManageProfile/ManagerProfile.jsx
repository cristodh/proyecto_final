import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import ManagerHeader from "../../components/ManagerHeader/ManagerHeader";
import ManagerSidebar from "../../components/ManagerSidebar/ManagerSidebar";
import { getUserData } from "../../../services/userService";

// Vistas
import ManagerSummary from "../../components/ManagerSummary/ManagerSummary";
import ManagerCampaigns from "../../components/ManagerCampaigns/ManagerCampaigns";
import AddCampaign from "../../components/NewCampain/AddCampaign";
import Statistics from "../../components/Statistics/Statistics";

export default function ManagerProfile() {
  const [view, setView] = useState("summary");
  const [userLogged, setUserLogged] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Animations
  const pageAnimation = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  };

  const renderView = () => {
    switch (view) {
      case "summary":
        return <ManagerSummary user={userLogged} />;
      case "campaigns":
        return <ManagerCampaigns user={userLogged} />;
      case "create":
        return <AddCampaign user={userLogged} />;
      case "reports":
        return <Statistics user={userLogged} />;
      case "messages":
        return <Box p={3}>Mensajes (próximamente)</Box>;
      case "config":
        return <Box p={3}>Configuración (próximamente)</Box>;
      default:
        return <ManagerSummary user={userLogged} />;
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

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      {/* Header */}
      <ManagerHeader user={userLogged} />

      {/* Layout Principal */}
      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <ManagerSidebar view={view} setView={setView} user={userLogged} />

        {/* Contenido dinámico con animación */}
        <Box sx={{ flexGrow: 1, p: 3, position: "relative" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageAnimation.transition}
              variants={pageAnimation}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
}
