import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  IconButton,
  Grid,
  Chip
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

export default function AddCampaignStep2({ data, update, next, back }) {
  const [local, setLocal] = useState({
    goalAmount: data.goalAmount || "",
    story: data.story || "",
    projectSections: data.projectSections || [],
    startDate: data.startDate || "",
    endDate: data.endDate || "",
    permissions: data.permissions || "",
    contactPhone: data.contactPhone || "",
    contactEmail: data.contactEmail || "",
  });

  const [errors, setErrors] = useState({});
  
  // Estado para nuevo section
  const [newSection, setNewSection] = useState({ name: "", goal: "" });

  const handleChange = (field, value) => {
    setLocal((prev) => ({ ...prev, [field]: value }));
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleAddSection = () => {
    if (newSection.name.trim() && newSection.goal.trim() && parseFloat(newSection.goal) > 0) {
      const updatedSections = [...local.projectSections, { 
        name: newSection.name.trim(), 
        goal: parseFloat(newSection.goal) 
      }];
      setLocal(prev => ({ ...prev, projectSections: updatedSections }));
      setNewSection({ name: "", goal: "" });
    }
  };

  const handleRemoveSection = (index) => {
    const updatedSections = local.projectSections.filter((_, i) => i !== index);
    setLocal(prev => ({ ...prev, projectSections: updatedSections }));
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

    if (!local.startDate) {
      newErrors.startDate = "La fecha de inicio es obligatoria";
    }

    if (!local.endDate) {
      newErrors.endDate = "La fecha final es obligatoria";
    } else if (local.startDate && new Date(local.endDate) <= new Date(local.startDate)) {
      newErrors.endDate = "La fecha final debe ser posterior a la fecha de inicio";
    }

    if (!local.permissions.trim()) {
      newErrors.permissions = "Los permisos del proyecto son obligatorios";
    }

    if (!local.contactPhone.trim()) {
      newErrors.contactPhone = "El teléfono de contacto es obligatorio";
    } else if (!/^\+?[\d\s\-\(\)]{8,15}$/.test(local.contactPhone.trim())) {
      newErrors.contactPhone = "Ingresa un número de teléfono válido";
    }

    if (!local.contactEmail.trim()) {
      newErrors.contactEmail = "El correo de contacto es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(local.contactEmail.trim())) {
      newErrors.contactEmail = "Ingresa un correo electrónico válido";
    }

    if (local.projectSections.length === 0) {
      newErrors.projectSections = "Debe agregar al menos una sección del proyecto";
    } else {
      // Validar que la suma de las secciones no exceda la meta total
      const totalSections = local.projectSections.reduce((sum, s) => sum + parseFloat(s.goal || 0), 0);
      const goalTotal = parseFloat(local.goalAmount) || 0;
      if (totalSections > goalTotal) {
        newErrors.projectSections = `La suma de las secciones (₡${totalSections.toLocaleString()}) no puede exceder la meta total (₡${goalTotal.toLocaleString()})`;
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
          Detalles del Proyecto
        </Typography>

        <Box display="flex" flexDirection="column" gap={3} mt={2}>
          {/* Meta General y Historia */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Meta de recaudación total (₡)"
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
                      borderColor: '#3B82F6',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#3B82F6',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Permisos del proyecto"
                fullWidth
                multiline
                minRows={2}
                value={local.permissions}
                onChange={(e) => handleChange("permissions", e.target.value)}
                error={!!errors.permissions}
                helperText={errors.permissions || "Describe los permisos necesarios, licencias o autorizaciones"}
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
            </Grid>
          </Grid>

          {/* Fechas */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Fecha de inicio"
                type="date"
                fullWidth
                value={local.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                error={!!errors.startDate}
                helperText={errors.startDate}
                required
                InputLabelProps={{ shrink: true }}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Fecha final"
                type="date"
                fullWidth
                value={local.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                error={!!errors.endDate}
                helperText={errors.endDate}
                required
                InputLabelProps={{ shrink: true }}
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
            </Grid>
          </Grid>

          {/* Información de Contacto */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Teléfono de contacto"
                fullWidth
                placeholder="8888-8888"
                value={local.contactPhone}
                onChange={(e) => handleChange("contactPhone", e.target.value)}
                error={!!errors.contactPhone}
                helperText={errors.contactPhone}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Correo electrónico"
                type="email"
                fullWidth
                placeholder="contacto@proyecto.com"
                value={local.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                error={!!errors.contactEmail}
                helperText={errors.contactEmail}
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
            </Grid>
          </Grid>

          {/* Metas por Secciones */}
          <Box sx={{ p: 3, borderRadius: 2, border: "1px solid rgba(30,58,138,0.2)", bgcolor: "rgba(30,58,138,0.02)" }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Metas por Secciones del Proyecto *
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Divide tu proyecto en secciones específicas con metas individuales para mejor transparencia (obligatorio)
            </Typography>
            
            {errors.projectSections && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                {errors.projectSections}
              </Typography>
            )}

            {/* Formulario para agregar nueva sección */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={5}>
                <TextField
                  label="Nombre de la sección"
                  fullWidth
                  placeholder="Ej: Mano de obra"
                  value={newSection.name}
                  onChange={(e) => setNewSection(prev => ({ ...prev, name: e.target.value }))}
                  size="small"
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
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  label="Meta en colones"
                  type="number"
                  fullWidth
                  placeholder="Ej: 50000"
                  value={newSection.goal}
                  onChange={(e) => setNewSection(prev => ({ ...prev, goal: e.target.value }))}
                  size="small"
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
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
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  variant="contained"
                  onClick={handleAddSection}
                  disabled={!newSection.name.trim() || !newSection.goal.trim() || parseFloat(newSection.goal) <= 0}
                  startIcon={<AddIcon />}
                  sx={{
                    height: '40px',
                    bgcolor: "#3B82F6",
                    '&:hover': {
                      bgcolor: "#1E3A8A",
                    }
                  }}
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>

            {/* Lista de secciones agregadas */}
            {local.projectSections.length > 0 ? (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                  Secciones agregadas:
                </Typography>
                <Grid container spacing={2}>
                  {local.projectSections.map((section, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Box sx={{ 
                        p: 2, 
                        borderRadius: 2, 
                        border: "1px solid rgba(30,58,138,0.1)",
                        bgcolor: "white",
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center" 
                      }}>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {section.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ₡{section.goal.toLocaleString()}
                          </Typography>
                        </Box>
                        <IconButton
                          onClick={() => handleRemoveSection(index)}
                          size="small"
                          sx={{ 
                            color: "#EF4444",
                            '&:hover': {
                              bgcolor: "rgba(239, 68, 68, 0.1)"
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                
                {/* Resumen de metas */}
                {(() => {
                  const totalSections = local.projectSections.reduce((sum, s) => sum + parseFloat(s.goal || 0), 0);
                  const goalTotal = parseFloat(local.goalAmount) || 0;
                  const remaining = goalTotal - totalSections;
                  const isOverBudget = remaining < 0;
                  
                  return (
                    <Box sx={{ 
                      mt: 2, 
                      p: 2, 
                      borderRadius: 2, 
                      bgcolor: isOverBudget ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)",
                      border: `1px solid ${isOverBudget ? "rgba(239, 68, 68, 0.3)" : "rgba(34, 197, 94, 0.3)"}`
                    }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          Total secciones:
                        </Typography>
                        <Typography variant="body2" fontWeight={700} color={isOverBudget ? "error.main" : "success.main"}>
                          ₡{totalSections.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          Meta total:
                        </Typography>
                        <Typography variant="body2" fontWeight={700}>
                          ₡{goalTotal.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1, borderTop: "1px dashed rgba(0,0,0,0.2)" }}>
                        <Typography variant="body2" fontWeight={600}>
                          {isOverBudget ? "Excedente:" : "Disponible:"}
                        </Typography>
                        <Typography variant="body2" fontWeight={700} color={isOverBudget ? "error.main" : "text.secondary"}>
                          {isOverBudget ? `-₡${Math.abs(remaining).toLocaleString()}` : `₡${remaining.toLocaleString()}`}
                        </Typography>
                      </Box>
                      {isOverBudget && (
                        <Typography variant="caption" color="error.main" sx={{ display: "block", mt: 1 }}>
                          ⚠️ La suma de las secciones excede la meta total de recaudación
                        </Typography>
                      )}
                    </Box>
                  );
                })()}
              </Box>
            ) : (
              <Box sx={{ 
                p: 3, 
                borderRadius: 2, 
                border: "2px dashed rgba(30,58,138,0.2)", 
                bgcolor: "rgba(30,58,138,0.01)",
                textAlign: "center"
              }}>
                <Typography variant="body2" color="text.secondary">
                  No has agregado ninguna sección aún. Agrega al menos una sección para continuar.
                </Typography>
              </Box>
            )}
          </Box>

          {/* Historia del proyecto */}
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
                  borderColor: '#3B82F6',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#3B82F6',
              },
            }}
          />

          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              onClick={back}
              sx={{ 
                textTransform: "none",
                borderColor: "#3B82F6",
                color: "#3B82F6",
                '&:hover': {
                  borderColor: "#1E3A8A",
                  bgcolor: "rgba(59, 130, 246, 0.08)"
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
