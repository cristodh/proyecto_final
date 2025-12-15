import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  Divider,
  Alert,
  IconButton,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningIcon from "@mui/icons-material/Warning";
import { CAMPAIGN_STATUS, STATUS_CONFIG } from "./useCampaigns";

const ACTION_CONFIG = {
  approve: {
    title: "Aprobar Campaña",
    description: "La campaña será activada y visible para los donantes.",
    icon: "✅",
    color: "success",
    newStatus: CAMPAIGN_STATUS.ACTIVE,
    buttonText: "Aprobar",
  },
  reject: {
    title: "Rechazar Campaña",
    description: "La campaña será rechazada y el gestor será notificado.",
    icon: "❌",
    color: "error",
    newStatus: CAMPAIGN_STATUS.REJECTED,
    buttonText: "Rechazar",
    requireComment: true,
  },
  detain: {
    title: "Detener Campaña",
    description: "La campaña será pausada temporalmente.",
    icon: "⏸️",
    color: "warning",
    newStatus: CAMPAIGN_STATUS.DETAINED,
    buttonText: "Detener",
    requireComment: true,
  },
  complete: {
    title: "Completar Campaña",
    description: "La campaña será marcada como completada exitosamente.",
    icon: "🏁",
    color: "info",
    newStatus: CAMPAIGN_STATUS.COMPLETED,
    buttonText: "Completar",
  },
  pending: {
    title: "Poner en Pendiente",
    description: "La campaña volverá a estado pendiente de revisión.",
    icon: "🔄",
    color: "default",
    newStatus: CAMPAIGN_STATUS.PENDING,
    buttonText: "Poner Pendiente",
  },
};

const REJECTION_REASONS = [
  "Información incompleta o insuficiente",
  "Documentación no válida o faltante",
  "Meta financiera no realista",
  "No cumple con las políticas de la plataforma",
  "Contenido inapropiado o engañoso",
  "Duplicado de otra campaña existente",
  "Falta de información de contacto",
  "Categoría incorrecta",
];

export default function CampaignReviewModal({
  open,
  onClose,
  campaign,
  action,
  evaluateChecklist,
  onConfirm,
}) {
  const [comment, setComment] = useState("");
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [checklistOverrides, setChecklistOverrides] = useState({});
  const [confirmChecked, setConfirmChecked] = useState(false);

  const config = ACTION_CONFIG[action] || ACTION_CONFIG.pending;
  const checklist = campaign ? evaluateChecklist(campaign) : [];

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setComment("");
      setSelectedReasons([]);
      setChecklistOverrides({});
      setConfirmChecked(false);
    }
  }, [open]);

  const handleReasonToggle = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]
    );
  };

  const handleChecklistOverride = (itemId) => {
    setChecklistOverrides((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleConfirm = () => {
    const fullComment =
      action === "reject" && selectedReasons.length > 0
        ? `Motivos: ${selectedReasons.join(", ")}. ${comment}`.trim()
        : comment;

    onConfirm?.({
      campaignId: campaign.id,
      newStatus: config.newStatus,
      comment: fullComment,
      checklist: checklist.map((item) => ({
        ...item,
        passed: checklistOverrides[item.id] !== undefined ? checklistOverrides[item.id] : item.passed,
      })),
    });
    onClose();
  };

  const isSubmitDisabled = () => {
    if (!confirmChecked) return true;
    if (config.requireComment && !comment.trim() && selectedReasons.length === 0) return true;
    return false;
  };

  if (!campaign || !action) return null;

  const passedCount = checklist.filter(
    (item) => checklistOverrides[item.id] !== undefined ? checklistOverrides[item.id] : item.passed
  ).length;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h5">{config.icon}</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {config.title}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        {/* Info de la campaña */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {campaign.name}
          </Typography>
          <Typography variant="body2">
            Creador: {campaign.creator_username} | Estado actual:{" "}
            <Chip
              label={STATUS_CONFIG[campaign.campaign_status]?.label || campaign.campaign_status}
              size="small"
              sx={{
                bgcolor: STATUS_CONFIG[campaign.campaign_status]?.bgColor,
                color: STATUS_CONFIG[campaign.campaign_status]?.textColor,
              }}
            />
          </Typography>
        </Alert>

        <Alert severity={config.color} icon={false} sx={{ mb: 3 }}>
          {config.description}
        </Alert>

        {/* Checklist de revisión editable */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
            📋 Revisión de Criterios ({passedCount}/{checklist.length} cumplidos)
          </Typography>
          <Stack spacing={1}>
            {checklist.map((item) => {
              const isOverridden = checklistOverrides[item.id] !== undefined;
              const isPassed = isOverridden ? checklistOverrides[item.id] : item.passed;
              
              return (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: isPassed ? "success.50" : "error.50",
                    border: 1,
                    borderColor: isOverridden ? "primary.main" : "transparent",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": { opacity: 0.8 },
                  }}
                  onClick={() => handleChecklistOverride(item.id)}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {isPassed ? (
                      <CheckCircleIcon sx={{ color: "success.main" }} />
                    ) : (
                      <CancelIcon sx={{ color: "error.main" }} />
                    )}
                    <Typography variant="body2">{item.label}</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {isOverridden ? "(modificado)" : "click para cambiar"}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Motivos de rechazo (solo para reject) */}
        {action === "reject" && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              ⚠️ Motivos del Rechazo
            </Typography>
            <Stack spacing={1}>
              {REJECTION_REASONS.map((reason) => (
                <FormControlLabel
                  key={reason}
                  control={
                    <Checkbox
                      checked={selectedReasons.includes(reason)}
                      onChange={() => handleReasonToggle(reason)}
                      color="error"
                    />
                  }
                  label={reason}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: selectedReasons.includes(reason) ? "error.50" : "transparent",
                    m: 0,
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Comentario */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            💬 Comentario {config.requireComment ? "(requerido)" : "(opcional)"}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder={
              action === "reject"
                ? "Explica los motivos del rechazo o qué debe corregir el gestor..."
                : action === "detain"
                ? "Explica por qué se detiene la campaña..."
                : "Agrega un comentario o nota sobre esta acción..."
            }
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>

        {/* Confirmación */}
        <Alert
          severity="warning"
          icon={<WarningIcon />}
          sx={{ mb: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={confirmChecked}
                onChange={(e) => setConfirmChecked(e.target.checked)}
                color="warning"
              />
            }
            label={
              <Typography variant="body2">
                Confirmo que he revisado la información y deseo <strong>{config.buttonText.toLowerCase()}</strong> esta campaña.
              </Typography>
            }
          />
        </Alert>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={config.color}
          disabled={isSubmitDisabled()}
        >
          {config.icon} {config.buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
