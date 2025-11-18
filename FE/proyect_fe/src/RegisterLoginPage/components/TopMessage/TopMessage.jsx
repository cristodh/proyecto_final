// components/TopMessage.jsx
import { Box, Typography } from "@mui/material";

export default function TopMessage() {
  return (
    <Box textAlign="center">
      <Typography
        variant="h4"
        fontWeight={900}
        color="secondary"
        sx={{ letterSpacing: "-0.03em" }}
      >
        Bienvenido a Fundify
      </Typography>
      <Typography variant="body1" color="primary" mt={1}>
        Un puente para transformar comunidades
      </Typography>
    </Box>
  );
}
