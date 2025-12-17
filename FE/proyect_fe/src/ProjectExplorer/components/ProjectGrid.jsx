import React from "react";
import { Box, Typography, CircularProgress, Alert, Pagination, Skeleton, Card, CardContent } from "@mui/material";
import ProjectCard from "./ProjectCard";
import SearchOffIcon from "@mui/icons-material/SearchOff";

// Skeleton para cargar
function ProjectCardSkeleton() {
  return (
    <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Skeleton variant="rectangular" height={180} />
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
          <Skeleton variant="rounded" width={80} height={24} />
          <Skeleton variant="text" width={60} />
        </Box>
        <Skeleton variant="text" sx={{ fontSize: "1.25rem", mb: 1 }} />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
        <Skeleton variant="rounded" height={8} sx={{ mb: 1.5 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Skeleton variant="text" width={80} />
          <Skeleton variant="text" width={60} />
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Skeleton variant="rounded" height={36} sx={{ flex: 1 }} />
          <Skeleton variant="rounded" height={36} sx={{ flex: 1 }} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default function ProjectGrid({
  campaigns = [],
  loading = false,
  error = null,
  pagination = {},
  onPageChange,
  onViewDetails,
  onDonate,
  canDonate = false,
  formatCurrency,
  calculateProgress,
}) {
  const { page = 1, totalPages = 1, total = 0 } = pagination;

  // Loading state
  if (loading) {
    return (
      <Box>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={3}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </Box>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  // Empty state
  if (!campaigns || campaigns.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          textAlign: "center",
        }}
      >
        <SearchOffIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
        <Typography variant="h5" fontWeight={700} gutterBottom>
          No se encontraron campañas
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 400 }}>
          Intenta ajustar los filtros o la búsqueda para encontrar campañas que te interesen.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Grid de tarjetas */}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={3}
      >
        {campaigns.map((campaign) => (
          <ProjectCard
            key={campaign.id}
            campaign={campaign}
            onViewDetails={onViewDetails}
            onDonate={onDonate}
            canDonate={canDonate}
            formatCurrency={formatCurrency}
            calculateProgress={calculateProgress}
          />
        ))}
      </Box>

      {/* Paginación */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => onPageChange && onPageChange(value)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {/* Info de resultados */}
      {total > 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 2 }}
        >
          Mostrando {campaigns.length} de {total} campaña{total !== 1 ? "s" : ""}
        </Typography>
      )}
    </Box>
  );
}
