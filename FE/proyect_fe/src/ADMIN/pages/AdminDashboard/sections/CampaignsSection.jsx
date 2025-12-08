import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import { getData, putData, deleteData } from "../../../../services/fetch";

export default function CampaignsSection() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  // TODO: Agregar useEffect para traer campañas del backend
  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        // const response = await getData('campaigns/');
        // if (response) setCampaigns(response);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter(
    (c) =>
      (filterStatus === "all" || c.status === filterStatus) &&
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "paused":
        return "warning";
      case "completed":
        return "info";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleToggleFeatured = async (id) => {
    // TODO: Implementar actualización en backend
    try {
      // const campaign = campaigns.find(c => c.id === id);
      // const response = await putData(`campaigns/${id}/`, { featured: !campaign.featured });
      // if (response.ok) {
      //   setCampaigns(campaigns.map((c) => 
      //     c.id === id ? { ...c, featured: !c.featured } : c
      //   ));
      // }
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  const handleTogglePause = async (id) => {
    // TODO: Implementar pausa/reactivación en backend
    try {
      // const campaign = campaigns.find(c => c.id === id);
      // const newStatus = campaign.status === 'active' ? 'paused' : 'active';
      // const response = await putData(`campaigns/${id}/`, { status: newStatus });
      // if (response.ok) {
      //   setCampaigns(campaigns.map((c) =>
      //     c.id === id ? { ...c, status: newStatus } : c
      //   ));
      // }
    } catch (error) {
      console.error('Error toggling pause:', error);
    }
  };

  const handleDelete = async (id) => {
    // TODO: Implementar eliminación en backend
    try {
      // const response = await deleteData(`campaigns/${id}/`);
      // if (response.ok) {
      //   setCampaigns(campaigns.filter(c => c.id !== id));
      // }
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const calculateProgress = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100).toFixed(1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          Gestión de Campañas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Control total sobre todas las campañas del sistema
        </Typography>
      </Box>

      {/* Filtros y búsqueda */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          border: 1,
          borderColor: "custom.borderLight",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Buscar por nombre, creador o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              label="Estado"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="active">Activas</MenuItem>
              <MenuItem value="paused">Pausadas</MenuItem>
              <MenuItem value="completed">Completadas</MenuItem>
              <MenuItem value="rejected">Rechazadas</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabla de campañas */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 2,
          border: 1,
          borderColor: "custom.borderLight",
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Campaña</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Creador</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Categoría</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Meta / Recaudado
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">
                Avance
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCampaigns.map((campaign) => (
              <TableRow key={campaign.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {campaign.featured && (
                      <StarIcon sx={{ color: "warning.main", fontSize: 18 }} />
                    )}
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {campaign.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{campaign.creator}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={campaign.category}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ${campaign.goal.toLocaleString()} / $
                    {campaign.raised.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {calculateProgress(campaign.raised, campaign.goal)}%
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(campaign.status)}
                    color={getStatusColor(campaign.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleTogglePause(campaign.id)}
                      startIcon={
                        campaign.status === "active" ? (
                          <PauseIcon />
                        ) : (
                          <PlayArrowIcon />
                        )
                      }
                    >
                      {campaign.status === "active" ? "Pausar" : "Reactivar"}
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleToggleFeatured(campaign.id)}
                      startIcon={<StarIcon />}
                      color={campaign.featured ? "warning" : "inherit"}
                    >
                      Destacar
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(campaign.id)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
