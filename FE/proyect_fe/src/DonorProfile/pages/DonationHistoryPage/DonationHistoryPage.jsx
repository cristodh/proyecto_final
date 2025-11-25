// src/pages/DonationHistoryPage.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Header from "../../components/HeaderUser/HeaderUser";
import Sidebar from "../../components/SideBar/Sidebar";
import PageHeading from "../../components/DonationHistoryPage.jsx/PageHeading/PageHeading";
import DonationFilters from "../../components/DonationHistoryPage.jsx/DonationFilters/DonationFilters";
import DonationTable from "../../components/DonationHistoryPage.jsx/DonationTable/DonationTable";
import EmptyState from "../../components/DonationHistoryPage.jsx/EmptyState/EmptyState";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useState,useEffect } from "react";
import { getData } from "../../../Register/services/fetch";

export default function DonationHistoryPage() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [userLogged,setUserLogged]= useState([]) // aqui guardamos la info del usuario loggeado
  
  useEffect(()=>{ // el useEffect se usa para cargar la informacion en la pagina al momento de renderizarla y se puede controlar de muchas maneras
    async function getUser() { 
      const response = await getData(`user/user_id/${localStorage.getItem('id')}/`) // aqui hacemos la peticion a la BD para obtener la informacion del usuario loggeado que esta en el LocalStorage
      setUserLogged(response[0]) // aqui guardamos la respuesta en el estado userLogged y ponemos response[0] porque la respuesta es un array con un solo objeto y es el unico que tenemos ya que solo llamamos a un ID
    }
      getUser(); // aqui llamamos a la funcion asyncrona que obtiene la informacion del usuario
  },[]) // esto es parte de la estructura del useEffect para que se ejecute solo una vez al renderizar la pagina

  // filters state
  const [filters, setFilters] = React.useState({ from: "", to: "", q: "" });

  // sample donations data (replace with API)
  const [donations, setDonations] = React.useState([
    { id: "d1", date: "15 de mayo, 2025", project: 'Refugio Animal "Huellitas Felices"', amount: 15000, currency: "₡", status: "Completada" },
    { id: "d2", date: "02 de abril, 2025", project: 'Comedor Infantil "Sonrisas"', amount: 10000, currency: "₡", status: "Completada" },
    { id: "d3", date: "21 de febrero, 2025", project: "Educación Digital para Adultos Mayores", amount: 25000, currency: "₡", status: "En Proceso" },
    { id: "d4", date: "10 de enero, 2025", project: "Limpieza del Río Virilla", amount: 5000, currency: "₡", status: "Cancelada" }
  ]);

  // basic filter implementation (client-side)
  const applyFilters = () => {

    const q = filters.q.trim().toLowerCase();
    setDonations((prev) => {
      // restore original set (we keep initial sample in variable)
      const all = [
        { id: "d1", date: "15 de mayo, 2025", project: 'Refugio Animal "Huellitas Felices"', amount: 15000, currency: "₡", status: "Completada" },
        { id: "d2", date: "02 de abril, 2025", project: 'Comedor Infantil "Sonrisas"', amount: 10000, currency: "₡", status: "Completada" },
        { id: "d3", date: "21 de febrero, 2025", project: "Educación Digital para Adultos Mayores", amount: 25000, currency: "₡", status: "En Proceso" },
        { id: "d4", date: "10 de enero, 2025", project: "Limpieza del Río Virilla", amount: 5000, currency: "₡", status: "Cancelada" }
      ];
      return all.filter((d) => (q ? d.project.toLowerCase().includes(q) : true));
    });
  };

  const clearFilters = () => {
    setFilters({ from: "", to: "", q: "" });
    // reset donations to original sample
    setDonations([
      { id: "d1", date: "15 de mayo, 2025", project: 'Refugio Animal "Huellitas Felices"', amount: 15000, currency: "₡", status: "Completada" },
      { id: "d2", date: "02 de abril, 2025", project: 'Comedor Infantil "Sonrisas"', amount: 10000, currency: "₡", status: "Completada" },
      { id: "d3", date: "21 de febrero, 2025", project: "Educación Digital para Adultos Mayores", amount: 25000, currency: "₡", status: "En Proceso" },
      { id: "d4", date: "10 de enero, 2025", project: "Limpieza del Río Virilla", amount: 5000, currency: "₡", status: "Cancelada" }
    ]);
  };

  // CSV export: crafts a CSV and triggers download
  const exportCSV = () => {
    if (!donations.length) return;
    const header = ["Fecha", "Proyecto", "Monto", "Moneda", "Estado"];
    const rows = donations.map((d) => [d.date, d.project, d.amount, d.currency ?? "", d.status]);
    const csvContent = [header, ...rows].map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donations_history_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 25%, #f8fafc 50%, #fef2f2 75%, #fee2e2 100%)"
    }}>
      <Header onToggleSidebar={() => setSidebarOpen((s) => !s)}  user={userLogged}/>
      
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar  open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={userLogged} />

        {/* Hero Section for History */}
        <Box sx={{ flex: 1, ml: { xs: 0, md: "280px" } }}>
          <Box sx={{
            background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
            color: "white",
            py: 4,
            mb: 3,
            position: "relative",
            overflow: "hidden",
            '&::before': {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><rect x=\"10\" y=\"10\" width=\"20\" height=\"20\" fill=\"rgba(255,255,255,0.05)\" rx=\"2\"/><rect x=\"40\" y=\"15\" width=\"15\" height=\"15\" fill=\"rgba(255,255,255,0.04)\" rx=\"2\"/><rect x=\"70\" y=\"20\" width=\"25\" height=\"25\" fill=\"rgba(255,255,255,0.03)\" rx=\"3\"/></svg>') repeat",
              backgroundSize: "150px 150px",
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
                    📋
                  </Box>
                  <Box>
                    <Box component="h1" sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 900, mb: 0.5, textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                      Historial de Donaciones
                    </Box>
                    <Box component="p" sx={{ fontSize: "0.9rem", opacity: 0.9 }}>
                      Revisa el impacto de todas tus contribuciones
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
          
          <Box sx={{ py: 3, px: 3, maxWidth: "100%", overflow: "hidden" }}>
            <PageHeading onExport={exportCSV} />

          <DonationFilters
            filters={filters}
            setFilters={setFilters}
            onApply={applyFilters}
            onClear={clearFilters}
          />

          {donations.length ? (
            <DonationTable donations={donations} />
          ) : (
            <EmptyState />
          )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
