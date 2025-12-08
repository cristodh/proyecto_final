// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import DashboardMain from "./sections/DashboardMain";
import CampaignsSection from "./sections/CampaignsSection";
import ModerationSection from "./sections/ModerationSection";
import ImpactReportsSection from "./sections/ImpactReportsSection";
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
        const response = await getAdminData('user/get_admin/');
        if (response && response.admin) {
          setAdminData(response.admin);
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

  // Datos para gráficos avanzados
  const ecosystemData = [
    { month: "Jul", campaigns: 45, users: 1200, donations: 2800 },
    { month: "Ago", campaigns: 52, users: 1350, donations: 3200 },
    { month: "Sep", campaigns: 38, users: 1280, donations: 2900 },
    { month: "Oct", campaigns: 65, users: 1480, donations: 3800 },
    { month: "Nov", campaigns: 58, users: 1520, donations: 4100 },
    { month: "Dic", campaigns: 72, users: 1680, donations: 4600 }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardMain />;
      case "campaigns":
        return <CampaignsSection />;
      case "moderation":
        return <ModerationSection />;
      case "reports":
        return <ImpactReportsSection />;
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

  const impactData = [
    { month: "Jul", impact: 125000, projects: 42 },
    { month: "Ago", impact: 165000, projects: 48 },
    { month: "Sep", impact: 145000, projects: 38 },
    { month: "Oct", impact: 205000, projects: 55 },
    { month: "Nov", impact: 185000, projects: 51 },
    { month: "Dic", impact: 250000, projects: 63 }
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
