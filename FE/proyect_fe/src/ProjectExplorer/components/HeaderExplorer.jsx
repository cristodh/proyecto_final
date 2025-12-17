// src/components/Header.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoFundify from "../../imgs/LogoFundifyClose.png";
import { useNavigate } from "react-router-dom";

export default function HeaderExplorer({ onToggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/auth-user");
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        bgcolor: "rgba(240, 249, 255, 0.8)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 88,
          height: 88,
          px: 3,
          justifyContent: "space-between",
          maxWidth: "100vw",
          boxSizing: "border-box",
        }}
      >
        {/* Logo + menú */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, height: 80, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <IconButton
            onClick={onToggleSidebar}
            aria-label="toggle sidebar"
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <img
            src={LogoFundify}
            alt="Fundify Logo"
            style={{
              height: "72px",
              maxHeight: "100%",
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </Box>

        {/* Navegación */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
          <Button
            startIcon={<HomeIcon />}
            onClick={() => navigate("/")}
            sx={{
              textTransform: "none",
              color: "#64748b",
              fontWeight: 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              transition: "all 0.2s ease",
              "&:hover": {
                color: "#2A9D8F",
                bgcolor: "rgba(42, 157, 143, 0.08)",
              },
            }}
          >
            Inicio
          </Button>

          <Button
            startIcon={<ExploreIcon />}
            onClick={() => navigate("/explore-projects")}
            sx={{
              textTransform: "none",
              color: "#64748b",
              fontWeight: 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              transition: "all 0.2s ease",
              "&:hover": {
                color: "#2A9D8F",
                bgcolor: "rgba(42, 157, 143, 0.08)",
              },
            }}
          >
            Explorar Proyectos
          </Button>

          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              color: "#dc2626",
              fontWeight: 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              transition: "all 0.2s ease",
              "&:hover": {
                color: "#ffffff",
                bgcolor: "#dc2626",
              },
            }}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
