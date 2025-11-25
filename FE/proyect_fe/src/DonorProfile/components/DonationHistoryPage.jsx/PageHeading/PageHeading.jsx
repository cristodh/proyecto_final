// src/components/donations/PageHeading.jsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

export default function PageHeading({ title = "Historial de Donaciones", onExport }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, mb: 3, flexWrap: "wrap" }}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>{title}</Typography>

      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={onExport}
        sx={{ whiteSpace: "nowrap" }}
      >
        Exportar como CSV
      </Button>
    </Box>
  );
}
