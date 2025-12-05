import React from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Slider,
  Select,
  MenuItem,
} from "@mui/material";

export default function ExploreFilters() {
  return (
    <Box
      sx={{
        width: 280,
        p: 3,
        borderRadius: 3,
        boxShadow: 2,
        display: { xs: "none", md: "block" },
      }}
    >
      <Typography fontWeight={700} mb={2}>
        Filtrar Proyectos
      </Typography>

      <Typography fontWeight={600} mt={2}>
        Categorías
      </Typography>

      {["Educación", "Salud", "Medio Ambiente", "Arte", "Otros"].map((cat) => (
        <FormControlLabel key={cat} control={<Checkbox />} label={cat} />
      ))}

      <Typography fontWeight={600} mt={2}>
        Ubicación
      </Typography>

      <TextField fullWidth placeholder="Ciudad o región" />

      <Typography fontWeight={600} mt={3}>
        Meta de financiación
      </Typography>

      <Slider defaultValue={50} />

      <Typography fontWeight={600} mt={2}>
        Ordenar por
      </Typography>

      <Select fullWidth defaultValue="recent">
        <MenuItem value="recent">Más Recientes</MenuItem>
        <MenuItem value="popular">Populares</MenuItem>
        <MenuItem value="ending">Cerca de Finalizar</MenuItem>
        <MenuItem value="top">Mayor Financiamiento</MenuItem>
      </Select>
    </Box>
  );
}
