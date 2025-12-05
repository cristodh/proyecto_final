import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function ExploreHero() {
  return (
    <Box textAlign="center" mb={6}>
      <Typography variant="h3" fontWeight={900} color="primary" gutterBottom>
        El Puente Hacia el Cambio
      </Typography>

      <Typography color="text.secondary" maxWidth={600} mx="auto">
        Descubre proyectos, conecta con creadores y sé parte de la transformación.
      </Typography>

      <Box mt={4} maxWidth={500} mx="auto">
        <TextField
          fullWidth
          placeholder="Buscar por nombre, causa o comunidad"
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
        />
      </Box>
    </Box>
  );
}
