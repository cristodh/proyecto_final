import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

export default function ManagerHeader() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Toolbar>
        {/* TITLE */}
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Fundify Manager
        </Typography>

        {/* PUSH CONTENT TO THE RIGHT */}
        <Box sx={{ flexGrow: 1 }} />

        {/* ACTIONS */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            variant="text"
            sx={{ color: "text.secondary", textTransform: "none" }}
          >
            Ayuda
          </Button>

          <Button
            variant="text"
            sx={{ color: "text.secondary", textTransform: "none" }}
          >
            Perfil
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
