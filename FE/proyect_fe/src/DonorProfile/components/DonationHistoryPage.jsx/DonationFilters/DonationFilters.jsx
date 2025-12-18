// src/components/donations/DonationFilters.jsx
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function DonationFilters({ filters, setFilters, onApply, onClear }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ bgcolor: "background.paper", border: 1, borderColor: "divider", borderRadius: 2, p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="end">
        <Grid item xs={12} md={6} container spacing={2}>
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
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-label">Estado</InputLabel>
              <Select
                labelId="status-label"
                label="Estado"
                name="status"
                value={filters.status || ""}
                onChange={handleChange}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="approved">Completada</MenuItem>
                <MenuItem value="pending">En Proceso</MenuItem>
                <MenuItem value="rejected">Cancelada</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
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
