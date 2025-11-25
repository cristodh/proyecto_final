// src/pages/ManagerRegisterPage.jsx
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import ManagerForm from "../../components/ManagerForm/ManagerForm";

export default function ManagerRegisterPage() {
  return (
    <Box sx={{ background: "#f6f8f6", minHeight: "100vh" }}>
      <Header />
      <ManagerForm />
    </Box>
  );
}