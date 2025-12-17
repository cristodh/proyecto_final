import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";

export default function ProofOfPaymentUploader({
  uploadedFile,
  onUploaded,
  disabled = false,
}) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const cloudName = "dwrpsjwdh";
  const uploadPreset = "images";

  // Seleccionar archivo
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setDescription("");
    setError("");
  };

  // Subir archivo a Cloudinary
  const uploadFile = async (fileToUpload) => {
    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!res.ok) {
      throw new Error("Error al subir el archivo a Cloudinary");
    }

    return await res.json();
  };

  // Subir
  const handleUpload = async () => {
    setError("");

    if (!file) {
      setError("Selecciona un archivo");
      return;
    }

    if (!description.trim()) {
      setError("Ingresa una descripción del comprobante");
      return;
    }

    setUploading(true);

    try {
      const data = await uploadFile(file);

      const uploaded = {
        name: file.name,
        description,
        url: data.secure_url,
      };

      onUploaded(uploaded);

      setFile(null);
      setDescription("");
    } catch (err) {
      setError(err.message || "Error al subir el archivo");
    }

    setUploading(false);
  };

  // Remover archivo cargado
  const handleRemove = () => {
    if (onUploaded) {
      onUploaded(null);
    }
  };

  return (
    <Box>
      {/* Si ya hay archivo subido */}
      {uploadedFile && (
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            mb: 2,
            bgcolor: "success.50",
            borderColor: "success.200",
            borderRadius: 1.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" fontWeight={700} color="success.700">
                ✓ Comprobante cargado
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                <strong>Archivo:</strong> {uploadedFile.name}
              </Typography>
              <Typography variant="caption" display="block">
                <strong>Descripción:</strong> {uploadedFile.description}
              </Typography>
              <Typography
                variant="caption"
                display="block"
                sx={{
                  mt: 0.5,
                  wordBreak: "break-all",
                  color: "text.secondary",
                  fontSize: "0.7rem",
                }}
              >
                <strong>URL:</strong> {uploadedFile.url}
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={handleRemove}
              disabled={uploading}
              sx={{ ml: 1 }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      )}

      {/* Formulario de carga */}
      {!uploadedFile && (
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 1.5,
            bgcolor: "grey.50",
          }}
        >
          <Typography variant="caption" fontWeight={700} display="block" mb={1.5}>
            Subir Comprobante de Pago
          </Typography>

          {/* Selector de archivo */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mb: 1.5,
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              component="label"
              size="small"
              startIcon={<CloudUploadIcon />}
              disabled={uploading || disabled}
            >
              Seleccionar archivo
              <input
                type="file"
                hidden
                accept="image/*,.pdf"
                onChange={handleFileChange}
              />
            </Button>
            <Typography variant="caption" color="text.secondary">
              {file ? file.name : "PNG, JPG, PDF (Max 10MB)"}
            </Typography>
          </Box>

          {/* Descripción */}
          <TextField
            label="Descripción del comprobante"
            placeholder="Ej: Transferencia del 16/12/2025, Ref: TRX12345"
            size="small"
            fullWidth
            multiline
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={uploading || disabled || !file}
            helperText="Incluye detalles como número de referencia, fecha o número de transacción"
            sx={{ mb: 1.5 }}
          />

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{ mb: 1.5, py: 0.75 }}>
              <Typography variant="caption">{error}</Typography>
            </Alert>
          )}

          {/* Botón de subir */}
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={handleUpload}
            disabled={uploading || disabled || !file || !description.trim()}
            startIcon={
              uploading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <CloudUploadIcon />
              )
            }
          >
            {uploading ? "Subiendo..." : "Subir comprobante"}
          </Button>
        </Paper>
      )}
    </Box>
  );
}
