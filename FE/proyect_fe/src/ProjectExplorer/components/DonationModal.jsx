import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DonationForm from "./DonationForm";

export default function DonationModal({
  open,
  onClose,
  campaign,
  paymentMethods,
  paymentMethodsLoading,
  donationData,
  setDonationData,
  donationLoading,
  donationSuccess,
  donationError,
  setDonationError,
  handleDonationChange,
  handleSubmitDonation,
}) {
  const [activeStep, setActiveStep] = useState(0); // 0: cuentas, 1: formulario
  const [bankAccounts, setBankAccounts] = useState([]);
  const [bankLoading, setBankLoading] = useState(false);
  const [bankError, setBankError] = useState(null);

  useEffect(() => {
    if (!open) return;
    // Cargar cuentas bancarias (público)
    const fetchBankAccounts = async () => {
      try {
        setBankLoading(true);
        setBankError(null);
        const res = await fetch("http://127.0.0.1:8000/campaign/payments/bank-accounts/");
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setBankAccounts(data.bank_accounts || []);
      } catch (err) {
        setBankError("No se pudieron cargar las cuentas bancarias");
      } finally {
        setBankLoading(false);
      }
    };
    fetchBankAccounts();
  }, [open]);

  const handleCancel = () => {
    setDonationError(null);
    onClose();
  };

  const steps = ["Cuentas para Transferencia", "Confirmar Donación"];

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle sx={{ pr: 6, py: 1.5 }}>
        Realizar Donación
        <IconButton
          onClick={handleCancel}
          size="small"
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Paper elevation={0} sx={{ p: 2, borderRadius: 1.5, bgcolor: "grey.50" }}>
            <Typography variant="body2" fontWeight={700} gutterBottom>
              Cuentas Bancarias (CRC)
            </Typography>
            {bankLoading && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <CircularProgress size={20} />
              </Box>
            )}
            {bankError && (
              <Alert severity="error" sx={{ mb: 2 }}>{bankError}</Alert>
            )}
            {!bankLoading && !bankError && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {bankAccounts.map((acc, idx) => (
                  <Box key={idx} sx={{ p: 1, border: 1, borderColor: "divider", borderRadius: 1 }}>
                    <Typography variant="caption" fontWeight={700} display="block">
                      {acc.bank}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {acc.account_type}
                    </Typography>
                    <Typography variant="caption" fontWeight={600} display="block">
                      {acc.account_number}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Titular: {acc.account_holder} · Moneda: {acc.currency}
                    </Typography>
                    {acc.sinpe_phone && (
                      <Typography variant="caption" color="text.secondary" display="block">
                        SINPE Móvil: {acc.sinpe_phone}
                      </Typography>
                    )}
                  </Box>
                ))}
                <Alert severity="info" sx={{ mt: 1 }}>
                  Realice su transferencia a una de estas cuentas.
                  Luego, continúe al paso 2 para subir el comprobante.
                </Alert>
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button variant="contained" color="success" onClick={() => setActiveStep(1)}>
                Continuar
              </Button>
            </Box>
          </Paper>
        )}

        {activeStep === 1 && (
          <DonationForm
            donationData={donationData}
            paymentMethods={paymentMethods}
            paymentMethodsLoading={paymentMethodsLoading}
            donationLoading={donationLoading}
            donationSuccess={donationSuccess}
            donationError={donationError}
            handleDonationChange={handleDonationChange}
            handleSubmitDonation={handleSubmitDonation}
            onCancel={handleCancel}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
