import React, { useState } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../../components/ManagerHeader";
import ManagerSidebar from "../../components/ManagerSidebar";

// Vistas
import ManagerSummary from "../../components/ManagerSummary/ManagerSummary";
import ManagerCampaigns from "../../components/ManagerCampaigns/ManagerCampaigns";
import AddCampaign from "../../components/NewCampain/AddCampaign";
import Statistics from "../../components/Statistics/Statistics";

export default function ManagerProfile() {
  const [view, setView] = useState("summary");

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
        return <ManagerSummary />;
      case "campaigns":
        return <ManagerCampaigns />;
      case "create":
        return <AddCampaign />;
      case "reports":
        return <Statistics />;
      case "messages":
        return <Box p={3}>Mensajes (próximamente)</Box>;
      case "config":
        return <Box p={3}>Configuración (próximamente)</Box>;
      default:
        return <ManagerSummary />;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      {/* Header */}
      <Header />

      {/* Layout Principal */}
      <Box sx={{ display: "flex", mt: 2 }}>
        {/* Sidebar */}
        <ManagerSidebar view={view} setView={setView} />

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
