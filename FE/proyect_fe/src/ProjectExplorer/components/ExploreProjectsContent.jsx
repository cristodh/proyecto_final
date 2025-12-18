import React, { useState, useEffect } from "react";
import { Box, Fab, useMediaQuery, ThemeProvider, createTheme } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";

import ExploreHero from "./ExploreHero";
import ExploreFilters from "./ExploreFilters";
import ProjectGrid from "./ProjectGrid";
import PublicCampaignDetailsModal from "./PublicCampaignDetailsModal";
import useExplore from "../hooks/useExplore";
import Header from "../../RegisterLoginPage/components/Header/Header";
import HeaderExplorer from "./HeaderExplorer";

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

export default function ExploreProjectsContent() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

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
    user,
    canDonate,
    calculateProgress,
    formatCurrency,
    refetchCampaigns,
  } = useExplore();

  const handleViewDetails = (campaign) => {
    openDetailsModal(campaign);
  };

  useEffect(() => {
    const campaignId = searchParams.get('campaign');
    if (campaignId && campaigns.length > 0) {
      const campaign = campaigns.find(c => c.id === parseInt(campaignId));
      if (campaign) {
        openDetailsModal(campaign);
        searchParams.delete('campaign');
        setSearchParams(searchParams, { replace: true });
      }
    }
  }, [searchParams, campaigns, openDetailsModal, setSearchParams]);

  return (
    <ThemeProvider theme={exploreTheme}>
      {localStorage.getItem("token")===null ? (
        <Header showLoginBtn={!localStorage.getItem('token')} />
      ) : (
        <HeaderExplorer />
      )}
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
        <ExploreHero
          searchValue={filters.search}
          onSearchChange={(value) => updateFilter("search", value)}
        />

        <Box
          sx={{
            maxWidth: 1400,
            mx: "auto",
            px: { xs: 2, md: 4 },
            py: 4,
          }}
        >
          <Box sx={{ display: "flex", gap: 4 }}>
            {isMdUp && (
              <ExploreFilters
                filters={filters}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
                categories={categories}
                totalResults={pagination.total}
              />
            )}

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
