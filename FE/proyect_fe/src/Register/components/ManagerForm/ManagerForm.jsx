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
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { postData } from "../../services/fetch";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ManagerForm() {
  const navigate = useNavigate();

  // Regex de contraseña segura
  const regex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]).{8,}$/;

  // Estados específicos para gestores de proyectos
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    goverment_ID: "",
    nationality: "",
    address: "",
    gender: "",
    organization_name: "",
    organization_type: "",
    tax_id: "",
    website: "",
    experience_years: "",
    focus_area: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Manejador de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validaciones
  const validateForm = () => {
    const requiredFields = [
      "first_name", "last_name", "email", "phone_number", "date_of_birth",
      "goverment_ID", "nationality", "address", "gender", "organization_name",
      "organization_type", "tax_id", "experience_years", "focus_area", 
      "username", "password", "confirmPassword"
    ];

    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        toast.error(`Por favor, completa el campo: ${field.replace("_", " ")}`);
        return false;
      }
    }

    if (!regex.test(formData.password)) {
      toast.error(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo especial."
      );
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return false;
    }

    if (!acceptedTerms) {
      toast.error("Debes aceptar los términos y condiciones.");
      return false;
    }

    return true;
  };

  // Submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Preparar datos específicos para gestor
    const managerData = {
      ...formData,
      role: "manager" // Especificar rol de gestor
    };

    const response = await postData("user/new_manager/", managerData);

    if (!response.ok) {
      if (response.username) {
        toast.error("El nombre de usuario ya está en uso.");
        return;
      }
      if (response.email) {
        toast.error("El correo electrónico ya está en uso.");
        return;
      }

      toast.error("Error en el registro. Inténtalo de nuevo.");
      return;
    }

    toast.success("Registro exitoso");
    setTimeout(() => navigate("/auth-user"), 1200);
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
            Registro de Gestor de Proyectos
          </Typography>

          <Typography
            sx={{
              fontSize: "16px",
              color: "#2A9D8F",
            }}
          >
            Únete como gestor y crea proyectos que transformen vidas.
          </Typography>
        </Box>

        {/* FORMULARIO - INFORMACIÓN PERSONAL */}
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#0d1b12",
            mb: 3,
          }}
        >
          Información Personal
        </Typography>

        <Grid container spacing={3} justifyContent="space-between">
          {/* Nombre */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Nombre
            </Typography>
            <TextField
              fullWidth
              placeholder="Tu nombre"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Apellidos */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Apellidos
            </Typography>
            <TextField
              fullWidth
              placeholder="Tus apellidos"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Correo */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Correo electrónico
            </Typography>
            <TextField
              fullWidth
              placeholder="tunombre@ejemplo.com"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Teléfono */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500 }}>Teléfono</Typography>
            <TextField
              fullWidth
              placeholder="Tu número de teléfono"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Fecha nacimiento */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Fecha de nacimiento
            </Typography>
            <TextField
              fullWidth
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Cédula */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Cédula de identidad
            </Typography>
            <TextField
              fullWidth
              placeholder="Tu número de cédula"
              name="goverment_ID"
              value={formData.goverment_ID}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Nacionalidad */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Nacionalidad
            </Typography>
            <FormControl fullWidth>
              <Select
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                sx={inputStyle}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Selecciona tu nacionalidad
                </MenuItem>
                <MenuItem value="Costarricense">Costarricense</MenuItem>
                <MenuItem value="Estadounidense">Estadounidense</MenuItem>
                <MenuItem value="Mexicana">Mexicana</MenuItem>
                <MenuItem value="Española">Española</MenuItem>
                <MenuItem value="Otra">Otra</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Género */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Género
            </Typography>
            <FormControl fullWidth>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                sx={inputStyle}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Selecciona tu género
                </MenuItem>
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Femenino</MenuItem>
                <MenuItem value="O">Otro</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Dirección */}
          <Grid item xs={12}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Dirección
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Tu dirección completa"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>
        </Grid>

        {/* INFORMACIÓN ORGANIZACIONAL */}
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#0d1b12",
            mt: 4,
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
              value={formData.organization_name}
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
                value={formData.organization_type}
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
              value={formData.tax_id}
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
              value={formData.website}
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
                value={formData.experience_years}
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
                value={formData.focus_area}
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

        {/* INFORMACIÓN DE CUENTA */}
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#0d1b12",
            mt: 4,
            mb: 3,
          }}
        >
          Información de Cuenta
        </Typography>

        <Grid container spacing={3} justifyContent="space-between">
          {/* Username */}
          <Grid item xs={12}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Nombre de usuario
            </Typography>
            <TextField
              fullWidth
              placeholder="Elige un nombre de usuario"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Contraseña
            </Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="Tu contraseña segura"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Confirm Password */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500, color: "#0d1b12" }}>
              Confirmar contraseña
            </Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="Repite tu contraseña"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>
        </Grid>

        {/* TÉRMINOS Y CONDICIONES */}
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              sx={{ color: "#2A9D8F" }}
            />
          }
          sx={{ mt: 4, alignItems: "flex-start" }}
          label={
            <Typography sx={{ fontSize: "14px", lineHeight: 1.4, mt: 0.5 }}>
              Acepto los{" "}
              <span style={{ color: "#179e44", fontWeight: 600 }}>
                Términos y Condiciones
              </span>{" "}
              y la{" "}
              <span style={{ color: "#179e44", fontWeight: 600 }}>
                Política de Privacidad
              </span>
              .
            </Typography>
          }
        />

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
          Crear mi cuenta como gestor
        </Button>

        <Typography
          sx={{
            mt: 4,
            textAlign: "center",
            color: "#2A9D8F",
            fontSize: "14px",
          }}
        >
          ¿Ya tienes una cuenta?{" "}
          <span 
            style={{ 
              color: "#2A9D8F", 
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "underline"
            }}
            onClick={() => navigate("/auth-user")}
          >
            Inicia sesión
          </span>
        </Typography>

        <ToastContainer closeButton draggable autoClose={1300} />
      </form>
    </Box>
  );
}