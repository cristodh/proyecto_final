import './LoginForm.css';
import { Box, Typography, TextField, Button, Link } from '@mui/material';

export default function LoginForm() {
  return (
    <Box className="login-form" sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Te damos la bienvenida</Typography>
      <TextField fullWidth label="Usuario" variant="outlined" margin="normal" />
      <TextField fullWidth label="Contraseña" type="password" variant="outlined" margin="normal" />
      <Link href="#" underline="hover" className="forgot">¿Has olvidado tu contraseña?</Link>
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Registro</Button>
    </Box>
  );
}
