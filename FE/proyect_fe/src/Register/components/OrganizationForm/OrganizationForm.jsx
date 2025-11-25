import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import { postData } from "../../services/fetch";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function OrganizationForm() {
  const navigate = useNavigate();

  // Estados para la información organizacional únicamente
  const [organizationData, setOrganizationData] = useState({
    organization_name: "",
    organization_type: "",
    tax_id: "",
    website: "",
    experience_years: "",
    focus_area: "",
  });

  // Manejador de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setOrganizationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validaciones
  const validateForm = () => {
    const requiredFields = [
      "organization_name", "organization_type", "tax_id", 
      "experience_years", "focus_area"
    ];

    for (let field of requiredFields) {
      if (!organizationData[field].trim()) {
        toast.error(`Por favor, completa el campo: ${field.replace("_", " ")}`);
        return false;
      }
    }

    return true;
  };

  // Submit del formulario organizacional
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Obtener el ID del usuario desde localStorage
      const userId = localStorage.getItem('id');
      
      if (!userId) {
        toast.error("Error de sesión. Por favor, vuelve a iniciar sesión.");
        navigate('/auth-user');
        return;
      }

      // Preparar datos para envío a la tabla organizations
      const finalData = {
        ...organizationData,
        manager_id: userId,
      };

      const response = await postData("organizations/", finalData);

      if (!response.ok) {
        toast.error("Error al registrar la organización. Inténtalo de nuevo.");
        return;
      }

      toast.success("¡Organización registrada exitosamente!");
      setTimeout(() => navigate("/auth-user"), 1500); // Redirigir al login

    } catch (error) {
      console.error('Error:', error);
      toast.error("Error de conexión. Inténtalo de nuevo.");
    }
  };

  // ESTILOS para inputs
  const inputStyle = {
    height: 48,
    borderRadius: "10px",
    background: "#f8fcf9",
    "& fieldset": { borderColor: "#cfe7d7" },
  };

  return (
    <Box
      sx={{
        maxWidth: "600px",
        mx: "auto",
        py: 6,
        px: 3,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* HEADER */}
        <Box textAlign="center" mb={5}>
          <Typography
            sx={{
              fontSize: "34px",
              fontWeight: 900,
              color: "#0d1b12",
              mb: 1,
            }}
          >
            Configuración de Organización
          </Typography>

          <Typography
            sx={{
              fontSize: "16px",
              color: "#2A9D8F",
            }}
          >
            Completa la información de tu organización para finalizar el registro.
          </Typography>
        </Box>

        {/* INFORMACIÓN ORGANIZACIONAL */}
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#0d1b12",
            mb: 3,
          }}
        >
          Información Organizacional
        </Typography>

        <Grid container spacing={3} justifyContent="space-between">
          {/* Nombre de la organización */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Nombre de la organización
            </Typography>
            <TextField
              fullWidth
              placeholder="Nombre de tu organización"
              name="organization_name"
              value={organizationData.organization_name}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Tipo de organización */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Tipo de organización
            </Typography>
            <FormControl fullWidth>
              <Select
                name="organization_type"
                value={organizationData.organization_type}
                onChange={handleInputChange}
                sx={inputStyle}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Selecciona el tipo
                </MenuItem>
                <MenuItem value="ONG">ONG</MenuItem>
                <MenuItem value="Fundación">Fundación</MenuItem>
                <MenuItem value="Empresa Social">Empresa Social</MenuItem>
                <MenuItem value="Cooperativa">Cooperativa</MenuItem>
                <MenuItem value="Otra">Otra</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* RUC/Tax ID */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              RUC/Tax ID
            </Typography>
            <TextField
              fullWidth
              placeholder="Número de identificación fiscal"
              name="tax_id"
              value={organizationData.tax_id}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Sitio web */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Sitio web (opcional)
            </Typography>
            <TextField
              fullWidth
              placeholder="https://tu-organizacion.com"
              name="website"
              value={organizationData.website}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Años de experiencia */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Años de experiencia
            </Typography>
            <FormControl fullWidth>
              <Select
                name="experience_years"
                value={organizationData.experience_years}
                onChange={handleInputChange}
                sx={inputStyle}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Selecciona los años
                </MenuItem>
                <MenuItem value="0-1">0-1 años</MenuItem>
                <MenuItem value="2-5">2-5 años</MenuItem>
                <MenuItem value="6-10">6-10 años</MenuItem>
                <MenuItem value="10+">Más de 10 años</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Área de enfoque */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Área de enfoque
            </Typography>
            <FormControl fullWidth>
              <Select
                name="focus_area"
                value={organizationData.focus_area}
                onChange={handleInputChange}
                sx={inputStyle}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Selecciona el área
                </MenuItem>
                <MenuItem value="Educación">Educación</MenuItem>
                <MenuItem value="Salud">Salud</MenuItem>
                <MenuItem value="Medio Ambiente">Medio Ambiente</MenuItem>
                <MenuItem value="Desarrollo Comunitario">Desarrollo Comunitario</MenuItem>
                <MenuItem value="Tecnología">Tecnología</MenuItem>
                <MenuItem value="Arte y Cultura">Arte y Cultura</MenuItem>
                <MenuItem value="Otra">Otra</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* BOTÓN */}
        <Button
          fullWidth
          type="submit"
          sx={{
            mt: 5,
            height: 56,
            background: "#2A9D8F",
            color: "#ffffff",
            fontWeight: 700,
            borderRadius: "10px",
            textTransform: "none",
            "&:hover": { background: "#02695dff" },
          }}
        >
          Finalizar registro de organización
        </Button>

        <ToastContainer closeButton draggable autoClose={1300} />
      </form>
    </Box>
  );
}