// src/pages/OrganizationSetupPage.jsx
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import OrganizationForm from "../../components/OrganizationForm/OrganizationForm";

export default function OrganizationSetupPage() {
  return (
    <Box sx={{ background: "#f6f8f6", minHeight: "100vh" }}>
      <Header />
      <OrganizationForm />
    </Box>
  );
}