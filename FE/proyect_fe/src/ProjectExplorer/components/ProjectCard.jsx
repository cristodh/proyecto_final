import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  LinearProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";

// Imagen placeholder si no hay imagen
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/400x200?text=Campa%C3%B1a";

export default function ProjectCard({
  campaign,
  onViewDetails,
  onDonate,
  canDonate = false,
  formatCurrency,
  calculateProgress,
}) {
  // Manejar datos de la campaña - usando nombres de campo del backend
  const {
    id,
    name,
    description,
    main_image,
    goal_amount,
    current_amount,
    end_date,
    campaign_status,
    category_name,
    creator_username,
    location,
  } = campaign || {};

  // Calcular progreso
  const progress = calculateProgress ? calculateProgress(current_amount, goal_amount) : 
    ((parseFloat(current_amount) / parseFloat(goal_amount)) * 100) || 0;

  // Formatear moneda
  const formatMoney = (value) => {
    if (formatCurrency) return formatCurrency(value);
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  // Calcular días restantes
  const getDaysRemaining = () => {
    if (!end_date) return null;
    const endDate = new Date(end_date);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = getDaysRemaining();

  // Color de progreso según porcentaje
  const getProgressColor = () => {
    if (progress >= 100) return "success";
    if (progress >= 50) return "primary";
    if (progress >= 25) return "warning";
    return "error";
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 6,
        },
      }}
    >
      {/* Imagen de la campaña */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={main_image || PLACEHOLDER_IMAGE}
          alt={name}
          sx={{ objectFit: "cover" }}
        />
        
        {/* Overlay con acciones rápidas */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
            opacity: 0,
            transition: "opacity 0.3s",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            p: 1,
            "&:hover": { opacity: 1 },
          }}
        >
          <IconButton size="small" sx={{ color: "white" }}>
            <ShareIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Badge de días restantes */}
        {daysRemaining !== null && (
          <Chip
            size="small"
            icon={<CalendarTodayIcon sx={{ fontSize: 14 }} />}
            label={daysRemaining > 0 ? `${daysRemaining} días` : "Finalizada"}
            color={daysRemaining > 7 ? "primary" : daysRemaining > 0 ? "warning" : "default"}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              fontWeight: 600,
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Categoría y ubicación */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
          {category_name && (
            <Chip
              label={category_name}
              color="primary"
              size="small"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          )}
          {location && (
            <Tooltip title={creator_username || "Creador"}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <LocationOnIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">
                  {location}
                </Typography>
              </Box>
            </Tooltip>
          )}
        </Box>

        {/* Título */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.3,
            minHeight: "2.6em",
          }}
        >
          {name}
        </Typography>

        {/* Descripción */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            flexGrow: 1,
          }}
        >
          {description}
        </Typography>

        {/* Barra de progreso */}
        <Box sx={{ mb: 1.5 }}>
          <LinearProgress
            variant="determinate"
            value={Math.min(progress, 100)}
            color={getProgressColor()}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: "grey.200",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
              },
            }}
          />
        </Box>

        {/* Montos */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} color="primary">
              {formatMoney(current_amount)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              recaudado
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="body2" fontWeight={600}>
              {progress.toFixed(0)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              de {formatMoney(goal_amount)}
            </Typography>
          </Box>
        </Box>

        {/* Creador */}
        {creator_username && (
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Por: {creator_username}
          </Typography>
        )}

        {/* Botones de acción */}
        <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<VisibilityIcon />}
            onClick={() => onViewDetails && onViewDetails(campaign)}
            sx={{ flex: 1 }}
          >
            Ver Detalles
          </Button>
          {canDonate && (
            <Button
              variant="contained"
              fullWidth
              startIcon={<FavoriteIcon />}
              onClick={() => onDonate && onDonate(campaign)}
              sx={{ flex: 1 }}
              disabled={daysRemaining === 0}
            >
              Donar
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}