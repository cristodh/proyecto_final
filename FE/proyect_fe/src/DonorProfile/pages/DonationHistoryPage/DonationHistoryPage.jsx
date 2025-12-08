// src/pages/DonationHistoryPage.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Header from "../../components/HeaderUser/HeaderUser";
import Sidebar from "../../components/SideBar/Sidebar";
import PageHeading from "../../components/DonationHistoryPage.jsx/PageHeading/PageHeading";
import DonationFilters from "../../components/DonationHistoryPage.jsx/DonationFilters/DonationFilters";
import DonationTable from "../../components/DonationHistoryPage.jsx/DonationTable/DonationTable";
import EmptyState from "../../components/DonationHistoryPage.jsx/EmptyState/EmptyState";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import HistoryIcon from "@mui/icons-material/History";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import { useState,useEffect } from "react";
import { getData, tokenGetData } from "../../../services/fetch";

export default function DonationHistoryPage() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [userLogged,setUserLogged]= useState([]) // aqui guardamos la info del usuario loggeado
  
  useEffect(() => { // el useEffect se usa para cargar la informacion en la pagina al momento de renderizarla y se puede controlar de muchas maneras
    async function getUser() { 
      try {
        const response = await tokenGetData(`user/user_id/${localStorage.getItem('id')}/`) // aqui hacemos la peticion a la BD para obtener la informacion del usuario loggeado que esta en el LocalStorage
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

  // Calcular estadísticas
  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const completedDonations = donations.filter(d => d.status === "Completada").length;
  const pendingDonations = donations.filter(d => d.status === "En Proceso").length;
  const cancelledDonations = donations.filter(d => d.status === "Cancelada").length;

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
            background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
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
                    Historial de Donaciones 📋
                  </Typography>
                  <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.9)", mb: 1 }}>
                    Revisa el impacto de todas tus contribuciones
                  </Typography>
                  <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", maxWidth: 500 }}>
                    Un registro completo de tu generosidad y el cambio que has generado.
                  </Typography>
                </Box>
                
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Card sx={{ p: 2, bgcolor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <PaymentIcon sx={{ color: "#FFD700" }} />
                      <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                        Total Donado
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ color: "white", textAlign: "center" }}>
                      ₡{totalDonated.toLocaleString()}
                    </Typography>
                  </Card>
                </Box>
              </Box>
            </Container>
          </Box>
          
          <Container maxWidth="lg" sx={{ py: 3 }}>
            <Grid container spacing={3}>
              {/* Estadísticas rápidas */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent sx={{ textAlign: "center" }}>
                        <Avatar sx={{ bgcolor: "#DC2626", mx: "auto", mb: 1 }}>
                          <PaymentIcon />
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                          ₡{totalDonated.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Donado
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent sx={{ textAlign: "center" }}>
                        <Avatar sx={{ bgcolor: "#059669", mx: "auto", mb: 1 }}>
                          <CheckCircleIcon />
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                          {completedDonations}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Donaciones Completadas
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent sx={{ textAlign: "center" }}>
                        <Avatar sx={{ bgcolor: "#F59E0B", mx: "auto", mb: 1 }}>
                          <PendingIcon />
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                          {pendingDonations}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          En Proceso
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent sx={{ textAlign: "center" }}>
                        <Avatar sx={{ bgcolor: "#6B7280", mx: "auto", mb: 1 }}>
                          <CancelIcon />
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                          {cancelledDonations}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Canceladas
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              {/* Contenido principal */}
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
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
                  </CardContent>
                </Card>
              </Grid>

              {/* Panel lateral */}
              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  {/* Donaciones recientes */}
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                          Donaciones Recientes
                        </Typography>
                        {donations.slice(0, 3).map((donation) => (
                          <Box key={donation.id} sx={{ mb: 2, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                              {donation.project}
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                              <Typography variant="h6" sx={{ color: "#DC2626", fontWeight: "bold" }}>
                                ₡{donation.amount.toLocaleString()}
                              </Typography>
                              <Chip 
                                label={donation.status} 
                                size="small" 
                                color={donation.status === "Completada" ? "success" : 
                                       donation.status === "En Proceso" ? "warning" : "error"}
                              />
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              {donation.date}
                            </Typography>
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Acciones rápidas */}
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                          Acciones Rápidas
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                          <Button variant="outlined" fullWidth onClick={exportCSV}>
                            Exportar a CSV
                          </Button>
                          <Button variant="outlined" fullWidth>
                            Ver Certificados
                          </Button>
                          <Button variant="contained" fullWidth sx={{ bgcolor: "#DC2626" }}>
                            Nueva Donación
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
