import React, { useState } from "react";
import { Box, Typography, TextField, InputAdornment, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export default function ExploreHero({ searchValue = "", onSearchChange }) {
  const [localSearch, setLocalSearch] = useState(searchValue);

  const handleSearch = () => {
    if (onSearchChange) {
      onSearchChange(localSearch);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setLocalSearch("");
    if (onSearchChange) {
      onSearchChange("");
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #7ec282ff 0%, #2E7D32 50%, #135415ff 100%)",
        py: { xs: 6, md: 4 },
        px: 2,
        textAlign: "center",
        color: "white",
        mb: 0,
      }}
    >
      <Typography
        variant="h3"
        fontWeight={900}
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          mb: 2,
        }}
      >
        El Puente Hacia el Cambio
      </Typography>

      <Typography
        variant="h6"
        sx={{
          maxWidth: 700,
          mx: "auto",
          mb: 4,
          opacity: 0.9,
          fontWeight: 400,
        }}
      >
        Descubre proyectos que transforman comunidades, conecta con organizaciones 
        comprometidas y sé parte del cambio que Costa Rica necesita.
      </Typography>

      <Paper
        elevation={4}
        sx={{
          maxWidth: 600,
          mx: "auto",
          borderRadius: 50,
          overflow: "hidden",
        }}
      >
        <TextField
          fullWidth
          placeholder="Buscar campañas por nombre, causa o ubicación..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: localSearch && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClear}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              px: 2,
              py: 1,
              "& fieldset": { border: "none" },
            },
          }}
        />
      </Paper>

      {/* Stats */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 3, md: 6 },
          mt: 6,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            50+
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Campañas Activas
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight={800}>
            ₡25M+
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Recaudado
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight={800}>
            1,000+
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Donantes
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
