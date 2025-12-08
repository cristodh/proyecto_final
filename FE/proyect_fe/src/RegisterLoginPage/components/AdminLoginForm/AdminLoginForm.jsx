import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { postData } from "../../../services/fetch";
import { useNavigate } from "react-router-dom";

export default function AdminLoginForm({ onBack }) {
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  async function handleAdminLogin(e) {
    e.preventDefault();
    const adminObj = {
      username: username,
      password: password,
    };

    const response = await postData("user/admin_login/", adminObj);
    if (response.message === "Admin login successful") {
      setAlert({
        open: true,
        message: "Login de Admin Exitoso",
        severity: "success",
      });
      localStorage.setItem("id", response.id);
      localStorage.setItem("token", response.token);
      localStorage.setItem("isAdmin", "true");
      setTimeout(() => navigate("/admin/dashboard"), 1500);
    } else if (response.message === "User is not an administrator") {
      setAlert({
        open: true,
        message: "Este usuario no es administrador",
        severity: "error",
      });
    } else {
      setAlert({
        open: true,
        message: "Usuario y/o contraseña inválidos",
        severity: "error",
      });
    }
  }

  return (
    <Box component="form" display="flex" flexDirection="column" gap={3} onSubmit={handleAdminLogin}>
      {/* Botón de regreso */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <IconButton 
          onClick={onBack} 
          sx={{ p: 0 }}
          title="Volver al login normal"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          Volver
        </Typography>
      </Box>

      <Typography
        variant="h6"
        fontWeight={700}
        textAlign="center"
        color="primary"
        sx={{ mb: 2 }}
      >
        Portal de Administración
      </Typography>

      <TextField
        label="Nombre de usuario"
        type="text"
        fullWidth
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Ingresa tu usuario de admin"
      />

      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Contraseña"
        type={showPass ? "text" : "password"}
        fullWidth
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPass(!showPass)} edge="end">
                <Visibility />
              </IconButton>
            </InputAdornment>
          ),
        }}
        placeholder="Ingresa tu contraseña"
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ mt: 1 }}
      >
        Entrar como Admin
      </Button>

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
