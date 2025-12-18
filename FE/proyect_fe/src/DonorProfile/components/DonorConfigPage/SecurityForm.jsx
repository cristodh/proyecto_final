import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Grid,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { changePassword } from "../../../services/authService";

const SecurityForm = () => {
  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (values.newPassword !== values.confirmPassword) {
      setAlert({ open: true, message: "La nueva contraseña no coincide con la confirmación", severity: "error" });
      return;
    }

    if (values.newPassword.length < 8) {
      setAlert({ open: true, message: "La contraseña debe tener al menos 8 caracteres", severity: "error" });
      return;
    }

    try {
      const userId = localStorage.getItem('id');
      const response = await changePassword(userId, values.currentPassword, values.newPassword);
      
      if (response.success) {
        setAlert({ open: true, message: "Contraseña actualizada exitosamente", severity: "success" });
        setValues({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        const errorMessage = response.errors ? response.errors.join(", ") : "Error al cambiar la contraseña. Verifica tu contraseña actual";
        setAlert({ open: true, message: errorMessage, severity: "error" });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setAlert({ open: true, message: "Error al cambiar la contraseña", severity: "error" });
    }
  };

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 4,
        border: "1px solid",
        borderColor: (t) =>
          t.palette.mode === "light" ? "grey.200" : "grey.800",
        bgcolor: (t) =>
          t.palette.mode === "light" ? "white" : t.palette.grey[900],
      }}
      elevation={0}
    >
      {/* Título */}
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          mb: 3,
          color: (t) =>
            t.palette.mode === "light"
              ? t.palette.text.primary
              : t.palette.grey[100],
        }}
      >
        Seguridad
      </Typography>

      {/* Formulario */}
      <Grid container spacing={3}>
        {/* Contraseña actual */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Contraseña actual"
            name="currentPassword"
            type={show.current ? "text" : "password"}
            value={values.currentPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShow({ ...show, current: !show.current })
                    }
                  >
                    {show.current ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Nueva contraseña */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nueva contraseña"
            name="newPassword"
            type={show.new ? "text" : "password"}
            value={values.newPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShow({ ...show, new: !show.new })}
                  >
                    {show.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Confirmar nueva contraseña */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Confirmar nueva contraseña"
            name="confirmPassword"
            type={show.confirm ? "text" : "password"}
            value={values.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShow({ ...show, confirm: !show.confirm })
                    }
                  >
                    {show.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      {/* Botón */}
      <Box textAlign="right" mt={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          sx={{ borderRadius: 3, px: 4, py: 1.2 }}
        >
          Guardar Cambios
        </Button>
      </Box>

      {/* Snackbar para alertas */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default SecurityForm;
