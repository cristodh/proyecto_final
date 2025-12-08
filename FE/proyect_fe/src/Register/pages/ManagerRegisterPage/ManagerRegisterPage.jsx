// src/pages/ManagerRegisterPage.jsx
import { Box } from "@mui/material";
import { useState } from "react";
import Header from "../../../components/MainHeader/MainHeader";
import ManagerForm from "../../components/ManagerForm/ManagerForm";
import OrganizationForm from "../../components/OrganizationForm/OrganizationForm";

export default function ManagerRegisterPage() {
  const [currentStep, setCurrentStep] = useState("manager"); // "manager" | "organization"

  const handleManagerFormComplete = () => {
    setCurrentStep("organization");
  };

  const hasUserId = localStorage.getItem("userId");

  return (
    <Box sx={{ background: "#f6f8f6", minHeight: "100vh" }}>
      <Header />

      {currentStep === "manager" && !hasUserId ? (
        <ManagerForm onComplete={handleManagerFormComplete} />
      ) : (
        <OrganizationForm />
      )}
    </Box>
  );
}
