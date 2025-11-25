import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Divider,
  Avatar,
} from "@mui/material";
import LinkOffIcon from '@mui/icons-material/LinkOff';
import logoFundify from "../../imgs/LogoFundifyClose.png";

export default function FundifyNotFoundPage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0f1b1a' : '#f6f8f8',
        color: (theme) => theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top header */}
      <Box
        component="header"
        sx={{
          py: 3,
          px: { xs: 2, sm: 4 },
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src={logoFundify} 
            alt="Fundify logo" 
            style={{ 
              width: "auto", 
              height: "100px"
            }} 
          />
        </Container>
      </Box>

      {/* Center content */}
      <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Paper elevation={0} sx={{ width: '100%', p: { xs: 4, sm: 8 }, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 3 }}>
            <Box sx={{ bgcolor: 'transparent', borderRadius: '50%', p: 1 }}>
              <LinkOffIcon sx={{ fontSize: 80, color: '#2A9D8F', opacity: 0.9 }} />
            </Box>

            <Box sx={{ maxWidth: 520 }}>
              <Typography component="h1" variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
                ¡Oops! Página No Encontrada
              </Typography>
              <Typography variant="body1" color="text.secondary">
                La página que buscas ya no está aquí o el enlace es incorrecto. ¡Pero no te preocupes, te ayudamos a reencontrar el camino!
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2, width: { xs: '100%', sm: 'auto' } }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#2A9D8F',
                  '&:hover': { bgcolor: '#02695dff' },
                  minWidth: 200,
                  px: 3,
                  py: 1.5,
                  fontWeight: 700,
                }}
                href="/"
              >
                Volver a la Página Principal
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderColor: 'rgba(42,157,143,0.25)',
                  color: 'text.primary',
                  minWidth: 200,
                  px: 3,
                  py: 1.5,
                  fontWeight: 700,
                }}
                href="/projects"
              >
                Explorar Proyectos
              </Button>
            </Stack>

          </Box>
        </Paper>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
        <Container maxWidth="lg" sx={{ borderTop: '1px solid', borderColor: (t) => t.palette.divider, pt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">© 2025 Fundify. Todos los derechos reservados.</Typography>
         
        </Container>
      </Box>
    </Box>
  );
}
