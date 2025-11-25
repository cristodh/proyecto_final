// src/components/donations/DonationFilters.jsx
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function DonationFilters({ filters, setFilters, onApply, onClear }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ bgcolor: "background.paper", border: 1, borderColor: "divider", borderRadius: 2, p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="end">
        <Grid item xs={12} md={6} lg={7} container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Desde"
              name="from"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={filters.from}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Hasta"
              name="to"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={filters.to}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>

        <Grid item xs={12} md={6} lg={5}>
          <TextField
            label="Buscar proyecto"
            name="q"
            value={filters.q}
            onChange={handleChange}
            placeholder="Nombre del proyecto..."
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={onApply}>Aplicar Filtros</Button>
          <Button variant="outlined" onClick={onClear}>Limpiar</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
