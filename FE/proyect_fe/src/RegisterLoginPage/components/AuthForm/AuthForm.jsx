// ============================================================
// IMPORTS Y DEPENDENCIAS
// ============================================================
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
import { useState } from "react";
import { postData } from "../../../services/fetch";
import { useNavigate } from "react-router-dom";

// ============================================================
// CONSTANTES - MAPEO DE ROLES
// ============================================================
const ROLE_ROUTES = {
  1: "/manager_profile/main",    // Gestor de Campañas
  2: "/donor_profile/main",       // Donor
};

const ROLE_NAMES = {
  3: "pendiente de aprobación",
  4: "denegado",
};

// ============================================================
// COMPONENTE FORMULARIO DE AUTENTICACIÓN
// ============================================================
/**
 * AuthForm
 * Componente para login y registro de usuarios
 * Valida roles y redirige según permisos
 * 
 * @param {string} mode - 'login' o 'register'
 * @param {Function} onTabChange - Callback para cambiar tab
 */
export default function AuthForm({ mode, onTabChange }) {
  // ============================================================
  // ESTADOS
  // ============================================================
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  // ============================================================
  // FUNCIONES DE VALIDACIÓN
  // ============================================================
  /**
   * Valida el role_id del usuario después del login
   * @param {number} roleId - ID del rol del usuario
   * @returns {Object} - { isValid: boolean, message: string }
   */
  const validateUserRole = (roleId) => {
    // Admin no puede usar login normal
    if (roleId === 5) {
      return {
        isValid: false,
        message: "Los administradores deben usar el login de admin",
      };
    }

    // Pendiente de aprobación o Denegado
    if (roleId === 3 || roleId === 4) {
      return {
        isValid: false,
        message: `Tu cuenta está ${ROLE_NAMES[roleId]}. No puedes iniciar sesión.`,
      };
    }

    return { isValid: true };
  };

  /**
   * Obtiene la ruta según el role_id
   * @param {number} roleId - ID del rol
   * @returns {string} - Ruta de redirección
   */
  const getRouteByRole = (roleId) => {
    return ROLE_ROUTES[roleId] || "/donor_profile/main";
  };

  // ============================================================
  // FUNCIONES DE MANEJO
  // ============================================================
  /**
   * Maneja el login del usuario
   * Valida rol, guarda datos y redirige según permisos
   */
  async function handleLogin(e) {
    e.preventDefault();
    const userObj = {
      username: username,
      password: password,
    };

    const response = await postData("user/login/", userObj);

    if (response.message === "Login successful") {
      const roleId = response.role_id;

      // Validar role_id
      const validation = validateUserRole(roleId);
      if (!validation.isValid) {
        setAlert({ open: true, message: validation.message, severity: "error" });
        return;
      }

      // Login exitoso - guardar datos
      setAlert({ open: true, message: "Login Exitoso", severity: "success" });
      localStorage.setItem("id", response.id);
      localStorage.setItem("token", response.token);
      localStorage.setItem("role_id", roleId);

      // Redirigir según rol
      const route = getRouteByRole(roleId);
      setTimeout(() => navigate(route), 1500);
    } else {
      setAlert({ open: true, message: "Correo y/o contraseña invalidos", severity: "error" });
    }
    console.log(response);
  }

  // ============================================================
  // RENDERIZADO JSX
  // ============================================================
  return (
    <Box component="form" display="flex" flexDirection="column" gap={3} onSubmit={handleLogin}>
      {/* ========================================================
          SECCIÓN DE LOGIN
          ======================================================== */}
      {mode === "login" && (
        <Box>
          {/* Campo: Nombre de usuario */}
          <TextField
            label="Nombre de usuario"
            type="text"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Campo: Contraseña */}
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Contraseña"
            type={showPass ? "text" : "password"}
            fullWidth
            required
            sx={{ mt: 2 }}
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

          {/* Link: Recuperar contraseña */}
          <Typography
            variant="body2"
            mt={2}
            color="primary"
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => {
              navigate("/semeolvidolaclaveyporesoquierorecuperarlasesuponequemevaallegaruncorreo");
            }}
          >
            ¿Olvidaste tu contraseña?
          </Typography>
        </Box>
      )}

      {/* ========================================================
          BOTÓN DE ENVÍO - LOGIN
          ======================================================== */}
      {mode === "login" && (
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ mt: 1 }}
        >
          Iniciar Sesión
        </Button>
      )}

      {/* ========================================================
          SECCIÓN DE NAVEGACIÓN - LOGIN
          ======================================================== */}
      {mode === "login" && (
        <Typography variant="body2" textAlign="center">
          ¿No tienes una cuenta?{" "}
          <strong
            style={{
              cursor: "pointer",
              color: "#1976d2",
              textDecoration: "underline",
            }}
            onClick={() => onTabChange && onTabChange(1)}
          >
            Regístrate aquí
          </strong>
        </Typography>
      )}

      {/* ========================================================
          SECCIÓN DE NAVEGACIÓN - REGISTRO
          ======================================================== */}
      {mode === "register" && (
        <Typography variant="body2" textAlign="center">
          ¿Ya tienes una cuenta?{" "}
          <strong
            style={{
              cursor: "pointer",
              color: "#1976d2",
              textDecoration: "underline",
            }}
            onClick={() => onTabChange && onTabChange(0)}
          >
            Inicia sesión aquí
          </strong>
        </Typography>
      )}

      {/* ========================================================
          ALERTA DE FEEDBACK
          ======================================================== */}
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
