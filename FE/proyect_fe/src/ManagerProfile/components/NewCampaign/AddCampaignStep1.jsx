import React, { useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, Card, CardContent } from "@mui/material";

export default function AddCampaignStep1({ data, update, next }) {
  const [local, setLocal] = useState({
    title: data.title || "",
    shortDescription: data.shortDescription || "",
    category: data.category || "",
    location: data.location || "",
    website: data.website || "",
    slogan: data.slogan || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setLocal((prev) => ({ ...prev, [field]: value }));
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const validateFields = () => {
    const newErrors = {};
    
    if (!local.title.trim()) {
      newErrors.title = "El título es obligatorio";
    } else if (local.title.length < 5) {
      newErrors.title = "El título debe tener al menos 5 caracteres";
    }
    
    if (!local.shortDescription.trim()) {
      newErrors.shortDescription = "La descripción es obligatoria";
    } else if (local.shortDescription.length < 20) {
      newErrors.shortDescription = "La descripción debe tener al menos 20 caracteres";
    }
    
    if (!local.category) {
      newErrors.category = "Debe seleccionar una categoría";
    }
    
    if (!local.location.trim()) {
      newErrors.location = "La ubicación es obligatoria";
    }

    if (!local.slogan.trim()) {
      newErrors.slogan = "El lema es obligatorio";
    } else if (local.slogan.length < 5) {
      newErrors.slogan = "El lema debe tener al menos 5 caracteres";
    }

    // Validación opcional del sitio web
    if (local.website && local.website.trim()) {
      const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\S*)?$/;
      if (!urlRegex.test(local.website.trim())) {
        newErrors.website = "Por favor, ingresa una URL válida (ej: https://ejemplo.com)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        <Typography variant="h3" fontWeight={800} gutterBottom sx={{ color: "#1a202c", textAlign: "center" }}>
          Cuéntanos sobre tu idea
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
          Este es el primer paso para dar vida a tu proyecto. Completa la información básica para que nuestra comunidad pueda conocer tu iniciativa.
        </Typography>
        
        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
          Información Básica
        </Typography>

        <Box display="flex" flexDirection="column" gap={3} mt={2}>
          <TextField
            label="Título del proyecto"
            fullWidth
            value={local.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3B82F6',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#3B82F6',
              },
            }}
          />

          <TextField
            label="Descripción corta"
            fullWidth
            multiline
            minRows={2}
            value={local.shortDescription}
            onChange={(e) => handleChange("shortDescription", e.target.value)}
            error={!!errors.shortDescription}
            helperText={errors.shortDescription || `${local.shortDescription.length}/200 caracteres recomendados`}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3B82F6',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#3B82F6',
              },
            }}
          />

          <TextField
            select
            label="Categoría"
            fullWidth
            value={local.category}
            onChange={(e) => handleChange("category", e.target.value)}
            error={!!errors.category}
            helperText={errors.category}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3B82F6',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#3B82F6',
              },
            }}
          >
            <MenuItem value={1}>Medio Ambiente</MenuItem>
            <MenuItem value={2}>Educación</MenuItem>
            <MenuItem value={3}>Salud</MenuItem>
            <MenuItem value={4}>Tecnología</MenuItem>
            <MenuItem value={5}>Cultura</MenuItem>
            <MenuItem value={6}>Deportes</MenuItem>
          </TextField>

          <TextField
            label="Ubicación"
            fullWidth
            value={local.location}
            onChange={(e) => handleChange("location", e.target.value)}
            error={!!errors.location}
            helperText={errors.location}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3B82F6',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#3B82F6',
              },
            }}
          />

          <TextField
            label="Lema del proyecto"
            fullWidth
            placeholder="Juntos construimos un futuro mejor"
            value={local.slogan}
            onChange={(e) => handleChange("slogan", e.target.value)}
            error={!!errors.slogan}
            helperText={errors.slogan || "Una frase inspiradora que represente tu proyecto"}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3B82F6',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#3B82F6',
              },
            }}
          />

          <TextField
            label="Sitio web (opcional)"
            fullWidth
            placeholder="https://www.ejemplo.com"
            value={local.website}
            onChange={(e) => handleChange("website", e.target.value)}
            error={!!errors.website}
            helperText={errors.website || "Opcional: Sitio web oficial del proyecto u organización"}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#3B82F6',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#3B82F6',
              },
            }}
          />

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ 
                textTransform: "none", 
                fontWeight: 700,
                bgcolor: "#1E3A8A",
                color: "white",
                '&:hover': {
                  bgcolor: "#3B82F6",
                }
              }}
            >
              Siguiente
            </Button>
          </Box>

          {/* Pie de página con nota de campos obligatorios */}
          <Box sx={{ 
            mt: 4, 
            pt: 3, 
            borderTop: "1px solid rgba(30, 58, 138, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(30, 58, 138, 0.02)",
            borderRadius: 2,
            p: 2
          }}>
            <Typography variant="caption" color="text.secondary" sx={{ 
              fontStyle: "italic",
              textAlign: "center"
            }}>
              * Los campos marcados con asterisco son obligatorios para continuar
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
