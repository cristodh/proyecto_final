// src/HomePage/components/HomePageContent.jsx
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Header from "../../components/MainHeader/MainHeader";
import HeaderUser from "../../DonorProfile/components/HeaderUser/HeaderUser";
import Hero from "./Hero/Hero";
import FeaturedCarousel from "./FeaturedCarousel/FeaturedCarousel";
import Highlights from "./Highlights";
import Stats from "./Stats/Stats";
import Footer from "./Footer/Footer";
import PublicCampaignDetailsModal from "../../ProjectExplorer/components/PublicCampaignDetailsModal";
import { tokenGetData } from "../../services/fetch";

export default function HomePageContent() {
  const [userLogged, setUserLogged] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (!userId) return;

    const getUser = async () => {
      const response = await tokenGetData(`user/user_id/${userId}/`);
      setUserLogged(response[0]);
    };

    getUser();
  }, []);

  const handleProjectClick = (campaign) => {
    setSelectedCampaign(campaign);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCampaign(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {localStorage.getItem("id") ? <HeaderUser user={userLogged} /> : <Header />}

      <Box component="main" sx={{ flex: 1 }}>
        <Hero />
        <FeaturedCarousel onProjectClick={handleProjectClick} />
        <Highlights onProjectClick={handleProjectClick} />
        <Stats />
      </Box>

      <Footer />

      {selectedCampaign && (
        <PublicCampaignDetailsModal
          campaign={selectedCampaign}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
}
