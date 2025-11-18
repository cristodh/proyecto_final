// components/DividerWithText.jsx
import { Box, Divider, Typography } from "@mui/material";

export default function DividerWithText({ text }) {
  return (
    <Box display="flex" alignItems="center" gap={2} my={2}>
      <Divider sx={{ flex: 1 }} />
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
      <Divider sx={{ flex: 1 }} />
    </Box>
  );
}
