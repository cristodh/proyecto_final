import React, { useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, Card, CardContent } from "@mui/material";

export default function AddCampaignStep1({ data, update, next }) {
  const [local, setLocal] = useState({
    title: data.title || "",
    shortDescription: data.shortDescription || "",
    category: data.category || "",
    location: data.location || "",
    website: data.website || "",
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
        <Typography variant="h5" fontWeight={700} gutterBottom>
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
                  borderColor: '#FF8C00',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FF8C00',
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
                  borderColor: '#FF8C00',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FF8C00',
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
                  borderColor: '#FF8C00',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FF8C00',
              },
            }}
          >
            <MenuItem value="Medio Ambiente">Medio Ambiente</MenuItem>
            <MenuItem value="Educación">Educación</MenuItem>
            <MenuItem value="Salud">Salud</MenuItem>
            <MenuItem value="Tecnología">Tecnología</MenuItem>
            <MenuItem value="Cultura">Cultura</MenuItem>
            <MenuItem value="Deportes">Deportes</MenuItem>
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
                  borderColor: '#FF8C00',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FF8C00',
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
                  borderColor: '#FF8C00',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FF8C00',
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
                bgcolor: "#FF8C00",
                color: "white",
                '&:hover': {
                  bgcolor: "#E67C00",
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
