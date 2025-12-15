import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  LinearProgress,
  Avatar,
  IconButton,
  Link,
  Stack,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CategoryIcon from "@mui/icons-material/Category";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { STATUS_CONFIG, REVIEW_CHECKLIST } from "./useCampaigns";

export default function CampaignDetailsModal({
  open,
  onClose,
  campaign,
  evaluateChecklist,
  calculateProgress,
  onApprove,
  onReject,
  onDetain,
  onComplete,
}) {
  if (!campaign) return null;

  const progress = calculateProgress(campaign.current_amount, campaign.goal_amount);
  const statusConfig = STATUS_CONFIG[campaign.campaign_status] || STATUS_CONFIG.pending;
  const checklist = evaluateChecklist(campaign);
  const passedCount = checklist.filter((item) => item.passed).length;
  const checklistScore = Math.round((passedCount / checklist.length) * 100);

  const formatDate = (dateStr) => {
    if (!dateStr) return "No especificada";
    return new Date(dateStr).toLocaleDateString("es-CR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const getDaysRemaining = () => {
    if (!campaign.end_date) return null;
    const end = new Date(campaign.end_date);
    const now = new Date();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, maxHeight: "90vh" },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {campaign.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {campaign.short_description || campaign.slogan}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={statusConfig.label}
              sx={{
                bgcolor: statusConfig.bgColor,
                color: statusConfig.textColor,
                fontWeight: 600,
              }}
            />
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Box sx={{ display: "flex", gap: 3 }}>
          {/* Columna izquierda - Info principal (scrolleable) */}
          <Box sx={{ flex: 1, minWidth: 0, maxHeight: "65vh", overflow: "auto", pr: 1 }}>
            {/* Progreso de recaudación */}
            <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: "grey.50", borderRadius: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  <TrendingUpIcon sx={{ fontSize: 18, mr: 0.5, verticalAlign: "middle" }} />
                  Progreso de Recaudación
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.main" }}>
                  {progress.toFixed(1)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ height: 10, borderRadius: 5, mb: 1 }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Recaudado: <strong>{formatCurrency(campaign.current_amount)}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Meta: <strong>{formatCurrency(campaign.goal_amount)}</strong>
                </Typography>
              </Box>
              {daysRemaining !== null && (
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 1,
                    color: daysRemaining < 7 ? "error.main" : "text.secondary",
                  }}
                >
                  {daysRemaining > 0
                    ? `${daysRemaining} días restantes`
                    : daysRemaining === 0
                    ? "¡Último día!"
                    : "Campaña finalizada"}
                </Typography>
              )}
            </Paper>

            {/* Descripción */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Descripción
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
                {campaign.description || "Sin descripción"}
              </Typography>
            </Box>

            {/* Historia */}
            {campaign.story && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  Historia
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
                  {campaign.story}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            {/* Información de contacto */}
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Información de Contacto
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1.5}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PersonIcon color="action" fontSize="small" />
                    <Typography variant="body2">
                      <strong>Creador:</strong> {campaign.creator_username || "No especificado"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailIcon color="action" fontSize="small" />
                    <Typography variant="body2">
                      <strong>Email:</strong>{" "}
                      {campaign.contact_email ? (
                        <Link href={`mailto:${campaign.contact_email}`}>{campaign.contact_email}</Link>
                      ) : (
                        "No especificado"
                      )}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PhoneIcon color="action" fontSize="small" />
                    <Typography variant="body2">
                      <strong>Teléfono:</strong> {campaign.contact_phone || "No especificado"}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1.5}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon color="action" fontSize="small" />
                    <Typography variant="body2">
                      <strong>Ubicación:</strong> {campaign.location || "No especificada"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LanguageIcon color="action" fontSize="small" />
                    <Typography variant="body2">
                      <strong>Sitio web:</strong>{" "}
                      {campaign.website ? (
                        <Link href={campaign.website} target="_blank" rel="noopener">
                          {campaign.website}
                        </Link>
                      ) : (
                        "No especificado"
                      )}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CategoryIcon color="action" fontSize="small" />
                    <Typography variant="body2">
                      <strong>Categoría:</strong> {campaign.category_name || "Sin categoría"}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>

            {/* Fechas */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                <CalendarTodayIcon sx={{ fontSize: 18, mr: 0.5, verticalAlign: "middle" }} />
                Fechas
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Inicio:</strong> {formatDate(campaign.start_date)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Fin:</strong> {formatDate(campaign.end_date)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Creada:</strong> {formatDate(campaign.created_at)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Actualizada:</strong> {formatDate(campaign.updated_at)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Documentos */}
            {campaign.pdf_documents && campaign.pdf_documents.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  <AttachFileIcon sx={{ fontSize: 18, mr: 0.5, verticalAlign: "middle" }} />
                  Documentos Adjuntos ({campaign.pdf_documents.length})
                </Typography>
                <Stack spacing={1}>
                  {campaign.pdf_documents.map((doc, index) => {
                    // Puede ser string (URL directa) u objeto { name, description, url }
                    const isObject = typeof doc === "object" && doc !== null;
                    const docName = isObject ? doc.name : `Documento ${index + 1}`;
                    const docDescription = isObject ? doc.description : null;
                    const docUrl = isObject ? doc.url : doc;

                    return (
                      <Paper
                        key={index}
                        elevation={0}
                        sx={{
                          p: 1.5,
                          border: 1,
                          borderColor: "divider",
                          borderRadius: 1,
                          cursor: docUrl ? "pointer" : "default",
                          transition: "all 0.2s",
                          "&:hover": docUrl ? { bgcolor: "action.hover", borderColor: "primary.main" } : {},
                        }}
                        onClick={() => {
                          if (docUrl) {
                            window.open(docUrl, "_blank", "noopener,noreferrer");
                          }
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <AttachFileIcon color="primary" />
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {docName}
                            </Typography>
                            {docDescription && (
                              <Typography variant="caption" color="text.secondary">
                                {docDescription}
                              </Typography>
                            )}
                          </Box>
                          {docUrl && (
                            <Typography variant="caption" color="primary.main" sx={{ fontWeight: 500 }}>
                              Abrir ↗
                            </Typography>
                          )}
                        </Box>
                      </Paper>
                    );
                  })}
                </Stack>
              </Box>
            )}
          </Box>

          {/* Columna derecha - Checklist de revisión (fija) */}
          <Box sx={{ width: 320, flexShrink: 0, maxHeight: "65vh", overflow: "auto" }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: checklistScore >= 70 ? "success.50" : checklistScore >= 50 ? "warning.50" : "error.50",
                borderRadius: 2,
                border: 1,
                borderColor: checklistScore >= 70 ? "success.200" : checklistScore >= 50 ? "warning.200" : "error.200",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                📋 Checklist de Revisión
              </Typography>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    color: checklistScore >= 70 ? "success.main" : checklistScore >= 50 ? "warning.main" : "error.main",
                  }}
                >
                  {checklistScore}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {passedCount} de {checklist.length} criterios cumplidos
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={1}>
                {checklist.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 1,
                      borderRadius: 1,
                      bgcolor: item.passed ? "success.100" : "error.100",
                    }}
                  >
                    {item.passed ? (
                      <CheckCircleIcon sx={{ color: "success.main", fontSize: 20 }} />
                    ) : (
                      <CancelIcon sx={{ color: "error.main", fontSize: 20 }} />
                    )}
                    <Typography variant="body2" sx={{ fontWeight: item.passed ? 400 : 600 }}>
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Acciones rápidas según estado */}
            <Paper elevation={0} sx={{ p: 2, mt: 2, bgcolor: "grey.50", borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                ⚡ Acciones Rápidas
              </Typography>
              <Stack spacing={1}>
                {campaign.campaign_status === "pending" && (
                  <>
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      onClick={() => onApprove?.(campaign)}
                      disabled={checklistScore < 50}
                    >
                      ✅ Aprobar Campaña
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      onClick={() => onReject?.(campaign)}
                    >
                      ❌ Rechazar Campaña
                    </Button>
                  </>
                )}
                {campaign.campaign_status === "active" && (
                  <>
                    <Button
                      fullWidth
                      variant="contained"
                      color="warning"
                      onClick={() => onDetain?.(campaign)}
                    >
                      ⏸️ Detener Campaña
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      color="info"
                      onClick={() => onComplete?.(campaign)}
                    >
                      🏁 Marcar Completada
                    </Button>
                  </>
                )}
                {campaign.campaign_status === "detained" && (
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={() => onApprove?.(campaign)}
                  >
                    ▶️ Reactivar Campaña
                  </Button>
                )}
                {campaign.campaign_status === "rejected" && (
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => onApprove?.(campaign)}
                  >
                    🔄 Reconsiderar
                  </Button>
                )}
              </Stack>
            </Paper>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
