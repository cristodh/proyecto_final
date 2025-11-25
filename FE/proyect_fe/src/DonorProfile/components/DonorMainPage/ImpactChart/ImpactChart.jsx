// src/components/ImpactChart.jsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/**
 * Simple bar chart made with divs. Accepts `data` array of {label, value} where value is 0..100
 * It's intentionally lightweight so you don't need chart libs.
 */
export default function ImpactChart({ data = [
  { label: "Sep", value: 30 },
  { label: "Oct", value: 50 },
  { label: "Nov", value: 80 },
  { label: "Dec", value: 40 },
  { label: "Ene", value: 60 },
  { label: "Feb", value: 20 }
] }) {
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, alignItems: "end", height: 200 }}>
        {data.map((d) => (
          <Box key={d.label} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <Box sx={{
              width: "60%",
              height: `${d.value}%`,
              bgcolor: "primary.main",
              borderRadius: 1,
              transition: "all .25s",
              alignSelf: "stretch"
            }} />
            <Typography variant="caption" color="text.secondary">{d.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
