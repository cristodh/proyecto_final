// src/pages/RegisterPage.jsx
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import DonorForm from "../../components/DonorForm/DonorForm";

export default function RegisterPage() {
  return (
    <Box sx={{ background: "#f6f8f6", minHeight: "100vh" }}>
      <Header />
      <DonorForm />
    </Box>
  );
}
