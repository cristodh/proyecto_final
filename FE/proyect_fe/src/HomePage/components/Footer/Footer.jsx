// src/components/Footer.jsx
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box component="footer" sx={{ background: "linear-gradient(135deg, #1E3A8A 0%, #1e40af 100%)", color: "white", py: 3, mt: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
            © 2025 Justify. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
