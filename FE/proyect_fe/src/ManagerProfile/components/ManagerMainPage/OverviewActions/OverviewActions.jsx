// src/ManagerProfile/components/ManagerMainPage/OverviewActions/OverviewActions.jsx
import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CampaignIcon from "@mui/icons-material/Campaign";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

export default function OverviewActions() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={0} sx={{ 
          p: 2, 
          border: "1px solid rgba(255,140,0,0.1)", 
          borderRadius: 2, 
          display: "flex", 
          gap: 2,
          background: "linear-gradient(135deg, rgba(255, 140, 0, 0.02) 0%, rgba(255, 140, 0, 0.01) 100%)",
          transition: "all 0.2s ease",
          '&:hover': {
            borderColor: "rgba(255,140,0,0.2)",
            boxShadow: "0 4px 12px rgba(255,140,0,0.08)",
          }
        }}>
          <Box sx={{ 
            width: 48, 
            height: 48, 
            bgcolor: "rgba(255, 140, 0, 0.1)", 
            color: "#FF8C00", 
            borderRadius: 1.5, 
            display: "grid", 
            placeItems: "center" 
          }}>
            <CampaignIcon />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>Gestionar Proyectos</Typography>
            <Typography variant="body2" color="text.secondary">Revisa y administra todos tus proyectos activos.</Typography>
            <Box sx={{ mt: 1 }}>
              <Button 
                size="small"
                sx={{ 
                  color: "#FF8C00",
                  '&:hover': {
                    bgcolor: "rgba(255, 140, 0, 0.08)",
                  }
                }}
              >
                Ver proyectos
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper elevation={0} sx={{ 
          p: 2, 
          border: "1px solid rgba(255,140,0,0.1)", 
          borderRadius: 2, 
          display: "flex", 
          gap: 2,
          background: "linear-gradient(135deg, rgba(255, 140, 0, 0.02) 0%, rgba(255, 140, 0, 0.01) 100%)",
          transition: "all 0.2s ease",
          '&:hover': {
            borderColor: "rgba(255,140,0,0.2)",
            boxShadow: "0 4px 12px rgba(255,140,0,0.08)",
          }
        }}>
          <Box sx={{ 
            width: 48, 
            height: 48, 
            bgcolor: "rgba(255, 140, 0, 0.1)", 
            color: "#FF8C00", 
            borderRadius: 1.5, 
            display: "grid", 
            placeItems: "center" 
          }}>
            <AddIcon />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>Crear Nuevo Proyecto</Typography>
            <Typography variant="body2" color="text.secondary">Lanza una nueva campaña de recaudación de fondos.</Typography>
            <Box sx={{ mt: 1 }}>
              <Button 
                size="small"
                sx={{ 
                  color: "#FF8C00",
                  '&:hover': {
                    bgcolor: "rgba(255, 140, 0, 0.08)",
                  }
                }}
              >
                Crear proyecto
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}