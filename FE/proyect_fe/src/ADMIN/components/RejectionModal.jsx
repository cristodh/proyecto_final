import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { authenticatedPostData, postData, putData } from "../../services/fetch";

// ============================================================
// COMPONENTE MODAL DE RECHAZO
// ============================================================
/**
 * RejectionModal
 * Modal para ingresar el motivo del rechazo de un usuario
 * Guarda el comentario en la base de datos
 * 
 * @param {boolean} open - Estado de apertura del modal
 * @param {Object} selectedUser - Datos del usuario a rechazar
 * @param {Function} onClose - Callback para cerrar el modal
 * @param {Function} onConfirm - Callback para confirmar el rechazo con razón
 */
export default function RejectionModal({ open, selectedUser, onClose, onConfirm }) {
  // ============================================================
  // ESTADOS
  // ============================================================
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================================
  // FUNCIONES DE MANEJO
  // ============================================================
  /**
   * Guarda el motivo de rechazo en la base de datos
   * y ejecuta el callback de confirmación
   */
  const handleConfirmRejection = async () => {
    if (!rejectionReason.trim()) {
      alert("Por favor ingresa un motivo para el rechazo");
      return;
    }

    setIsSubmitting(true);
    try {
      // Crear o actualizar registro de motivo de rechazo
      const response = await authenticatedPostData(`user/rejection_reason/`, {
        user: selectedUser.id,
        rejection_reason: rejectionReason,
      });

      if (response && (response.ok || response.message === "Rejection reason updated successfully" || response.message === "Rejection reason created successfully")) {
        onConfirm(rejectionReason);
        setRejectionReason("");
        handleClose();
      }
    } catch (error) {
      console.error("Error saving rejection reason:", error);
      alert("Error al guardar el motivo del rechazo");
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Cierra el modal sin guardar
   */
  const handleClose = () => {
    setRejectionReason("");
    onClose();
  };

  if (!selectedUser) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: 18 }}>
        Motivo del Rechazo
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Motivo del rechazo"
            placeholder="Ingresa el motivo por el cual rechazas este usuario..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={handleClose} variant="outlined" disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmRejection}
          variant="contained"
          color="error"
          disabled={isSubmitting || !rejectionReason.trim()}
        >
          {isSubmitting ? "Guardando..." : "Rechazar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
