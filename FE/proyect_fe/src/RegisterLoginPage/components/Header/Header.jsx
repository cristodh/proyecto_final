// src/components/Header.jsx
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logoFundify from "../../../imgs/LogoFundifyClose.png";

export default function Header() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
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
          <img 
            src={logoFundify} 
            alt="Fundify Logo" 
            style={{ 
              height: "48px",
              width: "auto"
            }} 
          />
        </Box>

        {/* Botón */}
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            background: "#2A9D8F",
            fontWeight: 700,
            "&:hover": { background: "#02695dff" },
            textTransform: "none"
          }}
        >
          Inicio
        </Button>
      </Toolbar>
    </AppBar>
  );
}