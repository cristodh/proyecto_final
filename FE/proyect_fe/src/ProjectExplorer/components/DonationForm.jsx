import React from "react";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ProofOfPaymentUploader from "./ProofOfPaymentUploader";

export default function DonationForm({
  donationData,
  paymentMethods,
  paymentMethodsLoading,
  donationLoading,
  donationSuccess,
  donationError,
  handleDonationChange,
  handleSubmitDonation,
  onCancel,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: "success.50",
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "success.200",
      }}
    >
      <Typography variant="body2" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
        Realizar Donación
      </Typography>

      {donationSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography variant="caption" fontWeight={600}>
            ¡Donación realizada exitosamente! Te hemos enviado un correo de confirmación.
          </Typography>
        </Alert>
      )}

      {donationError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="caption">{donationError}</Typography>
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmitDonation}
        sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
      >
        {/* Monto */}
        <TextField
          name="amount"
          label="Monto (CRC)"
          type="number"
          inputProps={{ step: "100", min: "100" }}
          value={donationData.amount}
          onChange={handleDonationChange}
          size="small"
          fullWidth
          disabled={donationLoading || donationSuccess}
          required
        />

        {/* Método de Pago */}
        <FormControl
          size="small"
          fullWidth
          disabled={donationLoading || donationSuccess || paymentMethodsLoading}
        >
          <InputLabel>Método de Pago</InputLabel>
          <Select
            name="paymentMethod"
            value={donationData.paymentMethod}
            onChange={handleDonationChange}
            label="Método de Pago"
          >
            {paymentMethods.map((method) => (
              <MenuItem key={method.value} value={method.value}>
                {method.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Email de Confirmación */}
        <TextField
          name="confirmationEmail"
          label="Email de Confirmación"
          type="email"
          value={donationData.confirmationEmail}
          onChange={handleDonationChange}
          size="small"
          fullWidth
          disabled={donationLoading || donationSuccess}
          required
        />

        {/* Comprobante de Pago */}
        <ProofOfPaymentUploader
          uploadedFile={
            donationData.proofOfPaymentUrl
              ? {
                  name: donationData.proofOfPaymentName || "Comprobante",
                  description: donationData.proofOfPaymentDescription,
                  url: donationData.proofOfPaymentUrl,
                }
              : null
          }
          onUploaded={(file) => {
            if (file) {
              const event = {
                target: {
                  name: "proofOfPaymentUrl",
                  value: file.url,
                  type: "text",
                },
              };
              handleDonationChange(event);
              // Guardar nombre y descripción
              const descEvent = {
                target: {
                  name: "proofOfPaymentDescription",
                  value: file.description,
                  type: "text",
                },
              };
              handleDonationChange(descEvent);
              const nameEvent = {
                target: {
                  name: "proofOfPaymentName",
                  value: file.name,
                  type: "text",
                },
              };
              handleDonationChange(nameEvent);
            } else {
              const event = {
                target: {
                  name: "proofOfPaymentUrl",
                  value: "",
                  type: "text",
                },
              };
              handleDonationChange(event);
              const descEvent = {
                target: {
                  name: "proofOfPaymentDescription",
                  value: "",
                  type: "text",
                },
              };
              handleDonationChange(descEvent);
              const nameEvent = {
                target: {
                  name: "proofOfPaymentName",
                  value: "",
                  type: "text",
                },
              };
              handleDonationChange(nameEvent);
            }
          }}
          disabled={donationLoading || donationSuccess}
        />

        {/* Mensaje (opcional) */}
        <TextField
          name="message"
          label="Mensaje (opcional)"
          multiline
          rows={2}
          value={donationData.message}
          onChange={handleDonationChange}
          size="small"
          fullWidth
          disabled={donationLoading || donationSuccess}
          placeholder="Deja un mensaje de apoyo..."
        />

        {/* Donación Anónima */}
        <FormControlLabel
          control={
            <Checkbox
              name="anonymous"
              checked={donationData.anonymous}
              onChange={handleDonationChange}
              disabled={donationLoading || donationSuccess}
              size="small"
            />
          }
          label={
            <Typography variant="caption">
              Realizar donación de forma anónima
            </Typography>
          }
        />

        {/* Botones de Acción */}
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={onCancel}
            disabled={donationLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            type="submit"
            disabled={donationLoading || donationSuccess}
            startIcon={
              donationLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <FavoriteIcon />
              )
            }
          >
            {donationLoading ? "Procesando..." : "Confirmar Donación"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
