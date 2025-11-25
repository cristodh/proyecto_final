// src/components/Sidebar.jsx
import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import userIcon from "../../../imgs/UserIcon.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 280;

export default function Sidebar({ open, onClose }) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const location = useLocation();

  // Función para determinar si una ruta está activa
  const isActiveRoute = (path) => {
    return location.pathname.includes(`donor_profile${path}`);
  };

  // Función para navegar a una ruta específica
  const handleNavigation = (path) => {
    navigate(`/donor_profile${path}`);
    if (onClose) onClose(); // Cerrar sidebar en móvil después de navegar
  };

  const content = (
    <Box sx={{ 
      width: drawerWidth, 
      display: "flex", 
      flexDirection: "column", 
      height: "100%", 
      background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      borderRight: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "2px 0 20px rgba(0,0,0,0.05)",
    }}>
      <Box sx={{ 
        p: 3, 
        display: "flex", 
        gap: 2, 
        alignItems: "center",
        backgroundColor: "rgba(42, 157, 143, 0.04)",
        borderBottom: "1px solid rgba(42, 157, 143, 0.1)",
      }}>
        <Avatar 
          src={userIcon} 
          sx={{ 
            width: 56, 
            height: 56,
            boxShadow: "0 4px 16px rgba(42, 157, 143, 0.2)",
          }} 
        />
        <Box>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 700, 
              color: "#1a202c",
              fontSize: "0.95rem",
            }}
          >
            Carlos Mendoza
          </Typography>
          <Typography 
            variant="caption" 
            sx={{
              color: "#64748b",
              fontWeight: 500,
              fontSize: "0.75rem",
            }}
          >
            Miembro desde Oct 2023
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
          <Box sx={{ 
            flex: 1, 
            borderRadius: 2, 
            p: 2, 
            background: "linear-gradient(135deg, rgba(42, 157, 143, 0.08) 0%, rgba(42, 157, 143, 0.04) 100%)",
            border: "1px solid rgba(42, 157, 143, 0.1)",
            textAlign: "center",
            transition: "all 0.2s ease",
            '&:hover': {
              background: "linear-gradient(135deg, rgba(42, 157, 143, 0.12) 0%, rgba(42, 157, 143, 0.06) 100%)",
              transform: "translateY(-1px)",
            }
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color: "#2A9D8F",
                fontSize: "1.1rem",
                mb: 0.5,
              }}
            >
              €1,250
            </Typography>
            <Typography 
              variant="caption" 
              sx={{
                color: "#64748b",
                fontWeight: 500,
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Total Donado
            </Typography>
          </Box>
          <Box sx={{ 
            flex: 1, 
            borderRadius: 2, 
            p: 2, 
            background: "linear-gradient(135deg, rgba(42, 157, 143, 0.08) 0%, rgba(42, 157, 143, 0.04) 100%)",
            border: "1px solid rgba(42, 157, 143, 0.1)",
            textAlign: "center",
            transition: "all 0.2s ease",
            '&:hover': {
              background: "linear-gradient(135deg, rgba(42, 157, 143, 0.12) 0%, rgba(42, 157, 143, 0.06) 100%)",
              transform: "translateY(-1px)",
            }
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color: "#2A9D8F",
                fontSize: "1.1rem",
                mb: 0.5,
              }}
            >
              15
            </Typography>
            <Typography 
              variant="caption" 
              sx={{
                color: "#64748b",
                fontWeight: 500,
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Proyectos Apoyados
            </Typography>
          </Box>
        </Box>

        <List sx={{ px: 1 }}>
          <ListItemButton 
            selected={isActiveRoute('/main')}
            onClick={() => handleNavigation('/main')}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                backgroundColor: '#2A9D8F',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#238A7B',
                },
              },
              '&.Mui-selected .MuiListItemIcon-root': {
                color: '#ffffff',
              },
              '&:not(.Mui-selected)': {
                color: '#64748b',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(42, 157, 143, 0.08)',
                  color: '#2A9D8F',
                },
                '&:hover .MuiListItemIcon-root': {
                  color: '#2A9D8F',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Resumen" 
              primaryTypographyProps={{ 
                fontWeight: isActiveRoute('/main') ? 600 : 500,
                fontSize: '0.9rem',
              }} 
            />
          </ListItemButton>
          
          <ListItemButton
            selected={isActiveRoute('/history')}
            onClick={() => handleNavigation('/history')}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                backgroundColor: '#2A9D8F',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#238A7B',
                },
              },
              '&.Mui-selected .MuiListItemIcon-root': {
                color: '#ffffff',
              },
              '&:not(.Mui-selected)': {
                color: '#64748b',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(42, 157, 143, 0.08)',
                  color: '#2A9D8F',
                },
                '&:hover .MuiListItemIcon-root': {
                  color: '#2A9D8F',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Historial de Donaciones"
              primaryTypographyProps={{ 
                fontWeight: isActiveRoute('/history') ? 600 : 500,
                fontSize: '0.9rem',
              }} 
            />
          </ListItemButton>
          
          <ListItemButton
            selected={isActiveRoute('/followed')}
            onClick={() => handleNavigation('/followed')}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                backgroundColor: '#2A9D8F',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#238A7B',
                },
              },
              '&.Mui-selected .MuiListItemIcon-root': {
                color: '#ffffff',
              },
              '&:not(.Mui-selected)': {
                color: '#64748b',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(42, 157, 143, 0.08)',
                  color: '#2A9D8F',
                },
                '&:hover .MuiListItemIcon-root': {
                  color: '#2A9D8F',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Proyectos Seguidos"
              primaryTypographyProps={{ 
                fontWeight: isActiveRoute('/followed') ? 600 : 500,
                fontSize: '0.9rem',
              }} 
            />
          </ListItemButton>
          
          <ListItemButton
            selected={isActiveRoute('/config')}
            onClick={() => handleNavigation('/config')}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                backgroundColor: '#2A9D8F',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#238A7B',
                },
              },
              '&.Mui-selected .MuiListItemIcon-root': {
                color: '#ffffff',
              },
              '&:not(.Mui-selected)': {
                color: '#64748b',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(42, 157, 143, 0.08)',
                  color: '#2A9D8F',
                },
                '&:hover .MuiListItemIcon-root': {
                  color: '#2A9D8F',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Configuración"
              primaryTypographyProps={{ 
                fontWeight: isActiveRoute('/config') ? 600 : 500,
                fontSize: '0.9rem',
              }} 
            />
          </ListItemButton>
        </List>
      </Box>

      <Box sx={{ 
        p: 3, 
        mt: 'auto',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        backgroundColor: 'rgba(42, 157, 143, 0.02)',
      }}>
        <Typography 
          variant="caption" 
          sx={{ 
            display: "block", 
            textAlign: 'center',
            color: '#64748b',
            fontWeight: 500,
            fontSize: '0.75rem',
          }}
        >
          © 2025 Fundify
        </Typography>
      </Box>
    </Box>
  );

  if (mdUp) {
    // permanent sidebar on md+ (fixed position)
    return (
      <Box component="aside" sx={{ width: drawerWidth, flexShrink: 0, position: "fixed", left: 0, top: "88px", bottom: 0, overflow: "auto", zIndex: 1000 }}>
        {content}
      </Box>
    );
  }

  return (
    <Drawer open={open} onClose={onClose} ModalProps={{ keepMounted: true }}>
      {content}
    </Drawer>
  );
}
