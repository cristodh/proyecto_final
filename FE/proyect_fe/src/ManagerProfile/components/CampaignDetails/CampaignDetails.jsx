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

  const progress = (campaign.raised / campaign.goal) * 100;
  
  // Calcular días restantes (ejemplo: 45 días)
  const endDate = new Date('2025-01-15');
  const today = new Date();
  const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
  
  // Datos de ejemplo para las secciones del proyecto
  const projectSections = [
    { name: "Cemento", goal: 150000, raised: 120000, percentage: 80 },
    { name: "Arena y Grava", goal: 80000, raised: 65000, percentage: 81 },
    { name: "Láminas de Techo", goal: 200000, raised: 50000, percentage: 25 },
    { name: "Transporte", goal: 100000, raised: 85000, percentage: 85 },
    { name: "Mano de Obra", goal: 300000, raised: 180000, percentage: 60 },
    { name: "Materiales Eléctricos", goal: 120000, raised: 30000, percentage: 25 }
  ];
  
  // Donadores recientes
  const recentDonors = [
    { name: "María González", amount: 15000, date: "2024-12-01", message: "¡Excelente proyecto! Espero ayude a muchas familias." },
    { name: "Carlos Rodríguez", amount: 25000, date: "2024-11-30", message: "Mi granito de arena para esta noble causa." },
    { name: "Ana Martínez", amount: 10000, date: "2024-11-29", message: "Que Dios bendiga este proyecto y a todas las familias beneficiadas." },
    { name: "José Pérez", amount: 50000, date: "2024-11-28", message: "Como constructor, sé lo importante que es tener un hogar digno." },
    { name: "Laura Jiménez", amount: 8000, date: "2024-11-27", message: "Pequeña contribución con mucho amor." }
  ];
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Activo": return { bg: "rgba(30, 58, 138, 0.1)", color: "#1E3A8A" };
      case "Completado": return { bg: "rgba(34, 197, 94, 0.1)", color: "#059669" };
      case "Pausado": return { bg: "rgba(156, 163, 175, 0.1)", color: "#6B7280" };
      default: return { bg: "rgba(30, 58, 138, 0.1)", color: "#1E3A8A" };
    }
  };

  const statusStyle = getStatusColor(campaign.status);

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
            label={campaign.status}
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
            {campaign.description}
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
                value={progress}
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
                  ₡{campaign.raised.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ₡{campaign.goal.toLocaleString()}
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
                {daysRemaining}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Hasta el 15 de enero
              </Typography>
            </Paper>
          </Grid>

          {/* Total Donadores */}
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              border: "1px solid rgba(30,58,138,0.1)" 
            }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PeopleIcon sx={{ color: "#3B82F6", mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Total Donadores
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={700} sx={{ color: "#1E3A8A" }}>
                {campaign.donors}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Personas han contribuido
              </Typography>
            </Paper>
          </Grid>

          {/* Promedio por Donación */}
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              border: "1px solid rgba(30,58,138,0.1)" 
            }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingUpIcon sx={{ color: "#3B82F6", mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Promedio Donación
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={700} sx={{ color: "#1E3A8A" }}>
                ₡{Math.round(campaign.raised / campaign.donors).toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Por contribución
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Progreso por Secciones del Proyecto */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3, border: "1px solid rgba(30,58,138,0.1)" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <BuildIcon sx={{ color: "#3B82F6", mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Progreso por Secciones del Proyecto
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {projectSections.map((section, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: "rgba(30, 58, 138, 0.02)" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {section.name}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: "#3B82F6" }}>
                      {section.percentage}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={section.percentage}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: "rgba(30,58,138,0.1)",
                      mb: 1,
                      '& .MuiLinearProgress-bar': {
                        bgcolor: section.percentage >= 80 ? "#22C55E" : section.percentage >= 50 ? "#3B82F6" : "#F59E0B",
                      }
                    }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption" color="text.secondary">
                      ₡{section.raised.toLocaleString()} recaudado
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ₡{section.goal.toLocaleString()} meta
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Información del Proyecto */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(30,58,138,0.1)" }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Información del Proyecto
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocationIcon sx={{ color: "#3B82F6", mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" fontWeight={600}>Ubicación:</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                  Cartago, Costa Rica
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CalendarIcon sx={{ color: "#3B82F6", mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" fontWeight={600}>Fecha de Inicio:</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                  15 de octubre, 2024
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CalendarIcon sx={{ color: "#3B82F6", mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" fontWeight={600}>Fecha Final:</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                  15 de enero, 2025
                </Typography>
              </Box>

              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Chip
                    label={campaign.status}
                    size="small"
                    sx={{
                      bgcolor: statusStyle.bg,
                      color: statusStyle.color,
                      fontWeight: 600,
                    }}
                  />
                  <Typography variant="body2" fontWeight={600} sx={{ ml: 1 }}>Estado Actual</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Donadores Recientes */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(30,58,138,0.1)", maxHeight: 400, overflow: 'auto' }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PersonIcon sx={{ color: "#3B82F6", mr: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                  Donadores Recientes
                </Typography>
              </Box>
              {recentDonors.map((donor, index) => (
                <Box key={index} sx={{ 
                  p: 2, 
                  mb: 2, 
                  borderRadius: 2, 
                  bgcolor: "rgba(30, 58, 138, 0.02)",
                  border: "1px solid rgba(30, 58, 138, 0.08)"
                }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {donor.name}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: "#22C55E" }}>
                      ₡{donor.amount.toLocaleString()}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    {new Date(donor.date).toLocaleDateString('es-ES')}
                  </Typography>
                  {donor.message && (
                    <Typography variant="body2" sx={{ 
                      fontStyle: 'italic', 
                      color: "text.secondary",
                      fontSize: '0.875rem'
                    }}>
                      "{donor.message}"
                    </Typography>
                  )}
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>

        {/* Comentarios de Donantes */}
        <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(30,58,138,0.1)" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <CommentIcon sx={{ color: "#3B82F6", mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>
              Comentarios de los Donantes
            </Typography>
          </Box>
          <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
            {recentDonors.map((donor, index) => (
              <Box key={index} sx={{ 
                p: 3, 
                mb: 2, 
                borderRadius: 2, 
                bgcolor: "rgba(30, 58, 138, 0.02)",
                border: "1px solid rgba(30, 58, 138, 0.08)"
              }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: "#3B82F6", 
                    width: 32, 
                    height: 32, 
                    fontSize: '0.875rem',
                    mr: 2
                  }}>
                    {donor.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {donor.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(donor.date).toLocaleDateString('es-ES')} • ₡{donor.amount.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                  {donor.message}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </DialogContent>
    </Dialog>
  );
}