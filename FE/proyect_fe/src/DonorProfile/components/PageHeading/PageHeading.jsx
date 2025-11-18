import { Box, Typography, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import "./PageHeading.css";

export default function PageHeading() {
  return (
    <Box className="page-heading">
      <Typography className="page-title">
        Historial de Donaciones
      </Typography>

      <Button className="export-btn" startIcon={<DownloadIcon />}>
        Exportar Historial
      </Button>
    </Box>
  );
}
