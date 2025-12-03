import React, { useState } from "react";
import { Box, Typography, TextField, Button, Card, CardContent, Alert } from "@mui/material";

export default function AddCampaignStep3({ data, update, next, back }) {
  const [local, setLocal] = useState({
    coverImage: data.coverImage || null,
    gallery: data.gallery || [],
    videoUrl: data.videoUrl || "",
  });

  const [errors, setErrors] = useState({});

  const handleFileChange = (field, file) => {
    setLocal((prev) => ({ ...prev, [field]: file }));
    // Limpiar error cuando se selecciona archivo
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const validateImageFile = (file) => {
    if (!file) return null;
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      return "Solo se permiten archivos de imagen (JPEG, PNG, WebP)";
    }
    
    if (file.size > maxSize) {
      return "El archivo no debe superar los 5MB";
    }
    
    return null;
  };

  const validateVideoUrl = (url) => {
    if (!url.trim()) return null;
    
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    
    if (!youtubeRegex.test(url)) {
      return "Por favor, ingresa una URL válida de YouTube";
    }
    
    return null;
  };

  const validateFields = () => {
    const newErrors = {};
    
    // Validar imagen principal (recomendada pero no obligatoria)
    if (!local.coverImage) {
      newErrors.coverImage = "Se recomienda agregar una imagen principal para tu proyecto";
    } else {
      const imageError = validateImageFile(local.coverImage);
      if (imageError) {
        newErrors.coverImage = imageError;
      }
    }

    // Validar galería si hay archivos
    if (local.gallery && local.gallery.length > 0) {
      for (let i = 0; i < local.gallery.length; i++) {
        const imageError = validateImageFile(local.gallery[i]);
        if (imageError) {
          newErrors.gallery = `Imagen ${i + 1}: ${imageError}`;
          break;
        }
      }
      
      if (local.gallery.length > 5) {
        newErrors.gallery = "Máximo 5 imágenes en la galería";
      }
    }

    // Validar URL de video (opcional)
    if (local.videoUrl) {
      const videoError = validateVideoUrl(local.videoUrl);
      if (videoError) {
        newErrors.videoUrl = videoError;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).filter(key => !key.includes('coverImage')).length === 0; // Permitir continuar sin imagen principal
  };

  const handleNext = () => {
    if (validateFields()) {
      update(local);
      next();
    }
  };

  return (
    <Card variant="outlined" sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Multimedia
        </Typography>

        <Box display="flex" flexDirection="column" gap={3} mt={2}>
          <Box>
            <Typography fontWeight={600} sx={{ mb: 1 }}>
              Imagen principal *
            </Typography>
            <TextField
              type="file"
              fullWidth
              onChange={(e) => handleFileChange("coverImage", e.target.files[0])}
              inputProps={{
                accept: "image/jpeg,image/jpg,image/png,image/webp"
              }}
              error={!!errors.coverImage}
              helperText={errors.coverImage || "Recomendado: Imagen que represente tu proyecto (máx. 5MB)"}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#3B82F6',
                  },
                },
              }}
            />
            {local.coverImage && (
              <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
                ✓ Imagen seleccionada: {local.coverImage.name}
              </Typography>
            )}
          </Box>

          <Box>
            <Typography fontWeight={600} sx={{ mb: 1 }}>
              Galería adicional (opcional)
            </Typography>
            <TextField
              type="file"
              fullWidth
              inputProps={{ 
                multiple: true,
                accept: "image/jpeg,image/jpg,image/png,image/webp"
              }}
              onChange={(e) =>
                handleFileChange("gallery", Array.from(e.target.files))
              }
              error={!!errors.gallery}
              helperText={errors.gallery || "Opcional: Hasta 5 imágenes adicionales (máx. 5MB cada una)"}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#3B82F6',
                  },
                },
              }}
            />
            {local.gallery && local.gallery.length > 0 && (
              <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
                ✓ {local.gallery.length} imagen{local.gallery.length > 1 ? 'es' : ''} seleccionada{local.gallery.length > 1 ? 's' : ''}
              </Typography>
            )}
          </Box>

          <Box>
            <Typography fontWeight={600} sx={{ mb: 1 }}>
              Video del proyecto (opcional)
            </Typography>
            <TextField
              fullWidth
              placeholder="https://www.youtube.com/watch?v=..."
              value={local.videoUrl}
              onChange={(e) => {
                setLocal((prev) => ({ ...prev, videoUrl: e.target.value }));
                // Limpiar error cuando se escribe
                if (errors.videoUrl) {
                  setErrors((prev) => ({ ...prev, videoUrl: false }));
                }
              }}
              error={!!errors.videoUrl}
              helperText={errors.videoUrl || "Opcional: Enlace de YouTube para mostrar tu proyecto en video"}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#3B82F6',
                  },
                },
              }}
            />
            {local.videoUrl && !errors.videoUrl && (
              <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
                ✓ URL de video agregada
              </Typography>
            )}
          </Box>

          {errors.coverImage && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {errors.coverImage}
            </Alert>
          )}

          <Box display="flex" justifyContent="space-between">
            <Button 
              variant="outlined" 
              onClick={back}
              sx={{
                borderColor: "#3B82F6",
                color: "#3B82F6",
                '&:hover': {
                  borderColor: "#1E3A8A",
                  bgcolor: "rgba(255, 140, 0, 0.08)"
                }
              }}
            >
              Volver
            </Button>

            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ 
                textTransform: "none", 
                fontWeight: 700,
                bgcolor: "#3B82F6",
                color: "white",
                '&:hover': {
                  bgcolor: "#1E3A8A",
                }
              }}
            >
              Siguiente
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
