// components/AuthForm.jsx
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import { useState } from "react";

export default function AuthForm({ mode }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <Box component="form" display="flex" flexDirection="column" gap={3}>
      <TextField
        label="Correo electrónico"
        type="email"
        fullWidth
        required
      />

      <Box>
        <TextField
          label="Contraseña"
          type={showPass ? "text" : "password"}
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPass(!showPass)}>
                  <Visibility />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {mode === "login" && (
          <Typography
            variant="body2"
            mt={1}
            color="primary"
            sx={{ cursor: "pointer", textDecoration: "underline" }}
          >
            ¿Olvidaste tu contraseña?
          </Typography>
        )}
      </Box>

      <Button
        variant="contained"
        size="large"
        sx={{ mt: 1 }}
      >
        {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
      </Button>

      {mode === "login" && (
        <Typography variant="body2" textAlign="center">
          ¿No tienes una cuenta?{" "}
          <strong>Regístrate aquí</strong>
        </Typography>
      )}
      {mode === "register" && (
        <Typography variant="body2" textAlign="center">
          ¿Ya tienes una cuenta?{" "}
          <strong>Inicia sesión aquí</strong>
        </Typography>
      )}
    </Box>
  );
}
