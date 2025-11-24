// src/pages/DonationHistoryPage.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import PageHeading from "../../components/PageHeading/PageHeading";
import DonationFilters from "../../components/DonationFilters/DonationFilters";
import DonationTable from "../../components/DonationTable/DonationTable";
import EmptyState from "../../components/EmptyState/EmptyState";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

/**
 * DonationHistoryPage integrates Header + Sidebar and composes the 4 components.
 * Contains example data and CSV export helper.
 */
export default function DonationHistoryPage() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // filters state
  const [filters, setFilters] = React.useState({ from: "", to: "", q: "" });

  // sample donations data (replace with API)
  const [donations, setDonations] = React.useState([
    { id: "d1", date: "15 de mayo, 2024", project: 'Refugio Animal "Huellitas Felices"', amount: 15000, currency: "₡", status: "Completada" },
    { id: "d2", date: "02 de abril, 2024", project: 'Comedor Infantil "Sonrisas"', amount: 10000, currency: "₡", status: "Completada" },
    { id: "d3", date: "21 de febrero, 2024", project: "Educación Digital para Adultos Mayores", amount: 25000, currency: "₡", status: "En Proceso" },
    { id: "d4", date: "10 de enero, 2024", project: "Limpieza del Río Virilla", amount: 5000, currency: "₡", status: "Cancelada" }
  ]);

  // basic filter implementation (client-side)
  const applyFilters = () => {
    // In a real app you would query the API with filters.
    // Here we just filter by project name and (naively) by date strings if provided.
    // For production convert dates to ISO and compare properly.
    const q = filters.q.trim().toLowerCase();
    setDonations((prev) => {
      // restore original set (we keep initial sample in variable)
      const all = [
        { id: "d1", date: "15 de mayo, 2024", project: 'Refugio Animal "Huellitas Felices"', amount: 15000, currency: "₡", status: "Completada" },
        { id: "d2", date: "02 de abril, 2024", project: 'Comedor Infantil "Sonrisas"', amount: 10000, currency: "₡", status: "Completada" },
        { id: "d3", date: "21 de febrero, 2024", project: "Educación Digital para Adultos Mayores", amount: 25000, currency: "₡", status: "En Proceso" },
        { id: "d4", date: "10 de enero, 2024", project: "Limpieza del Río Virilla", amount: 5000, currency: "₡", status: "Cancelada" }
      ];
      return all.filter((d) => (q ? d.project.toLowerCase().includes(q) : true));
    });
  };

  const clearFilters = () => {
    setFilters({ from: "", to: "", q: "" });
    // reset donations to original sample
    setDonations([
      { id: "d1", date: "15 de mayo, 2024", project: 'Refugio Animal "Huellitas Felices"', amount: 15000, currency: "₡", status: "Completada" },
      { id: "d2", date: "02 de abril, 2024", project: 'Comedor Infantil "Sonrisas"', amount: 10000, currency: "₡", status: "Completada" },
      { id: "d3", date: "21 de febrero, 2024", project: "Educación Digital para Adultos Mayores", amount: 25000, currency: "₡", status: "En Proceso" },
      { id: "d4", date: "10 de enero, 2024", project: "Limpieza del Río Virilla", amount: 5000, currency: "₡", status: "Cancelada" }
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
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "background.default" }}>
      <Header onToggleSidebar={() => setSidebarOpen((s) => !s)} />
      
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <Box sx={{ py: 3, flex: 1, ml: { xs: 0, md: "280px" }, px: 3, maxWidth: "100%", overflow: "hidden" }}>
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

          {/* Example: small actions */}
          <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
            <Button variant="outlined" onClick={() => alert("Función de ayuda rápida")}>Ayuda</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
