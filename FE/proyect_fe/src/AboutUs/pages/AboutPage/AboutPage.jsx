// src/pages/AboutPage.jsx
import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import MissionVision from "../../components/MissionVision/MissionVision";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import CTASection from "../../components/CTASection/CTASection";
import Container from "@mui/material/Container";

export default function AboutPage() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "background.default" }}>
      <Header />
      <Box component="main" sx={{ flex: 1, py: { xs: 2, md: 4 } }}>
        <Hero />
        <Container maxWidth="lg" sx={{ mt: 2 }}>
          <MissionVision />
          <HowItWorks />
          <CTASection />
        </Container>
      </Box>
    </Box>
  );
}
