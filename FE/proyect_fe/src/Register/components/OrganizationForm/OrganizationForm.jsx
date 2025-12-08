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

import { postData } from "../../../services/fetch";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function OrganizationForm() {
  const navigate = useNavigate();

  // Estados para la información organizacional únicamente
  const [organizationData, setOrganizationData] = useState({
    organization_name: "",
    organization_type: "",
    organization_type_other: "", // Campo adicional para cuando selecciona "Otra"
    tax_id: "", // Cédula Jurídica en Costa Rica
    website: "",
    experience_years: "",
    focus_area: "",
    legal_representative: "", // Representante legal
    legal_rep_id: "", // Cédula del representante
    phone: "", // Teléfono de contacto
    email: "", // Email oficial de la organización
    address: "", // Dirección física
    province: "", // Provincia en Costa Rica
    canton: "", // Cantón
    district: "", // Distrito
    description: "", // Descripción de la organización
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
      "experience_years", "focus_area", "legal_representative",
      "legal_rep_id", "phone", "email", "address", "province",
      "canton", "district"
    ];

    for (let field of requiredFields) {
      if (!organizationData[field].trim()) {
        toast.error(`Por favor, completa el campo: ${field.replace(/_/g, " ")}`);
        return false;
      }
    }

    // Validar que si selecciona "Otra", especifique el tipo
    if (organizationData.organization_type === "Otra" && !organizationData.organization_type_other.trim()) {
      toast.error("Por favor, especifica el tipo de organización");
      return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(organizationData.email)) {
      toast.error("Por favor, ingresa un email válido");
      return false;
    }

    // Validar formato de cédula jurídica (10 dígitos en Costa Rica)
    if (organizationData.tax_id.length !== 10) {
      toast.error("La cédula jurídica debe tener 10 dígitos");
      return false;
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
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        toast.error("Error de sesión. Por favor, vuelve a iniciar sesión.");
        navigate('/auth-user');
        localStorage.clear()
        return;
      }
      console.log(organizationData);
      

      // Preparar datos para envío a la tabla organizations
      const finalData = {
        organization_name: organizationData.organization_name,
        organization_type: organizationData.organization_type === "Otra" ? organizationData.organization_type_other : organizationData.organization_type,
        website: organizationData.website || "N/A",
        focus_area: organizationData.focus_area,
        manager: localStorage.getItem('userId'),
        address: organizationData.address,
        canton: organizationData.canton,
        description: organizationData.description || "N/A",
        district: organizationData.district,
        email: organizationData.email,
        experience_years: organizationData.experience_years,
        legal_rep_id: organizationData.legal_rep_id,
        legal_representative: organizationData.legal_representative,
        organization_type_other: organizationData.organization_type_other,
        phone: organizationData.phone,
        province:organizationData.province,
        tax_id: organizationData.tax_id
       };

      const response = await postData("organization/create_organization/", finalData);

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

          {/* Campo adicional cuando selecciona "Otra" */}
          {organizationData.organization_type === "Otra" && (
            <Grid item xs={12} sm={5.8}>
              <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
                Especifica el tipo de organización
              </Typography>
              <TextField
                fullWidth
                placeholder="Ej: Asociación sin fines de lucro"
                name="organization_type_other"
                value={organizationData.organization_type_other}
                onChange={handleInputChange}
                InputProps={{ sx: inputStyle }}
              />
            </Grid>
          )}

          {/* RUC/Tax ID */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Cédula Jurídica
            </Typography>
            <TextField
              fullWidth
              placeholder="Número de cédula jurídica"
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
              Años de fundación
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

          {/* Representante Legal */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Representante Legal
            </Typography>
            <TextField
              fullWidth
              placeholder="Nombre completo del representante"
              name="legal_representative"
              value={organizationData.legal_representative}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Cédula del Representante */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Cédula del Representante
            </Typography>
            <TextField
              fullWidth
              placeholder="Número de cédula"
              name="legal_rep_id"
              value={organizationData.legal_rep_id}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Teléfono */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Teléfono de Contacto
            </Typography>
            <TextField
              fullWidth
              placeholder="8888-8888"
              name="phone"
              value={organizationData.phone}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Email Oficial
            </Typography>
            <TextField
              fullWidth
              placeholder="contacto@organizacion.cr"
              name="email"
              type="email"
              value={organizationData.email}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Provincia */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Provincia
            </Typography>
            <FormControl fullWidth>
              <Select
                name="province"
                value={organizationData.province}
                onChange={handleInputChange}
                sx={inputStyle}
                displayEmpty
              >
                <MenuItem value="" disabled>Selecciona la provincia</MenuItem>
                <MenuItem value="San José">San José</MenuItem>
                <MenuItem value="Alajuela">Alajuela</MenuItem>
                <MenuItem value="Cartago">Cartago</MenuItem>
                <MenuItem value="Heredia">Heredia</MenuItem>
                <MenuItem value="Guanacaste">Guanacaste</MenuItem>
                <MenuItem value="Puntarenas">Puntarenas</MenuItem>
                <MenuItem value="Limón">Limón</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Cantón */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Cantón
            </Typography>
            <TextField
              fullWidth
              placeholder="Ej: San José, Escazú, etc."
              name="canton"
              value={organizationData.canton}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Distrito */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Distrito
            </Typography>
            <TextField
              fullWidth
              placeholder="Ej: Carmen, Merced, etc."
              name="district"
              value={organizationData.district}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Dirección física */}
          <Grid item xs={12}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Dirección Física
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Dirección exacta de la organización"
              name="address"
              value={organizationData.address}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Descripción */}
          <Grid item xs={12}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Descripción de la Organización (opcional)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Describe brevemente la misión y visión de tu organización..."
              name="description"
              value={organizationData.description}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
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