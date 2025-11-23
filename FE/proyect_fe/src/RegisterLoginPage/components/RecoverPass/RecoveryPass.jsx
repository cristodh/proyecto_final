import { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
} from "@mui/material";
import { getData } from "../../../Register/services/fetch";
import { ToastContainer, toast } from "react-toastify";

export default function RecoveryPass() {

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false) // Me dice si el correo se envió o no.
  const [user, setUser] = useState([]) // Guardamos los usuarios filtrados
  const [emailUser, setEmailUser] = useState("") // Estado para el texto del correo
  const [availableUser, setAvailableUser] = useState(false) // Si el usuario existe o no


  useEffect(() => {
    async function getUser() { // ejecutamos la funcion get 
      try {
        if(emailUser.trim() === '') {
          toast.error("Por favor ingresa un correo electrónico.");
          return;
        }
        const response = await getData('user/new_users/') // apuntamos al endpoint de usuarios
        const filterUser = response.filter((u) => u.email === emailUser); // filtrarmos los usuarios con el correo que se puso en el input
        setUser(filterUser); // dentro del estado, se guarda a ese usuario
        if (filterUser.length > 0) { // si hay mas de 0 usuarios, ponemos el estado como verdadero (porque el usuario existe en la db)
          setAvailableUser(true);
        } else {
          setAvailableUser(false); // si no, falso (no existe en la db)
        }
      }
      catch (error) {
        console.error('Error:', error)
        alert('El usuario no existe') // error de servidor
      }
    }
    getUser();
  }, [emailUser])

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // codigo aleatorio de 6 digitos
  };

  const sendEmail = (e) => {
    if (!availableUser) {
      toast.error("El usuario no existe.");
      return;
    } // validacion que el usuario exista
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const code = generateCode();

    const params = {
      email: email,
      nombreUsuario: user[0].username,
      codigo: code,
    };

    emailjs
      .send(
        "service_e4zeo46",
        "template_a5inohb",
        params,
        "0OCzD-TBNJGF09KlH"
      )
      .then(() => {
        setSent(true);
        setLoading(false);
        e.target.reset();
      })
      .catch(() => {
        setLoading(false);
        alert("Error enviando el correo");
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "#F8F9FA",
        color: "#333",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Container maxWidth="sm">
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#2A9D8F"
            letterSpacing={-0.5}
          >
            Fundify
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ borderRadius: 3, p: { xs: 3, sm: 4 } }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1}>
            Recuperar tu Contraseña
          </Typography>

          <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
            No te preocupes, te ayudaremos a recuperarla en un momento.
          </Typography>

          {/* 🔥 FORMULARIO */}
          <Box component="form" onSubmit={sendEmail} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Correo Electrónico"
              name="email"
              type="email"
              value={emailUser}
              onChange={(e) => setEmailUser(e.target.value)}
              fullWidth
              variant="outlined"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                bgcolor: "#2A9D8F",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#70efe0ff" },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Enviar Enlace de Recuperación"}
            </Button>
          </Box>

          {sent && (
            <Typography textAlign="center" mt={2} color="green" fontWeight="540">
              ¡Correo enviado correctamente! <br />
              <span>Recuerda revisar la carpeta de spam o correo no deseado.</span>
            </Typography>
          )}

          <Typography variant="body2" color="text.secondary" textAlign="center" mt={3}>
            Te enviaremos un correo electrónico con las instrucciones para restablecer tu contraseña.
          </Typography>

          <Box textAlign="center" mt={2}>
            <Link href="/auth-user" underline="hover" color="#2A9D8F" fontWeight="500">
              Volver a Iniciar Sesión
            </Link>
          </Box>
        </Paper>
      </Container>
      <ToastContainer closeButton draggable autoClose={1300} />

    </Box>
  );
}
