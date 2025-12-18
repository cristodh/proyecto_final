import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Chip,
  LinearProgress,
  Grid,
  Paper,
  Divider,
  IconButton,
  Avatar
} from "@mui/material";
import {
  Close as CloseIcon,
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Comment as CommentIcon,
  Build as BuildIcon
} from "@mui/icons-material";

export default function CampaignDetails({ open, onClose, campaign }) {
  if (!campaign) return null;

  const progress = campaign.goal_amount > 0 
    ? (campaign.current_amount / campaign.goal_amount) * 100 
    : 0;
  
  // Calcular días restantes
  const endDate = campaign.end_date ? new Date(campaign.end_date) : null;
  const today = new Date();
  const daysRemaining = endDate 
    ? Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
    : 0;
  
  const getStatusLabel = (status) => {
    const statusMap = {
      PENDING: "Pendiente",
      APPROVED: "Activa",
      REJECTED: "Rechazada",
      COMPLETED: "Completada",
    };
    return statusMap[status] || status;
  };
  
  const getStatusColor = (status) => {
    if (status === "APPROVED") return { bg: "rgba(30, 58, 138, 0.1)", color: "#1E3A8A" };
    if (status === "COMPLETED") return { bg: "rgba(34, 197, 94, 0.1)", color: "#059669" };
    if (status === "REJECTED") return { bg: "rgba(239, 68, 68, 0.1)", color: "#DC2626" };
    return { bg: "rgba(156, 163, 175, 0.1)", color: "#6B7280" };
  };

  const statusStyle = getStatusColor(campaign.campaign_status);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 3,
          maxHeight: '95vh',
          height: 'auto',
          width: '90vw'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 2,
        borderBottom: "1px solid rgba(30, 58, 138, 0.1)"
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h5" fontWeight={700}>
            Detalles del Proyecto
          </Typography>
          <Chip
            label={getStatusLabel(campaign.campaign_status)}
            size="small"
            sx={{
              bgcolor: statusStyle.bg,
              color: statusStyle.color,
              fontWeight: 600,
            }}
          />
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {/* Título y Descripción Principal */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 2, color: "#1a202c" }}>
            {campaign.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
            {campaign.short_description}
          </Typography>
        </Box>

        {/* Información Principal en Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Progreso General */}
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              border: "1px solid rgba(30,58,138,0.1)",
              background: "linear-gradient(135deg, rgba(30, 58, 138, 0.05) 0%, rgba(30, 58, 138, 0.02) 100%)"
            }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingUpIcon sx={{ color: "#3B82F6", mr: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                  Progreso General
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={700} sx={{ color: "#1E3A8A", mb: 1 }}>
                {Math.round(progress)}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min(100, progress)}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "rgba(30,58,138,0.1)",
                  '& .MuiLinearProgress-bar': {
                    bgcolor: "#3B82F6",
                  }
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  ₡{(campaign.current_amount || 0).toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ₡{(campaign.goal_amount || 0).toLocaleString()}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Días Restantes */}
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              border: "1px solid rgba(30,58,138,0.1)" 
            }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TimeIcon sx={{ color: "#3B82F6", mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Días Restantes
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={700} sx={{ color: daysRemaining > 30 ? "#1E3A8A" : daysRemaining > 10 ? "#F59E0B" : "#EF4444" }}>
                {Math.max(0, daysRemaining)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {endDate ? endDate.toLocaleDateString('es-ES') : 'Sin fecha de fin'}
              </Typography>
            </Paper>
          </Grid>

          {/* Impacto Estimado */}
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              border: "1px solid rgba(30,58,138,0.1)" 
            }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PeopleIcon sx={{ color: "#3B82F6", mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Vidas a Impactar
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={700} sx={{ color: "#1E3A8A" }}>
                {campaign.lives_impact_estimate || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Estimado de beneficiarios
              </Typography>
            </Paper>
          </Grid>

          {/* Ubicación */}
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              border: "1px solid rgba(30,58,138,0.1)" 
            }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationIcon sx={{ color: "#3B82F6", mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Provincia
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight={600}>
                {campaign.province || "No especificada"}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Información Adicional */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(30,58,138,0.1)" }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Información del Proyecto
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                      Categoría:
                    </Typography>
                    <Typography variant="body2">
                      {campaign.category || "No especificada"}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                      Fecha de Creación:
                    </Typography>
                    <Typography variant="body2">
                      {campaign.created_at ? new Date(campaign.created_at).toLocaleDateString('es-ES') : "No disponible"}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                      Estado de la Campaña:
                    </Typography>
                    <Chip
                      label={getStatusLabel(campaign.campaign_status)}
                      size="small"
                      sx={{
                        bgcolor: statusStyle.bg,
                        color: statusStyle.color,
                        fontWeight: 600,
                        mt: 1
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                      Descripción Completa:
                    </Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', mt: 1 }}>
                      {campaign.description || "No disponible"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}