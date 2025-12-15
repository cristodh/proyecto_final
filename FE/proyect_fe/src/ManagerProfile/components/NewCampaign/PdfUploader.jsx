import React, { useState } from "react";
import { Button, Box, Typography, Alert, TextField, CircularProgress } from "@mui/material";

export default function PdfUploader({ onUploaded, uploadedFiles = [], onUpdateUploaded }) {
  const [files, setFiles] = useState([]); 
  const [uploading, setUploading] = useState(false);
  const [debug, setDebug] = useState("");

  const cloudName = "dfcwqzjks";
  const uploadPreset = "pdfsss";

  const log = (msg, data = null) => {
    setDebug(prev => prev + `\n${msg} ${data ? JSON.stringify(data, null, 2) : ""}`);
  };

  // --------------------------
  // Cuando se seleccionan archivos
  // --------------------------
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);

    const mapped = selected.map(file => ({
      file,
      description: ""
    }));

    setFiles(prev => [...prev, ...mapped]);
  };

  // --------------------------
  // Actualizar descripción
  // --------------------------
  const handleDescriptionChange = (index, value) => {
    const updated = [...files];
    updated[index].description = value;
    setFiles(updated);
  };

  // --------------------------
  // Eliminar archivo de la lista
  // --------------------------
  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  // --------------------------
  // Subir a Cloudinary
  // --------------------------
  const uploadPdf = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
      { method: "POST", body: formData }
    );

    return await res.json();
  };

  // --------------------------
  // Subir TODOS los archivos
  // --------------------------
  const handleUpload = async () => {
    setDebug("");

    // Validar que todas las descripciones estén llenas
    for (const f of files) {
      if (!f.description.trim()) {
        log("❌ Todos los archivos requieren una descripción.");
        return;
      }
    }

    setUploading(true);

    const uploadedList = [];

    for (const item of files) {
      try {
        log(`Subiendo ${item.file.name}...`);
        const data = await uploadPdf(item.file);

        uploadedList.push({
          name: item.file.name,
          description: item.description,
          url: data.secure_url,
        });
      } catch (err) {
        log(`Error subiendo ${item.file.name}: ${err.message}`);
      }
    }

    setUploading(false);

    if (uploadedList.length > 0) {
      onUploaded(uploadedList); // Mandamos la lista al padre
      // Limpiar cola local (lo subido ya quedó persistido en el padre)
      setFiles([]);
    }
  };

  // --------------------------
  // Editar descripción de un PDF ya subido
  // --------------------------
  const handleUploadedDescriptionChange = (index, value) => {
    if (!onUpdateUploaded) return;
    const next = [...uploadedFiles];
    if (!next[index]) return;
    next[index] = { ...next[index], description: value };
    onUpdateUploaded(next);
  };

  const handleRemoveUploaded = (index) => {
    if (!onUpdateUploaded) return;
    const next = uploadedFiles.filter((_, i) => i !== index);
    onUpdateUploaded(next);
  };

  return (
    <Box mt={3} p={2} border="1px solid #ccc" borderRadius={2}>
      <Typography fontWeight={600} mb={1}>
        Documentos PDF del Proyecto
      </Typography>

      {/* LISTA DE PDFs YA SUBIDOS (persistente entre steps) */}
      {uploadedFiles && uploadedFiles.length > 0 && (
        <Box mt={2}>
          <Typography fontWeight={600} mb={1}>
            Archivos subidos
          </Typography>
          {uploadedFiles.map((item, index) => (
            <Box
              key={`${item.url || item.name}-${index}`}
              display="flex"
              alignItems="center"
              gap={2}
              mb={2}
              p={1}
              border="1px solid #ddd"
              borderRadius={1}
            >
              <Typography sx={{ width: "200px" }}>
                {item.name}
              </Typography>

              <TextField
                label="Descripción"
                value={item.description || ""}
                onChange={(e) => handleUploadedDescriptionChange(index, e.target.value)}
                fullWidth
              />

              <Button
                color="error"
                variant="outlined"
                onClick={() => handleRemoveUploaded(index)}
                disabled={!onUpdateUploaded}
              >
                Eliminar
              </Button>
            </Box>
          ))}
        </Box>
      )}

      <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />

      {/* LISTA DE ARCHIVOS */}
      {files.length > 0 && (
        <Box mt={3}>
          {files.map((item, index) => (
            <Box 
              key={index}
              display="flex"
              alignItems="center"
              gap={2}
              mb={2}
              p={1}
              border="1px solid #ddd"
              borderRadius={1}
            >
              <Typography sx={{ width: "200px" }}>
                {item.file.name}
              </Typography>

              <TextField
                label="Descripción (obligatoria)"
                value={item.description}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                fullWidth
                required
              />

              <Button 
                color="error" 
                variant="outlined"
                onClick={() => handleRemoveFile(index)}
              >
                Eliminar
              </Button>
            </Box>
          ))}
        </Box>
      )}

      {/* BOTÓN SUBIR */}
      <Button 
        variant="contained" 
        sx={{ mt: 2 }} 
        disabled={uploading || files.length === 0}
        onClick={handleUpload}
      >
        {uploading ? <CircularProgress size={24}/> : "Subir Archivos"}
      </Button>

      {debug && (
        <Alert severity="info" sx={{ whiteSpace: "pre-wrap", mt: 2 }}>
          {debug}
        </Alert>
      )}
    </Box>
  );
}
