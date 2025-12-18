// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import DashboardMain from "./sections/DashboardMain";
import { CampaignsSection } from "../../components/CampaignsSection";
import ModerationSection from "./sections/ModerationSection";
import UserManagementSection from "./sections/UserManagementSection";
import { getAdminData } from "../../../services/fetch";

export default function AdminDashboard() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  // State para mobile drawer y secciones activas
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Obtener datos del admin autenticado
  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem('id');
        if (userId) {
          const response = await getAdminData(`user/user_id/${userId}/`);
          if (response) {
            setAdminData(response);
          }
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);
  
  const handleOpenSidebar = () => setMobileOpen(true);
  const handleCloseSidebar = () => setMobileOpen(false);
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (!mdUp) {
      handleCloseSidebar();
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardMain />;
      case "campaigns":
        return <CampaignsSection />;
      case "moderation":
        return <ModerationSection />;
      case "users":
        return <UserManagementSection />;
      default:
        return <DashboardMain />;
    }
  };

  const moderationData = [
    { category: "Aprobados", value: 85, color: "#10B981" },
    { category: "Pendientes", value: 12, color: "#F59E0B" },
    { category: "Rechazados", value: 3, color: "#EF4444" }
  ];

  return (
    
    <Box sx={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f8fafc 50%, #f1f5f9 75%, #f0f9ff 100%)" }}>
      <Sidebar 
        mobileOpen={mobileOpen} 
        onMobileClose={handleCloseSidebar}
        activeKey={activeSection}
        onSectionChange={handleSectionChange}
      />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar onOpenSidebar={handleOpenSidebar} adminData={adminData} />

        {/* Contenedor dinámico para secciones */}
        {renderSection()}
      </Box>
    </Box>
  );
}
