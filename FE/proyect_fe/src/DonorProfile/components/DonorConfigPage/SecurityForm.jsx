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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (values.newPassword !== values.confirmPassword) {
      alert("La nueva contraseña no coincide con la confirmación.");
      return;
    }

    console.log("Guardando nueva contraseña...");
    // Aquí iría tu fetch al backend
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
    </Paper>
  );
};

export default SecurityForm;
