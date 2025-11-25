// src/components/CTASection.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function CTASection() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Box sx={{
          bgcolor: (t) => `${t.palette.primary.main}15`,
          border: "1px solid",
          borderColor: (t) => `${t.palette.primary.main}30`,
          p: { xs: 4, sm: 6 },
          borderRadius: 3,
          textAlign: "center"
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600, 
              color: "text.primary", 
              mb: 2,
              fontSize: { xs: "1.75rem", md: "2rem" }
            }}
          >
            ¿Listo para ser parte del cambio?
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 4,
              maxWidth: 500,
              mx: "auto",
              lineHeight: 1.6
            }}
          >
            Únete a nuestra comunidad de creadores y donantes que están construyendo un futuro mejor. Tu próxima gran idea o tu próxima contribución están a solo un clic de distancia.
          </Typography>
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2} 
            justifyContent="center"
            sx={{ alignItems: "center" }}
          >
            <Button 
              variant="contained" 
              size="large"
              sx={{
                minWidth: { xs: "100%", sm: 200 },
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600
              }}
            >
              Crea tu Proyecto Ahora
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{
                minWidth: { xs: "100%", sm: 200 },
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600
              }}
            >
              Explora Proyectos
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
