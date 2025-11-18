// src/components/Footer.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "background.default", borderTop: 1, borderColor: "divider", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={6} md={3}>
            <Typography variant="overline">Fundify</Typography>
            <Box sx={{ mt: 1 }}>
              <Link display="block" href="#">Sobre Nosotros</Link>
              <Link display="block" href="#">Contacto</Link>
              <Link display="block" href="#">FAQs</Link>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="overline">Legal</Typography>
            <Box sx={{ mt: 1 }}>
              <Link display="block" href="#">Términos y Condiciones</Link>
              <Link display="block" href="#">Política de Privacidad</Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="overline">Síguenos</Typography>
            <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
              <Link href="#" aria-label="Facebook">Facebook</Link>
              <Link href="#" aria-label="Twitter">Twitter</Link>
              <Link href="#" aria-label="Instagram">Instagram</Link>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" color="text.secondary">© 2024 Fundify. Todos los derechos reservados.</Typography>
        </Box>
      </Container>
    </Box>
  );
}
