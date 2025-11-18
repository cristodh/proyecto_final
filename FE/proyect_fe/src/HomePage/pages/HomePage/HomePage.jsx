// src/pages/HomePage.jsx
import React from "react";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import FeaturedCarousel from "../../components/FeaturedCarousel/FeaturedCarousel";
import Stats from "../../components/Stats/Stats";
import Footer from "../../components/Footer/Footer";
import Box from "@mui/material/Box";

export default function HomePage() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        <Hero />
        <FeaturedCarousel />
        <Stats />
      </Box>
      <Footer />
    </Box>
  );
}
