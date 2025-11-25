// src/pages/ManagerRegisterPage.jsx
import { Box } from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header/Header";
import ManagerForm from "../../components/ManagerForm/ManagerForm";
import OrganizationForm from "../../components/OrganizationForm/OrganizationForm";

export default function ManagerRegisterPage() {
  const [currentStep, setCurrentStep] = useState("manager"); // "manager" o "organization"

  const handleManagerFormComplete = () => {
    setCurrentStep("organization");
  };

  return (
    <Box sx={{ background: "#f6f8f6", minHeight: "100vh" }}>
      <Header />
      {currentStep === "manager" ? (
        <ManagerForm onComplete={handleManagerFormComplete} />
      ) : (
        <OrganizationForm />
      )}
    </Box>
  );
}