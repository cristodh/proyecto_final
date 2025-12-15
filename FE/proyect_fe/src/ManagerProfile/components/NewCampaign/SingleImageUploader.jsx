import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert
} from "@mui/material";

export default function SingleImageUploader({
  uploadedImage,
  onUploaded,
  onUpdateUploaded
}) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [debug, setDebug] = useState("");

  const cloudName = "dwrpsjwdh";
  const uploadPreset = "images";

  const log = (msg) => setDebug(prev => prev + `\n${msg}`);

  // --------------------------
  // Seleccionar imagen
  // --------------------------
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setDescription("");
  };

  // --------------------------
  // Subir imagen a Cloudinary
  // --------------------------
  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );

    return await res.json();
  };

  // --------------------------
  // Subir
  // --------------------------
  const handleUpload = async () => {
    setDebug("");

    if (!file) {
      log("❌ Selecciona una imagen.");
      return;
    }

    if (!description.trim()) {
      log("❌ La descripción es obligatoria.");
      return;
    }

    setUploading(true);

    try {
      log(`Subiendo ${file.name}...`);
      const data = await uploadImage(file);

      const uploaded = {
        name: file.name,
        description,
        url: data.secure_url
      };

      onUploaded(uploaded);

      setFile(null);
      setDescription("");
    } catch {
      log("❌ Error al subir la imagen.");
    }

    setUploading(false);
  };

  // --------------------------
  // Editar descripción
  // --------------------------
  const handleUpdateDescription = (value) => {
    if (!uploadedImage || !onUpdateUploaded) return;
    onUpdateUploaded({ ...uploadedImage, description: value });
  };

  const handleRemove = () => {
    if (!onUpdateUploaded) return;
    onUpdateUploaded(null);
  };

  return (
    <Box mt={3} p={2} border="1px solid #ccc" borderRadius={2}>
      <Typography fontWeight={600} mb={1}>
        Imagen principal del proyecto
      </Typography>

      {/* IMAGEN YA SUBIDA */}
      {uploadedImage && (
        <Box
          border="1px solid #ddd"
          borderRadius={1}
          p={2}
          mb={2}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography fontWeight={600}>
            {uploadedImage.name}
          </Typography>

          <img
            src={uploadedImage.url}
            alt="preview"
            style={{ maxWidth: "100%", borderRadius: 8 }}
          />

          <TextField
            label="Descripción"
            value={uploadedImage.description || ""}
            onChange={(e) => handleUpdateDescription(e.target.value)}
            required
            fullWidth
          />

          <Button
            color="error"
            variant="outlined"
            onClick={handleRemove}
          >
            Eliminar imagen
          </Button>
        </Box>
      )}

      {/* INPUT NUEVO */}
      {!uploadedImage && (
        <>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
          />

          {file && (
            <Box mt={2}>
              <Typography>{file.name}</Typography>

              <TextField
                label="Descripción (obligatoria)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                required
                sx={{ mt: 1 }}
              />
            </Box>
          )}

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            disabled={uploading || !file}
            onClick={handleUpload}
          >
            {uploading ? <CircularProgress size={24} /> : "Subir imagen"}
          </Button>
        </>
      )}

      {debug && (
        <Alert severity="info" sx={{ whiteSpace: "pre-wrap", mt: 2 }}>
          {debug}
        </Alert>
      )}
    </Box>
  );
}
