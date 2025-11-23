// src/components/InputField.jsx
import { TextField, FormControl, Typography } from "@mui/material";

export default function InputField({ label, placeholder, type = "text", fullWidth = true }) {
  return (
    <FormControl fullWidth={fullWidth}>
      <Typography fontWeight={500} mb={1} color="#0d1b12">
        {label}
      </Typography>

      <TextField
        placeholder={placeholder}
        type={type}
        fullWidth
        InputProps={{
          sx: {
            background: "#f8fcf9",
            borderRadius: "8px",
            color: "#0d1b12",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#cfe7d7",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#179e44",
            },
          },
        }}
      />
    </FormControl>
  );
}
