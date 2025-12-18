import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TermsAndConditionsContent from "./TermsAndConditionsContent";

/**
 * TermsAndConditionsModal
 * Modal component to display Terms and Conditions PDF
 * 
 * @param {boolean} open - Whether the modal is open
 * @param {Function} onClose - Callback when modal closes
 * @param {string} pdfUrl - URL of the PDF file (optional, can be set later)
 */
export default function TermsAndConditionsModal({ open, onClose, pdfUrl = null }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAccept = () => {
    onClose(true); // true indica aceptación
  };

  const handleReject = () => {
    onClose(false); // false indica rechazo
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleReject()}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Terms and Conditions of Use
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => handleReject()}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ minHeight: "500px", maxHeight: "600px", overflowY: "auto" }}>
        <TermsAndConditionsContent />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={() => handleReject()}
          variant="outlined"
          color="error"
          sx={{ textTransform: "none" }}
        >
          No Acepto
        </Button>
        <Button
          onClick={() => handleAccept()}
          variant="contained"
          color="success"
          sx={{ textTransform: "none" }}
        >
          Acepto Términos y Condiciones
        </Button>
      </DialogActions>
    </Dialog>
  );
}
