import React, { useState } from "react";
import { Box, Typography, TextField, Button, Card, CardContent } from "@mui/material";

export default function AddCampaignStep2({ data, update, next, back }) {
  const [local, setLocal] = useState({
    goalAmount: data.goalAmount || "",
    story: data.story || "",
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
    
    if (!local.goalAmount) {
      newErrors.goalAmount = "La meta de recaudación es obligatoria";
    } else if (parseFloat(local.goalAmount) <= 0) {
      newErrors.goalAmount = "La meta debe ser mayor a 0";
    } else if (parseFloat(local.goalAmount) < 10000) {
      newErrors.goalAmount = "La meta mínima recomendada es ₡10,000";
    }
    
    if (!local.story.trim()) {
      newErrors.story = "La historia del proyecto es obligatoria";
    } else if (local.story.length < 50) {
      newErrors.story = "La historia debe tener al menos 50 caracteres";
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
          Detalles del Proyecto
        </Typography>

        <Box display="flex" flexDirection="column" gap={3} mt={2}>
          <TextField
            label="Meta de recaudación (₡)"
            type="number"
            fullWidth
            value={local.goalAmount}
            onChange={(e) => handleChange("goalAmount", e.target.value)}
            error={!!errors.goalAmount}
            helperText={errors.goalAmount}
            required
            InputProps={{
              inputProps: { min: 0 }
            }}
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
            label="Historia del proyecto"
            fullWidth
            multiline
            minRows={4}
            value={local.story}
            onChange={(e) => handleChange("story", e.target.value)}
            error={!!errors.story}
            helperText={errors.story || `${local.story.length} caracteres. Explica por qué tu proyecto es importante y cómo ayudará.`}
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

          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              onClick={back}
              sx={{ 
                textTransform: "none",
                borderColor: "#FF8C00",
                color: "#FF8C00",
                '&:hover': {
                  borderColor: "#E67C00",
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
