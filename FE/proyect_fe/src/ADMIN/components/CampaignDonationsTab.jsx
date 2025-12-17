import React, { useState, useEffect } from "react";
import {
  Box,
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
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import DownloadIcon from "@mui/icons-material/Download";

export default function CampaignDonationsTab({
  campaign,
  user,
  formatCurrency,
  token,
  onDonationApproved,
}) {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectDialog, setRejectDialog] = useState({ open: false, donation: null });
  const [rejectReason, setRejectReason] = useState("");
  const [processing, setProcessing] = useState(null);
  const [error, setError] = useState(null);

  const [previewDialog, setPreviewDialog] = useState({
    open: false,
    url: null,
    type: null,
  });

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
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Error al cargar donaciones pendientes");

      const data = await response.json();
      setDonations(data.pending_donations || []);
    } catch (err) {
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

      if (!response.ok) throw new Error("Error al aprobar donación");

      const data = await response.json();
      setDonations((prev) => prev.filter((d) => d.id !== donationId));
      onDonationApproved?.(data.campaign_current_amount);
    } catch (err) {
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
    if (!rejectReason.trim()) return;

    try {
      setProcessing(rejectDialog.donation.id);
      await fetch(
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

      setDonations((prev) =>
        prev.filter((d) => d.id !== rejectDialog.donation.id)
      );
      setRejectDialog({ open: false, donation: null });
      setRejectReason("");
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(null);
    }
  };

  const getFileType = (url) =>
    url?.toLowerCase().endsWith(".pdf") ? "pdf" : "image";

  const openPreview = (url) => {
    setPreviewDialog({
      open: true,
      url,
      type: getFileType(url),
    });
  };

  // ✅ ABRE EN OTRA PESTAÑA
  const handleDownload = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Alert severity="error">{error}</Alert>;

  if (donations.length === 0) {
    return (
      <Typography textAlign="center" color="text.secondary">
        No hay donaciones pendientes de aprobación
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {donations.map((donation) => {
        const fileType = getFileType(donation.proof_of_payment_url);

        return (
          <Card key={donation.id}>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>
                {formatCurrency(donation.amount)}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Donante: {donation.anonymous ? "Anónimo" : donation.donor_username}
              </Typography>

              {donation.proof_of_payment_url && (
                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={
                      fileType === "pdf" ? <PictureAsPdfIcon /> : <ImageIcon />
                    }
                    onClick={() => openPreview(donation.proof_of_payment_url)}
                  >
                    Ver comprobante
                  </Button>
                </Box>
              )}

              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<CancelIcon />}
                  onClick={() => handleRejectClick(donation)}
                >
                  Rechazar
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => handleApprove(donation.id)}
                >
                  Aprobar
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
      })}

      <Dialog
        open={previewDialog.open}
        onClose={() => setPreviewDialog({ open: false, url: null, type: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Comprobante de Pago</DialogTitle>

        <DialogContent dividers>
          {previewDialog.type === "pdf" ? (
            <Box
              component="iframe"
              src={previewDialog.url}
              sx={{ width: "100%", height: "70vh", border: "none" }}
            />
          ) : (
            <Box
              component="img"
              src={previewDialog.url}
              sx={{ width: "100%", maxHeight: "70vh", objectFit: "contain" }}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button
            startIcon={<DownloadIcon />}
            onClick={() => handleDownload(previewDialog.url)}
          >
            Descargar
          </Button>
          <Button onClick={() => setPreviewDialog({ open: false, url: null, type: null })}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
