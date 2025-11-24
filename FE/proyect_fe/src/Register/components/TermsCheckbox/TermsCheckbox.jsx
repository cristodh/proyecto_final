// src/components/TermsCheckbox.jsx
import { Checkbox, FormControlLabel, Typography } from "@mui/material";

export default function TermsCheckbox() {
  return (
    <FormControlLabel
      control={<Checkbox sx={{ color: "#2A9D8F" }} />}
      sx={{ mt: 2 }}
      label={
        <Typography fontSize=".9rem" color="#2A9D8F">
          Acepto los <strong style={{ color: "#2A9D8F" }}>Términos de Servicio</strong> y la{" "}
          <strong style={{ color: "#2A9D8F" }}>Política de Privacidad</strong>.
        </Typography>
      }
    />
  );
}
