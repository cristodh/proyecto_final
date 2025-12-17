// src/components/Header.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import logoFundify from "../../imgs/LogoFundifyClose.png";

export default function MainHeader() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" elevation={0} sx={{
      bgcolor: (t) => `${t.palette.background.paper}`, // slight transparency
      borderBottom: 1,
      borderColor: "primary.main",
      backdropFilter: "blur(6px)"
    }}>
      <Toolbar sx={{ maxWidth: 1400, mx: "auto", width: "100%", px: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }} onClick={() => navigate('/')}>
          <img 
            src={logoFundify} 
            alt="Fundify Logo" 
            style={{ 
              height: "48px",
              width: "auto"
            }} 
          />
        </Box>

        {isMdUp ? (
          <Stack direction="row" spacing={4} sx={{ flex: 1, justifyContent: "center" }}>
            <Button sx={{ textTransform: "none" }}onClick={()=> navigate('/explore-projects')}>Explorar Proyectos</Button>
            <Button sx={{ textTransform: "none" }} onClick={() => navigate('/about-us')}>Conócenos</Button>
           
          </Stack>
        ) : <Box sx={{ flex: 1 }} />}

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
          onClick={()=>navigate('/auth-user')}
          variant="outlined" sx={{ textTransform: "none", minWidth: 100 }}>Iniciar Sesión</Button>
          <Button
          onClick={()=>navigate('/auth-user?tab=register')}
          variant="contained" sx={{ textTransform: "none", minWidth: 100 }}>Registrarse</Button>
          {!isMdUp && (
            <IconButton aria-label="menu" sx={{ ml: 1 }}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
