import React, { useState } from "react";
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Paper,
  Typography,
  Button,
  DialogActions
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import AddCampaignStep1 from "./AddCampaignStep1";
import AddCampaignStep2 from "./AddCampaignStep2";
import AddCampaignStep3 from "./AddCampaignStep3";
import AddCampaignStep4 from "./AddCampaignStep4";

const steps = ["Información Básica", "Detalles", "Multimedia", "Confirmación"];

export default function AddCampaign({ onClose }) {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    category: "",
    goalAmount: "",
    location: "",
    coverImage: null,
    gallery: [],
    story: "",
  });

  // ---------------------------
  // Navegación entre pasos
  // ---------------------------
  const onNext = () => setActiveStep((prev) => prev + 1);
  const onBack = () => setActiveStep((prev) => prev - 1);
  const goToStep = (step) => setActiveStep(step);

  // ---------------------------
  // Actualización del formulario
  // ---------------------------
  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  // ---------------------------
  // Enviar formulario final
  // ---------------------------
  const onSubmit = () => {
    console.log("📤 Enviando campaña final:", formData);
    // Aquí va el POST real:
    // await postData("/campaigns", formData);
    
    // Cerrar el modal después de enviar
    if (onClose) onClose();
  };

  // ---------------------------
  // Render de cada paso
  // ---------------------------
  const renderStep = () => {
    const stepProps = {
      data: formData,
      update: updateFormData,
      next: onNext,
      back: onBack,
    };

    switch (activeStep) {
      case 0:
        return <AddCampaignStep1 {...stepProps} />;

      case 1:
        return <AddCampaignStep2 {...stepProps} />;

      case 2:
        return <AddCampaignStep3 {...stepProps} />;

      case 3:
        return (
          <AddCampaignStep4
            data={formData}
            onBack={onBack}
            onSubmit={onSubmit}
            goToStep={goToStep}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%", maxHeight: "80vh", overflow: "auto" }}>
      {/* Header del modal */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        p: 3,
        borderBottom: "1px solid rgba(255, 140, 0, 0.1)",
        bgcolor: "rgba(255, 140, 0, 0.02)"
      }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a202c" }}>
          Crear Nuevo Proyecto
        </Typography>
        {onClose && (
          <Button
            onClick={onClose}
            sx={{ 
              minWidth: 0, 
              p: 1, 
              color: "#64748b",
              '&:hover': {
                bgcolor: "rgba(255, 140, 0, 0.08)",
                color: "#FF8C00"
              }
            }}
          >
            <CloseIcon />
          </Button>
        )}
      </Box>

      <Paper sx={{ p: 3, boxShadow: "none", bgcolor: "transparent" }}>
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel
          sx={{
            '& .MuiStepIcon-root.Mui-active': {
              color: '#FF8C00',
            },
            '& .MuiStepIcon-root.Mui-completed': {
              color: '#FF8C00',
            },
            mb: 3
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box mt={4}>{renderStep()}</Box>
      </Paper>
    </Box>
  );
}
