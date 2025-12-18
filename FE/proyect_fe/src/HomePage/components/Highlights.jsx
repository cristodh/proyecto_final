// src/HomePage/components/Highlights.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { getData } from "../../services/fetch";

function ProgressBar({ value }) {
  return (
    <Box sx={{ width: "100%", height: 8, borderRadius: 10, backgroundColor: "grey.200", overflow: "hidden" }}>
      <Box
        sx={{
          width: `${Math.min(value, 100)}%`,
          height: "100%",
          background: "linear-gradient(90deg, #1E3A8A, #3B82F6)",
          transition: "width 0.3s ease"
        }}
      />
    </Box>
  );
}

function CampaignMiniCard({ campaign, onView }) {
  const current = parseFloat(campaign.current_amount || 0);
  const goal = parseFloat(campaign.goal_amount || 0);
  const progress = goal > 0 ? (current / goal) * 100 : 0;

  return (
    <Paper elevation={2} sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
        <Chip size="small" label={campaign.province || "Provincia"} />
        <Chip size="small" label={campaign.category_name || "Categoría"} variant="outlined" />
      </Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
        {campaign.name || "Sin título"}
      </Typography>
      <Typography variant="body2" color="text.secondary" noWrap>
        {campaign.short_description || "Descripción no disponible"}
      </Typography>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
          <Typography variant="caption" fontWeight={700}>{Math.round(progress)}%</Typography>
          <Typography variant="caption">
            ₡{current.toLocaleString("es-CR")} / ₡{goal.toLocaleString("es-CR")}
          </Typography>
        </Box>
        <ProgressBar value={progress} />
      </Box>
      <Button size="small" variant="outlined" sx={{ mt: "auto" }} onClick={onView}>
        Ver proyecto
      </Button>
    </Paper>
  );
}

export default function Highlights({ onProjectClick }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await getData("campaign/explore/");
      setCampaigns(response?.campaigns || []);
    } catch (err) {
      console.error("Error fetching campaigns for highlights", err);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const recentCampaigns = useMemo(() => {
    return [...campaigns].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4);
  }, [campaigns]);

  const topProgress = useMemo(() => {
    return [...campaigns]
      .filter(c => parseFloat(c.goal_amount || 0) > 0)
      .sort((a, b) => (parseFloat(b.current_amount || 0) / parseFloat(b.goal_amount || 1)) - (parseFloat(a.current_amount || 0) / parseFloat(a.goal_amount || 1)))
      .slice(0, 4);
  }, [campaigns]);

  const provinceCounts = useMemo(() => {
    const counts = {};
    campaigns.forEach(c => {
      const prov = c.province || "Provincia";
      counts[prov] = (counts[prov] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [campaigns]);

  const handleProvinceClick = (province) => {
    navigate(`/explore-projects?province=${encodeURIComponent(province)}`);
  };

  const handleViewAll = (sort) => {
    const qs = sort ? `?sort_by=${sort}` : "";
    navigate(`/explore-projects${qs}`);
  };

  return (
    <Box sx={{ py: 8, bgcolor: "grey.50" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 }, display: "flex", flexDirection: "column", gap: 6 }}>
        {/* Provincias */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>Explora por provincia</Typography>
            <Button size="small" onClick={() => navigate("/explore-projects")}>Ver todas</Button>
          </Box>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}><CircularProgress size={24} /></Box>
          ) : (
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {provinceCounts.length === 0 && <Typography color="text.secondary">Sin datos</Typography>}
              {provinceCounts.map(([prov, count]) => (
                <Chip key={prov} label={`${prov} (${count})`} onClick={() => handleProvinceClick(prov)} clickable />
              ))}
            </Box>
          )}
        </Box>

        {/* Recientes */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>Proyectos recientes</Typography>
            <Button size="small" onClick={() => handleViewAll("recent")}>Ver más</Button>
          </Box>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}><CircularProgress size={24} /></Box>
          ) : (
            <Grid container spacing={2}>
              {recentCampaigns.length === 0 && <Typography color="text.secondary" sx={{ px: 2, py: 1 }}>Sin proyectos recientes</Typography>}
              {recentCampaigns.map(c => (
                <Grid item xs={12} md={3} key={c.id}>
                  <CampaignMiniCard campaign={c} onView={() => onProjectClick?.(c)} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Mayor progreso */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>Más avanzados</Typography>
            <Button size="small" onClick={() => handleViewAll("popular")}>Ver más</Button>
          </Box>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}><CircularProgress size={24} /></Box>
          ) : (
            <Grid container spacing={2}>
              {topProgress.length === 0 && <Typography color="text.secondary" sx={{ px: 2, py: 1 }}>Sin proyectos</Typography>}
              {topProgress.map(c => (
                <Grid item xs={12} md={3} key={c.id}>
                  <CampaignMiniCard campaign={c} onView={() => onProjectClick?.(c)} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}
