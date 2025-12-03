// AddCampaignStep4.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Alert,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";

export default function AddCampaignStep4({ data, onBack, onSubmit, goToStep }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validaciones finales
  const validations = {
    hasTitle: data.title && data.title.length >= 5,
    hasDescription: data.shortDescription && data.shortDescription.length >= 20,
    hasCategory: !!data.category,
    hasLocation: !!data.location,
    hasGoal: data.goalAmount && parseFloat(data.goalAmount) > 0,
    hasStory: data.story && data.story.length >= 50,
    hasImage: !!data.coverImage,
    hasVideo: !!data.videoUrl,
    hasWebsite: !!data.website,
  };

  const requiredValidations = Object.entries(validations).filter(([key]) => key !== 'hasImage' && key !== 'hasVideo' && key !== 'hasWebsite');
  const allRequiredValid = requiredValidations.every(([, isValid]) => isValid);
  const completeness = (Object.values(validations).filter(Boolean).length / Object.keys(validations).length) * 100;

  const handleSubmit = async () => {
    if (!allRequiredValid) {
      return;
    }

    setIsSubmitting(true);
    
    // Simular envío
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 2000);
  };
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {/* HEADER */}
      <Box>
        <Typography variant="h4" fontWeight={700}>
          Revisión Final y Envío
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={1}>
          Su proyecto será enviado para revisión y aprobación por nuestro equipo especializado.
        </Typography>
      </Box>

      {/* ALERT DE VALIDACIÓN */}
      {!allRequiredValid && (
        <Alert severity="error" icon={<WarningIcon />}>
          <Typography fontWeight={600}>Información requerida pendiente</Typography>
          <Typography variant="body2">
            Por favor, complete todos los campos obligatorios para proceder con el envío de su proyecto para aprobación.
          </Typography>
        </Alert>
      )}

      {allRequiredValid && !validations.hasImage && (
        <Alert severity="success" icon={<CheckCircleIcon />}>
          <Typography fontWeight={600}>Su proyecto está listo para envío</Typography>
          <Typography variant="body2">
            Todos los campos requeridos han sido completados correctamente. Su proyecto será enviado a nuestro equipo de revisión para su aprobación y posterior publicación. 
            <strong> Recomendación:</strong> Agregar una imagen principal aumentará significativamente la visibilidad y atractivo de su proyecto.
          </Typography>
        </Alert>
      )}

      {allRequiredValid && validations.hasImage && (
        <Alert severity="success" icon={<CheckCircleIcon />}>
          <Typography fontWeight={600}>¡Excelente! Su proyecto está completo y listo</Typography>
          <Typography variant="body2">
            Felicitaciones, ha proporcionado toda la información necesaria para crear un proyecto exitoso. 
            Su propuesta será enviada a nuestro equipo de revisión para su evaluación y aprobación. 
            Una vez aprobado, su proyecto será publicado en nuestra plataforma.
            <strong> Completitud: {Math.round(completeness)}%</strong>
          </Typography>
        </Alert>
      )}

      {/* CARD */}
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Box display="flex" flexDirection="column" gap={4}>
            {/* STEP TITLE + PROGRESS */}
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ sm: "center" }}
              gap={3}
            >
              <Typography variant="h6" fontWeight={700}>
                Paso 4 de 4: Revisar y Publicar
              </Typography>

              {/* PROGRESS BAR */}
              <Box width={{ xs: "100%", sm: "260px" }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ color: "#3B82F6" }}
                  >
                    Paso 4 de 4
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ color: "#3B82F6" }}
                  >
                    100%
                  </Typography>
                </Box>

                {/* PROGRESS BAR STATIC */}
                <Box
                  sx={{
                    width: "100%",
                    height: 8,
                    borderRadius: 5,
                    bgcolor: "divider",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 5,
                      bgcolor: "#3B82F6",
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Divider />

            {/* SECTION: BASIC INFO */}
            <ReviewSection
              title="Información Básica"
              lines={[
                data.title || "Sin título",
                `${data.category || "Sin categoría"} – ${data.location || "Sin ubicación"}`,
                data.website ? `Sitio web: ${data.website}` : "Sin sitio web"
              ]}
              stepIndex={0}
              isValid={validations.hasTitle && validations.hasCategory && validations.hasLocation}
            />

            <Divider />

            {/* SECTION: PROJECT DETAILS */}
            <ReviewSection
              title="Detalles del Proyecto"
              lines={[
                data.shortDescription || "Sin descripción",
                `Meta: ₡${data.goalAmount ? parseFloat(data.goalAmount).toLocaleString() : "0"}`,
                data.story ? (data.story.length > 100 ? data.story.substring(0, 100) + "..." : data.story) : "Sin historia del proyecto"
              ]}
              stepIndex={1}
              isValid={validations.hasDescription && validations.hasGoal && validations.hasStory}
            />

            <Divider />

            {/* SECTION: MEDIA */}
            <ReviewSection
              title="Contenido Multimedia"
              lines={[
                `${data.gallery?.length || 0} imágenes adicionales`,
                data.coverImage ? "Imagen de portada: ✓" : "Sin imagen de portada",
                data.videoUrl ? `Video del proyecto: ✓ (${data.videoUrl})` : "Sin video del proyecto"
              ]}
              stepIndex={2}
              isValid={true} // Las imágenes son opcionales
              isOptional={true}
            />

            <Divider />

            {/* ACTION BUTTONS */}
            <Box display="flex" justifyContent="flex-end" gap={2} pt={2}>
              <Button
                variant="outlined"
                sx={{
                  minWidth: 150,
                  textTransform: "none",
                  fontWeight: 700,
                  borderColor: "#3B82F6",
                  color: "#3B82F6",
                  '&:hover': {
                    borderColor: "#1E3A8A",
                    bgcolor: "rgba(255, 140, 0, 0.08)"
                  }
                }}
                onClick={onBack}
              >
                Volver
              </Button>

              <Button
                variant="contained"
                sx={{
                  minWidth: 180,
                  bgcolor: allRequiredValid ? "#3B82F6" : "#ccc",
                  color: "white",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  py: 1.2,
                  "&:hover": { 
                    bgcolor: allRequiredValid ? "#1E3A8A" : "#ccc"
                  },
                  "&:disabled": {
                    bgcolor: "#ccc",
                    color: "white"
                  }
                }}
                onClick={handleSubmit}
                disabled={!allRequiredValid || isSubmitting}
              >
                {isSubmitting ? "Enviando para aprobación..." : "Enviar para Aprobación"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/*                            REUSABLE ITEM COMPONENT                         */
/* -------------------------------------------------------------------------- */

function ReviewSection({ title, lines = [], stepIndex, isValid = true, isOptional = false }) {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      gap={2}
    >
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            {title}
          </Typography>
          <Chip 
            size="small"
            label={isValid ? (isOptional ? "Opcional" : "Completo") : "Incompleto"}
            color={isValid ? "success" : "error"}
            variant="outlined"
          />
        </Box>

        {lines.map((text, idx) => (
          <Typography
            key={idx}
            variant="body2"
            color="text.secondary"
            mt={idx === 0 ? 1 : 0.5}
          >
            {text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
