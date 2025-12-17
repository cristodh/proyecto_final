import React from "react";
import {
  Box,
  Typography,
  TextField,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Paper,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import SortIcon from "@mui/icons-material/Sort";

const PROVINCES = [
  "San José",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón",
];

const SORT_OPTIONS = [
  { value: "recent", label: "Más Recientes" },
  { value: "popular", label: "Más Populares" },
  { value: "ending", label: "Por Finalizar" },
  { value: "top", label: "Mayor Meta" },
  { value: "name", label: "Alfabético" },
];

export default function ExploreFilters({
  filters,
  updateFilter,
  clearFilters,
  categories = [],
  totalResults = 0,
  mobileOpen = false,
  onMobileClose,
}) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.location ||
    filters.minGoal > 0 ||
    filters.maxGoal < 100000000;

  const filterContent = (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
          <FilterListIcon color="primary" />
          Filtros
        </Typography>
        {hasActiveFilters && (
          <Button
            size="small"
            startIcon={<ClearIcon />}
            onClick={clearFilters}
            color="error"
          >
            Limpiar
          </Button>
        )}
      </Box>

      {/* Resultados */}
      <Chip
        label={`${totalResults} campaña${totalResults !== 1 ? "s" : ""} encontrada${totalResults !== 1 ? "s" : ""}`}
        color="primary"
        variant="outlined"
        sx={{ mb: 3, width: "100%" }}
      />

      {/* Búsqueda */}
      <TextField
        fullWidth
        size="small"
        placeholder="Buscar campañas..."
        value={filters.search}
        onChange={(e) => updateFilter("search", e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
        }}
        sx={{ mb: 3 }}
      />

      {/* Categoría */}
      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Categoría</InputLabel>
        <Select
          value={filters.category}
          onChange={(e) => updateFilter("category", e.target.value)}
          label="Categoría"
        >
          <MenuItem value="">
            <em>Todas las categorías</em>
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Ubicación / Provincia */}
      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Provincia</InputLabel>
        <Select
          value={filters.location}
          onChange={(e) => updateFilter("location", e.target.value)}
          label="Provincia"
        >
          <MenuItem value="">
            <em>Todas las provincias</em>
          </MenuItem>
          {PROVINCES.map((prov) => (
            <MenuItem key={prov} value={prov}>
              {prov}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Rango de meta */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Rango de meta
        </Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            value={[filters.minGoal, filters.maxGoal]}
            onChange={(e, newValue) => {
              updateFilter("minGoal", newValue[0]);
              updateFilter("maxGoal", newValue[1]);
            }}
            valueLabelDisplay="auto"
            valueLabelFormat={formatCurrency}
            min={0}
            max={100000000}
            step={1000000}
            sx={{ mt: 1 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption" color="text.secondary">
              {formatCurrency(filters.minGoal)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatCurrency(filters.maxGoal)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Ordenar por */}
      <FormControl fullWidth size="small">
        <InputLabel>Ordenar por</InputLabel>
        <Select
          value={filters.sortBy}
          onChange={(e) => updateFilter("sortBy", e.target.value)}
          label="Ordenar por"
        >
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Filtros activos */}
      {hasActiveFilters && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Filtros activos
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {filters.search && (
              <Chip
                label={`"${filters.search}"`}
                size="small"
                onDelete={() => updateFilter("search", "")}
              />
            )}
            {filters.category && (
              <Chip
                label={categories.find((c) => c.id === parseInt(filters.category))?.name || "Categoría"}
                size="small"
                onDelete={() => updateFilter("category", "")}
              />
            )}
            {filters.location && (
              <Chip
                label={filters.location}
                size="small"
                onDelete={() => updateFilter("location", "")}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );

  // Desktop: Panel lateral fijo
  if (isMdUp) {
    return (
      <Paper
        elevation={0}
        sx={{
          width: 300,
          flexShrink: 0,
          borderRadius: 3,
          border: 1,
          borderColor: "divider",
          position: "sticky",
          top: 80,
          maxHeight: "calc(100vh - 100px)",
          overflow: "auto",
        }}
      >
        {filterContent}
      </Paper>
    );
  }

  // Mobile: Drawer
  return (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={onMobileClose}
      PaperProps={{
        sx: { width: 320, maxWidth: "85vw" },
      }}
    >
      {filterContent}
      <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
        <Button
          fullWidth
          variant="contained"
          onClick={onMobileClose}
        >
          Ver Resultados ({totalResults})
        </Button>
      </Box>
    </Drawer>
  );
}
