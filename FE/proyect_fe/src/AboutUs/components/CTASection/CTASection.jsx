// src/components/CTASection.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function CTASection() {
  return (
    <Box component="section" sx={{ py: 6 }}>
      <Container maxWidth="md">
        <Box sx={{
          bgcolor: (t) => `${t.palette.primary.main}20`,
          p: { xs: 4, sm: 6 },
          borderRadius: 2,
          textAlign: "center"
        }}>
          <Typography variant="h5" sx={{ fontWeight: 900, color: "text.primary", mb: 1 }}>
            ¿Listo para ser parte del cambio?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Únete a nuestra comunidad de creadores y donantes que están construyendo un futuro mejor. Tu próxima gran idea o tu próxima contribución están a solo un clic de distancia.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button variant="contained" size="large">Crea tu Proyecto Ahora</Button>
            <Button variant="outlined" size="large">Explora Proyectos</Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
