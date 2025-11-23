// src/components/Header.jsx
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";

export default function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        borderBottom: "1px solid #cfe7d7",
        background: "#f6f8f6",
        color: "#0d1b12",
        px: { xs: 2, md: 6 },
      }}
    >
      <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          <DiamondIcon sx={{ color: "#179e44" }} />
          <Typography fontWeight={700} fontSize="1.1rem">
            Fundify
          </Typography>
        </Box>

        {/* Botón */}
        <Button
          variant="contained"
          sx={{
            background: "#179e44",
            fontWeight: 700,
            "&:hover": { background: "#128638" },
            textTransform: "none"
          }}
        >
          Iniciar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
}
