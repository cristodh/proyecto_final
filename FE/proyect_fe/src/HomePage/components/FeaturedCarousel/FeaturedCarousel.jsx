// src/components/FeaturedCarousel.jsx
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import ProjectCard from "../ProjectCard/ProjectCard";
import { getData } from "../../../services/fetch";
import { useNavigate } from "react-router-dom";

export default function FeaturedCarousel({ onProjectClick }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFeaturedCampaigns = async () => {
    try {
      setLoading(true);
      // Traer campañas activas ordenadas por recaudación (popular)
      const response = await getData("campaign/explore/?sort_by=popular");
      
      if (response && response.campaigns) {
        // Tomar solo los primeros 3 proyectos destacados
        const featured = response.campaigns.slice(0, 3);
        setCampaigns(featured);
      }
    } catch (error) {
      console.error("Error fetching featured campaigns:", error);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedCampaigns();

    // Refrescar cada 30 segundos
    const interval = setInterval(() => {
      fetchFeaturedCampaigns();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleViewAll = () => {
    navigate("/explore-projects");
  };

  const handleProjectClick = (campaign) => {
    if (onProjectClick) {
      onProjectClick(campaign);
    }
  };

  return (
    <Box component="section" sx={{ py: 8, bgcolor: "action.hover" }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Campañas Destacadas</Typography>
          <Typography 
            onClick={handleViewAll}
            sx={{ color: "primary.main", fontWeight: 700, textDecoration: "none", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          >
            Ver todas
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : campaigns.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography color="text.secondary">No hay campañas destacadas en este momento</Typography>
          </Box>
        ) : (
          <Box sx={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            "& > div": { scrollSnapAlign: "center" },
            py: 1,
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" }
          }}>
            {campaigns.map((campaign) => (
              <ProjectCard 
                key={campaign.id} 
                campaign={campaign}
                onViewProject={() => handleProjectClick(campaign)}
              />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
