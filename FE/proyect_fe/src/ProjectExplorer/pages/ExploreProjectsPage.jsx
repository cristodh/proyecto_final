import React, { useState, useEffect } from "react";
import { Box, Fab, useMediaQuery, ThemeProvider, createTheme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";

import ExploreHero from "../components/ExploreHero";
import ExploreFilters from "../components/ExploreFilters";
import ProjectGrid from "../components/ProjectGrid";
import PublicCampaignDetailsModal from "../components/PublicCampaignDetailsModal";
import useExplore from "../hooks/useExplore";
import Header from "../../RegisterLoginPage/components/Header/Header";
import HeaderUser from "../../DonorProfile/components/HeaderUser/HeaderUser";
import HeaderExplorer from "../components/HeaderExplorer";

// Tema personalizado para el explorador
const exploreTheme = createTheme({
  palette: {
    primary: {
      main: "#2E7D32",
      light: "#4CAF50",
      dark: "#1B5E20",
    },
    secondary: {
      main: "#FF6F00",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default function ExploreProjectsPage() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Hook con toda la lógica
  const {
    campaigns,
    loading,
    error,
    categories,
    filters,
    updateFilter,
    clearFilters,
    pagination,
    goToPage,
    modals,
    openDetailsModal,
    closeDetailsModal,
    openDonationModal,
    closeDonationModal,
    user,
    canDonate,
    isOwner,
    calculateProgress,
    formatCurrency,
    refetchCampaigns,
  } = useExplore();

  // Manejar vista de detalles
  const handleViewDetails = (campaign) => {
    openDetailsModal(campaign);
  };



  return (
    <ThemeProvider theme={exploreTheme}>
      {localStorage.getItem("token")===null ? (
        <>
        <Header showLoginBtn={!localStorage.getItem('token')} />
        </>
      ):(
        <>
        <HeaderExplorer />  
        </>
      )}
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>

        {/* Hero Section */}
        <ExploreHero
          searchValue={filters.search}
          onSearchChange={(value) => updateFilter("search", value)}
        />

        {/* Main Content */}
        <Box
          sx={{
            maxWidth: 1400,
            mx: "auto",
            px: { xs: 2, md: 4 },
            py: 4,
          }}
        >
          <Box sx={{ display: "flex", gap: 4 }}>
            {/* Filtros - Desktop */}
            {isMdUp && (
              <ExploreFilters
                filters={filters}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
                categories={categories}
                totalResults={pagination.total}
              />
            )}

            {/* Filtros - Mobile (Drawer) */}
            {!isMdUp && (
              <ExploreFilters
                filters={filters}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
                categories={categories}
                totalResults={pagination.total}
                mobileOpen={mobileFiltersOpen}
                onMobileClose={() => setMobileFiltersOpen(false)}
              />
            )}

            {/* Grid de proyectos */}
            <Box sx={{ flex: 1 }}>
              <ProjectGrid
                campaigns={campaigns}
                loading={loading}
                error={error}
                pagination={pagination}
                onPageChange={goToPage}
                onViewDetails={handleViewDetails}
                formatCurrency={formatCurrency}
                calculateProgress={calculateProgress}
              />
            </Box>
          </Box>
        </Box>

        {/* FAB para filtros en móvil */}
        {!isMdUp && (
          <Fab
            color="primary"
            onClick={() => setMobileFiltersOpen(true)}
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 1000,
            }}
          >
            <FilterListIcon />
          </Fab>
        )}

        {/* Modal de detalles de campaña */}
        <PublicCampaignDetailsModal
          open={modals.details}
          onClose={closeDetailsModal}
          campaign={modals.selectedCampaign}
          user={user}
          canDonate={modals.selectedCampaign && canDonate(modals.selectedCampaign)}
          formatCurrency={formatCurrency}
          calculateProgress={calculateProgress}
          refetchCampaigns={refetchCampaigns}
        />
      </Box>
    </ThemeProvider>
  );
}
