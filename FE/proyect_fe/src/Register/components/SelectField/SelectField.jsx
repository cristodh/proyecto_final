// src/components/SelectField.jsx
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

export default function SelectField({ label, options }) {
  return (
    <FormControl fullWidth>
      <Typography fontWeight={500} mb={1} color="#0d1b12">
        {label}
      </Typography>

      <Select
        defaultValue=""
        displayEmpty
        sx={{
          background: "#f8fcf9",
          borderRadius: "8px",
          "& fieldset": { borderColor: "#cfe7d7 !important" },
        }}
      >
        <MenuItem value="">
          <em>Selecciona tu género</em>
        </MenuItem>

        {options.map((op) => (
          <MenuItem key={op} value={op}>
            {op}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
