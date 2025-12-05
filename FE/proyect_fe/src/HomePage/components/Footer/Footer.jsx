// src/components/Footer.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

export default function Footer() {
  return (
    <Box component="footer" sx={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f8fafc 50%, #f1f5f9 75%, #f0f9ff 100%)", borderTop: 1, borderColor: "divider", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={6} md={3}>
            <Typography variant="overline">Fundify</Typography>
            <Box sx={{ mt: 1 }}>
              <Link display="block" href="#">Sobre Nosotros</Link>
              <Link display="block" href="#">Contacto</Link>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="overline">Legal</Typography>
            <Box sx={{ mt: 1 }}>
              <Link display="block" href="#">Términos y Condiciones</Link>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" color="text.secondary">© 2025 Fundify. Todos los derechos reservados.</Typography>
        </Box>
      </Container>
    </Box>
  );
}
