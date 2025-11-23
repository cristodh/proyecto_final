// components/AuthForm.jsx
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
import { postData } from "../../../Register/services/fetch";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ mode }) {
  const [showPass, setShowPass] = useState(false);
  
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' })
  const navigate = useNavigate() // navigate siempre se llama arriba de todo

  async function handleLogin(e){
    e.preventDefault()
    const userObj = {
      'username': username,
      'password': password
    }

    const response = await postData('user/login/', userObj)
    if (response.message === 'Login successful') {
      setAlert({ open: true, message: 'Login Exitoso', severity: 'success' })
      localStorage.setItem('id', response.id)
      setTimeout(() => navigate("/donor_profile/donation_history"), 1500)
    } else {
      setAlert({ open: true, message: 'Correo y/o contraseña invalidos', severity: 'error' })
    }
    console.log(response)
  }

  return (
    <Box component="form" display="flex" flexDirection="column" gap={3}>

      {mode === "login" && (
        <Box>
          <TextField
            label="Correo electrónico"
            type="email"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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

          <Typography
            variant="body2"
            mt={2}
            color="primary"
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => {
              navigate('/semeolvidolaclaveyporesoquierorecuperarlasesuponequemevaallegaruncorreo')
            }}
          >
            ¿Olvidaste tu contraseña?
          </Typography>
        </Box>
      )}

      {mode === "login" && (
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 1 }}
          onClick={handleLogin}
        >
          Iniciar Sesión
        </Button>
      )}

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

      <Snackbar 
        open={alert.open} 
        autoHideDuration={3000} 
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setAlert({ ...alert, open: false })} 
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
