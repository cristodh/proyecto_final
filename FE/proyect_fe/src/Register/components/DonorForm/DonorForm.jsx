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

import { postData } from "../../../services/fetch";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function DonorForm() {
  const navigate = useNavigate();

  // Regex de contraseña segura
  const regex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]).{8,}$/;

  // Estados
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

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    for (let field in formData) {
      if (formData[field].trim() === "") {
        toast.error("Por favor, complete todos los campos.");
        return;
      }
    }

    if (!acceptedTerms) {
      toast.error("Debes aceptar los términos y condiciones.");
      return;
    }

    if (!regex.test(formData.password)) {
      toast.error(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    const response = await postData("user/new_users/", formData);

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
            Registro de Donante
          </Typography>

          <Typography
            sx={{
              fontSize: "16px",
              color: "# ",
            }}
          >
            Únete a nuestra comunidad y apoya proyectos que transforman vidas.
          </Typography>
        </Box>

        {/* FORMULARIO */}
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

          {/* Fecha */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500 }}>
              Fecha de nacimiento
            </Typography>
            <TextField
              type="date"
              fullWidth
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Cédula */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500 }}>
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
            <Typography sx={{ pb: 1, fontWeight: 500 }}>Nacionalidad</Typography>
            <TextField
              fullWidth
              placeholder="Tu nacionalidad"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Dirección */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500 }}>Dirección</Typography>
            <TextField
              fullWidth
              placeholder="Tu dirección"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Género */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500 }}>Género</Typography>
            <FormControl fullWidth>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                displayEmpty
                sx={{
                  height: 48,
                  borderRadius: "10px",
                  background: "#f8fcf9",
                  borderColor: "#cfe7d7",
                }}
              >
                <MenuItem value="">Selecciona tu género</MenuItem>
                <MenuItem value="Femenino">Femenino</MenuItem>
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
                <MenuItem value="Prefiero no decirlo">
                  Prefiero no decirlo
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Username */}
          <Grid item xs={12} sm={5.8}>
            <Typography sx={{ pb: 1, fontWeight: 500 }}>
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

          {/* Contraseña */}
          <Grid item xs={12}>
            <Typography sx={{ pb: 1, fontWeight: 500 }}>Contraseña</Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="Crea una contraseña segura"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>

          {/* Confirmación */}
          <Grid item xs={12}>
            <Typography sx={{ pb: 1, fontWeight: 500 }}>
              Confirmar contraseña
            </Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="Vuelve a escribir la contraseña"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              InputProps={{ sx: inputStyle }}
            />
          </Grid>
        </Grid>

        {/* Checkbox */}
        <FormControlLabel
          sx={{ mt: 3 }}
          control={
            <Checkbox
              sx={{ color: "#179e44" }}
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
            />
          }
          label={
            <Typography sx={{ fontSize: "14px", color: "#179e44" }}>
              Acepto los{" "}
              <span style={{ color: "#179e44", fontWeight: 600 }}>
                Términos de Servicio
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
          Crear mi cuenta
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
