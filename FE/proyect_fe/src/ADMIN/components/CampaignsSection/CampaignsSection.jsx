import React, { useState } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  LinearProgress,
  Avatar,
  Menu,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Alert,
  InputAdornment,
  Badge,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PendingIcon from "@mui/icons-material/Pending";
import CampaignIcon from "@mui/icons-material/Campaign";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FilterListIcon from "@mui/icons-material/FilterList";

import { useCampaigns, STATUS_CONFIG, CAMPAIGN_STATUS } from "./useCampaigns";
import CampaignDetailsModal from "./CampaignDetailsModal";
import CampaignReviewModal from "./CampaignReviewModal";
import CampaignEditModal from "./CampaignEditModal";

// Componente de tarjeta de estadística
function StatCard({ title, value, icon, color, subtitle }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        transition: "all 0.2s",
        "&:hover": { boxShadow: 2, transform: "translateY(-2px)" },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: `${color}.main`, mt: 0.5 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.100`, color: `${color}.main` }}>{icon}</Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}

// Componente de fila de campaña
function CampaignRow({ campaign, calculateProgress, onViewDetails, onAction }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const progress = calculateProgress(campaign.current_amount, campaign.goal_amount);
  const statusConfig = STATUS_CONFIG[campaign.campaign_status] || STATUS_CONFIG.pending;

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    handleMenuClose();
    onAction(campaign, action);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
      notation: "compact",
    }).format(amount || 0);
  };

  return (
    <TableRow
      hover
      sx={{
        cursor: "pointer",
        "&:hover": { bgcolor: "action.hover" },
      }}
      onClick={() => onViewDetails(campaign)}
    >
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "primary.100", color: "primary.main" }}>
            <CampaignIcon />
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {campaign.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {campaign.short_description || campaign.slogan || "Sin descripción corta"}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {campaign.creator_username || "Sin asignar"}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip label={campaign.category_name || "Sin categoría"} variant="outlined" size="small" />
      </TableCell>
      <TableCell>
        <Box sx={{ minWidth: 150 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              {formatCurrency(campaign.current_amount)}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {progress.toFixed(0)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: "grey.200",
              "& .MuiLinearProgress-bar": {
                bgcolor: progress >= 100 ? "success.main" : progress >= 50 ? "primary.main" : "warning.main",
              },
            }}
          />
          <Typography variant="caption" color="text.secondary">
            Meta: {formatCurrency(campaign.goal_amount)}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Chip
          label={statusConfig.label}
          size="small"
          sx={{
            bgcolor: statusConfig.bgColor,
            color: statusConfig.textColor,
            fontWeight: 600,
          }}
        />
      </TableCell>
      <TableCell align="right" onClick={(e) => e.stopPropagation()}>
        <Tooltip title="Ver detalles">
          <IconButton size="small" onClick={() => onViewDetails(campaign)}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Más acciones">
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {campaign.campaign_status === CAMPAIGN_STATUS.PENDING && [
            <MenuItem key="approve" onClick={() => handleAction("approve")}>
              <ListItemIcon>
                <CheckCircleIcon color="success" fontSize="small" />
              </ListItemIcon>
              <ListItemText>Aprobar</ListItemText>
            </MenuItem>,
            <MenuItem key="reject" onClick={() => handleAction("reject")}>
              <ListItemIcon>
                <CancelIcon color="error" fontSize="small" />
              </ListItemIcon>
              <ListItemText>Rechazar</ListItemText>
            </MenuItem>,
          ]}
          {campaign.campaign_status === CAMPAIGN_STATUS.ACTIVE && [
            <MenuItem key="detain" onClick={() => handleAction("detain")}>
              <ListItemIcon>
                <PauseCircleIcon color="warning" fontSize="small" />
              </ListItemIcon>
              <ListItemText>Detener</ListItemText>
            </MenuItem>,
            <MenuItem key="complete" onClick={() => handleAction("complete")}>
              <ListItemIcon>
                <FlagIcon color="info" fontSize="small" />
              </ListItemIcon>
              <ListItemText>Completar</ListItemText>
            </MenuItem>,
          ]}
          {campaign.campaign_status === CAMPAIGN_STATUS.DETAINED && (
            <MenuItem onClick={() => handleAction("approve")}>
              <ListItemIcon>
                <PlayCircleIcon color="success" fontSize="small" />
              </ListItemIcon>
              <ListItemText>Reactivar</ListItemText>
            </MenuItem>
          )}
          {(campaign.campaign_status === CAMPAIGN_STATUS.REJECTED ||
            campaign.campaign_status === CAMPAIGN_STATUS.COMPLETED) && (
            <MenuItem onClick={() => handleAction("pending")}>
              <ListItemIcon>
                <PendingIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Poner Pendiente</ListItemText>
            </MenuItem>
          )}
          <MenuItem onClick={() => handleAction("delete")} sx={{ color: "error.main" }}>
            <ListItemIcon>
              <DeleteIcon color="error" fontSize="small" />
            </ListItemIcon>
            <ListItemText>Eliminar</ListItemText>
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
}

// Componente principal
export default function CampaignsSection() {
  const {
    filteredCampaigns,
    stats,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    selectedCampaign,
    detailsModalOpen,
    reviewModalOpen,
    editModalOpen,
    reviewAction,
    fetchCampaigns,
    updateCampaignStatus,
    updateCampaign,
    deleteCampaign,
    evaluateChecklist,
    calculateProgress,
    openDetailsModal,
    openReviewModal,
    openEditModal,
    closeModals,
  } = useCampaigns();

  const handleAction = (campaign, action) => {
    if (action === "delete") {
      if (window.confirm(`¿Estás seguro de eliminar la campaña "${campaign.name}"?`)) {
        deleteCampaign(campaign.id);
      }
    } else {
      openReviewModal(campaign, action);
    }
  };

  const handleReviewConfirm = async (data) => {
    await updateCampaignStatus(data.campaignId, data.newStatus, data.comment);
  };

  const handleQuickAction = (campaign, action) => {
    openReviewModal(campaign, action);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            🎯 Gestión de Campañas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Control completo sobre todas las campañas del sistema
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={fetchCampaigns}
          disabled={loading}
        >
          Actualizar
        </Button>
      </Box>

      {/* Estadísticas */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Total"
            value={stats.total}
            icon={<CampaignIcon />}
            color="primary"
            subtitle="Campañas registradas"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Pendientes"
            value={stats.pending}
            icon={<PendingIcon />}
            color="warning"
            subtitle="Por revisar"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Activas"
            value={stats.active}
            icon={<PlayCircleIcon />}
            color="success"
            subtitle="En curso"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Completadas"
            value={stats.completed}
            icon={<FlagIcon />}
            color="info"
            subtitle="Finalizadas con éxito"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Recaudado"
            value={`₡${(stats.totalRaised / 1000).toFixed(0)}K`}
            icon={<AttachMoneyIcon />}
            color="success"
            subtitle={`${stats.avgProgress.toFixed(0)}% promedio`}
          />
        </Grid>
      </Grid>

      {/* Alertas */}
      {stats.pending > 0 && (
        <Alert
          severity="warning"
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" size="small" onClick={() => setFilterStatus(CAMPAIGN_STATUS.PENDING)}>
              Ver pendientes
            </Button>
          }
        >
          Tienes <strong>{stats.pending} campaña(s) pendiente(s)</strong> de revisión.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error} - Mostrando datos de demostración.
        </Alert>
      )}

      {/* Filtros y búsqueda */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar por nombre, creador, categoría o ubicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              label="Filtrar por Estado"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="all">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Todos los estados
                  <Chip label={stats.total} size="small" />
                </Box>
              </MenuItem>
              <MenuItem value={CAMPAIGN_STATUS.PENDING}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: STATUS_CONFIG.pending.textColor }} />
                  Pendientes
                  <Chip label={stats.pending} size="small" color="warning" />
                </Box>
              </MenuItem>
              <MenuItem value={CAMPAIGN_STATUS.ACTIVE}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: STATUS_CONFIG.active.textColor }} />
                  Activas
                  <Chip label={stats.active} size="small" color="success" />
                </Box>
              </MenuItem>
              <MenuItem value={CAMPAIGN_STATUS.DETAINED}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: STATUS_CONFIG.detained.textColor }} />
                  Detenidas
                  <Chip label={stats.detained} size="small" color="warning" />
                </Box>
              </MenuItem>
              <MenuItem value={CAMPAIGN_STATUS.COMPLETED}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: STATUS_CONFIG.completed.textColor }} />
                  Completadas
                  <Chip label={stats.completed} size="small" color="info" />
                </Box>
              </MenuItem>
              <MenuItem value={CAMPAIGN_STATUS.REJECTED}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: STATUS_CONFIG.rejected.textColor }} />
                  Rechazadas
                  <Chip label={stats.rejected} size="small" color="error" />
                </Box>
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "right" }}>
              Mostrando <strong>{filteredCampaigns.length}</strong> de <strong>{stats.total}</strong>
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabla de campañas */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Campaña</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Creador</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Categoría</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Progreso</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Box>
                        <Skeleton width={150} />
                        <Skeleton width={100} />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell><Skeleton width={100} /></TableCell>
                  <TableCell><Skeleton width={80} /></TableCell>
                  <TableCell><Skeleton width={150} /></TableCell>
                  <TableCell><Skeleton width={80} /></TableCell>
                  <TableCell><Skeleton width={60} /></TableCell>
                </TableRow>
              ))
            ) : filteredCampaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    No se encontraron campañas con los filtros seleccionados.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredCampaigns.map((campaign) => (
                <CampaignRow
                  key={campaign.id}
                  campaign={campaign}
                  calculateProgress={calculateProgress}
                  onViewDetails={openDetailsModal}
                  onAction={handleAction}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modales */}
      <CampaignDetailsModal
        open={detailsModalOpen}
        onClose={closeModals}
        campaign={selectedCampaign}
        evaluateChecklist={evaluateChecklist}
        calculateProgress={calculateProgress}
        onApprove={(c) => handleQuickAction(c, "approve")}
        onReject={(c) => handleQuickAction(c, "reject")}
        onDetain={(c) => handleQuickAction(c, "detain")}
        onComplete={(c) => handleQuickAction(c, "complete")}
        onEdit={openEditModal}
      />

      <CampaignReviewModal
        open={reviewModalOpen}
        onClose={closeModals}
        campaign={selectedCampaign}
        action={reviewAction}
        evaluateChecklist={evaluateChecklist}
        onConfirm={handleReviewConfirm}
      />

      <CampaignEditModal
        open={editModalOpen}
        onClose={closeModals}
        campaign={selectedCampaign}
        onSave={updateCampaign}
      />
    </Container>
  );
}
