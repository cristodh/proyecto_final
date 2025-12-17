import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Grid,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function CampaignDonationsTab({ campaign, user, formatCurrency, token, onDonationApproved }) {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectDialog, setRejectDialog] = useState({ open: false, donation: null });
  const [rejectReason, setRejectReason] = useState("");
  const [processing, setProcessing] = useState(null);
  const [error, setError] = useState(null);

  // Cargar donaciones pendientes
  useEffect(() => {
    if (campaign?.id && user?.id) {
      fetchPendingDonations();
    }
  }, [campaign?.id, user?.id]);

  const fetchPendingDonations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://127.0.0.1:8000/campaign/donations/campaign/${campaign.id}/pending/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al cargar donaciones pendientes");
      }

      const data = await response.json();
      setDonations(data.pending_donations || []);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (donationId) => {
    try {
      setProcessing(donationId);
      const response = await fetch(
        `http://127.0.0.1:8000/campaign/donations/${donationId}/approve/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al aprobar donación");
      }

      const data = await response.json();
      // Remover de la lista
      setDonations(donations.filter((d) => d.id !== donationId));
      onDonationApproved && onDonationApproved(data.campaign_current_amount);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setProcessing(null);
    }
  };

  const handleRejectClick = (donation) => {
    setRejectDialog({ open: true, donation });
    setRejectReason("");
  };

  const handleRejectSubmit = async () => {
    if (!rejectReason.trim()) {
      setError("Debes proporcionar un motivo de rechazo");
      return;
    }

    try {
      setProcessing(rejectDialog.donation.id);
      const response = await fetch(
        `http://127.0.0.1:8000/campaign/donations/${rejectDialog.donation.id}/reject/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rejection_reason: rejectReason }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al rechazar donación");
      }

      // Remover de la lista
      setDonations(donations.filter((d) => d.id !== rejectDialog.donation.id));
      setRejectDialog({ open: false, donation: null });
      setRejectReason("");
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (donations.length === 0) {
    return (
      <Box sx={{ py: 3, textAlign: "center" }}>
        <Typography color="text.secondary">
          No hay donaciones pendientes de aprobación
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Alert severity="info">
        <Typography variant="caption">
          Se muestran <strong>{donations.length}</strong> donación(es) pendiente(s) de aprobación
        </Typography>
      </Alert>

      {donations.map((donation) => (
        <Card key={donation.id} sx={{ overflow: "visible" }}>
          <CardContent>
            <Grid container spacing={2}>
              {/* Comprobante de Pago */}
              {donation.proof_of_payment_url && (
                <Grid item xs={12} sm={4}>
                  <Box
                    component="img"
                    src={donation.proof_of_payment_url}
                    alt="Comprobante de pago"
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                </Grid>
              )}

              {/* Información de la Donación */}
              <Grid item xs={12} sm={donation.proof_of_payment_url ? 8 : 12}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {/* Monto */}
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Monto
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      {formatCurrency(donation.amount)}
                    </Typography>
                  </Box>

                  {/* Donante */}
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Donante
                    </Typography>
                    <Typography variant="body2">
                      {donation.anonymous ? "Anónimo" : donation.donor_username}
                    </Typography>
                  </Box>

                  {/* Email */}
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Email de Confirmación
                    </Typography>
                    <Typography variant="body2">{donation.confirmation_email}</Typography>
                  </Box>

                  {/* Método de Pago */}
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Método de Pago
                    </Typography>
                    <Chip
                      label={donation.payment_method.replace("_", " ").toUpperCase()}
                      size="small"
                      variant="outlined"
                    />
                  </Box>

                  {/* Descripción del Comprobante */}
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                      Descripción del Comprobante
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 1 }}>
                      <Typography variant="caption" sx={{ whiteSpace: "pre-wrap" }}>
                        {donation.proof_of_payment_description}
                      </Typography>
                    </Paper>
                  </Box>

                  {/* Mensaje */}
                  {donation.message && (
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                        Mensaje
                      </Typography>
                      <Paper variant="outlined" sx={{ p: 1, bgcolor: "grey.50" }}>
                        <Typography variant="caption" sx={{ whiteSpace: "pre-wrap" }}>
                          {donation.message}
                        </Typography>
                      </Paper>
                    </Box>
                  )}

                  {/* Número de Confirmación */}
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Número de Confirmación
                    </Typography>
                    <Typography variant="caption" fontFamily="monospace">
                      {donation.confirmation_number}
                    </Typography>
                  </Box>

                  {/* Botones de Acción */}
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<CancelIcon />}
                      onClick={() => handleRejectClick(donation)}
                      disabled={processing === donation.id}
                    >
                      Rechazar
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<CheckCircleIcon />}
                      onClick={() => handleApprove(donation.id)}
                      disabled={processing === donation.id}
                    >
                      {processing === donation.id ? "Aprobando..." : "Aprobar"}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      {/* Dialog de Rechazo */}
      <Dialog
        open={rejectDialog.open}
        onClose={() => setRejectDialog({ open: false, donation: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Rechazar Donación</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Motivo del Rechazo"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Explica por qué rechazas esta donación..."
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setRejectDialog({ open: false, donation: null })}
            disabled={processing}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleRejectSubmit}
            variant="contained"
            color="error"
            disabled={processing || !rejectReason.trim()}
          >
            {processing ? "Procesando..." : "Rechazar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
