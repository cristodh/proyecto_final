import React, { useState } from "react";
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Paper,
  Typography,
  Button
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { authenticatedPostData } from "../../../services/fetch";

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
    projectSections: [],
    startDate: "",
    endDate: "",
    permissions: "",
    contactPhone: "",
    contactEmail: "",
    slogan: "",
    pdf_documents: [],  // 👈 AÑADIDO
  });

  const onNext = () => setActiveStep((prev) => prev + 1);
  const onBack = () => setActiveStep((prev) => prev - 1);
  const goToStep = (step) => setActiveStep(step);

  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const onSubmit = async () => {
    const campaignData = {
      name: formData.title,
      description: formData.story || formData.shortDescription,
      short_description: formData.shortDescription,
      slogan: formData.slogan,
      story: formData.story,
      start_date: formData.startDate,
      end_date: formData.endDate,
      goal_amount: parseFloat(formData.goalAmount),
      location: formData.location,
      category: parseInt(formData.category) || 1,
      contact_phone: formData.contactPhone,
      contact_email: formData.contactEmail,
      website: formData.website,
      permissions: formData.permissions,

      // 👇 AHORA SÍ SE ENVÍA
      pdf_documents: formData.pdf_documents,
      cover_image: formData.coverImage,
      
      // 👇 METAS POR SECCIÓN DEL PROYECTO
      project_sections: formData.projectSections,
    };

    console.log("📤 Enviando campaña final:", campaignData);
    
    try {
      const response = await authenticatedPostData("campaign/new_campaigns/", campaignData);
      
      if (response && response.ok) {
        console.log("✅ Campaña creada exitosamente");
        // NOTE: Para seguir probando con el formulario ya lleno,
        // bloqueamos el cierre automático del modal.
        // if (onClose) onClose();
      } else {
        console.error("❌ Error al crear campaña:", response);
      }
    } catch (error) {
      console.error("❌ Error al enviar campaña:", error);
    }
  };

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
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        p: 3,
        borderBottom: "1px solid rgba(30, 58, 138, 0.1)",
        bgcolor: "rgba(30, 58, 138, 0.02)"
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
                bgcolor: "rgba(30, 58, 138, 0.08)",
                color: "#3B82F6"
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
