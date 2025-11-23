// src/components/TermsCheckbox.jsx
import { Checkbox, FormControlLabel, Typography } from "@mui/material";

export default function TermsCheckbox() {
  return (
    <FormControlLabel
      control={<Checkbox sx={{ color: "#179e44" }} />}
      sx={{ mt: 2 }}
      label={
        <Typography fontSize=".9rem" color="#4c9a66">
          Acepto los <strong style={{ color: "#179e44" }}>Términos de Servicio</strong> y la{" "}
          <strong style={{ color: "#179e44" }}>Política de Privacidad</strong>.
        </Typography>
      }
    />
  );
}
