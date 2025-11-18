// src/components/SearchBar.jsx
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function SearchBar({ placeholder = "¿Qué proyecto quieres apoyar?" }) {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box component="form" sx={{
      display: "flex",
      width: "100%",
      maxWidth: 680,
      borderRadius: 2,
      overflow: "hidden",
      boxShadow: 3,
      bgcolor: "background.paper"
    }} onSubmit={(e) => e.preventDefault()}>
      <TextField
        variant="standard"
        fullWidth
        placeholder={placeholder}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="disabled" />
            </InputAdornment>
          ),
          sx: { px: 2, py: isSmUp ? 1.5 : 1 }
        }}
      />
      <Button type="submit" variant="contained" sx={{
        borderRadius: 0,
        px: isSmUp ? 3 : 2,
      }}>
        Buscar
      </Button>
    </Box>
  );
}
