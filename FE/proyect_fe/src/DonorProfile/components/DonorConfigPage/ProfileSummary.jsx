import React from "react";
import { Box, Avatar, Typography, Paper, Stack } from "@mui/material";
import userIcon from "../../../imgs/UserIcon.png";

export const ProfileSummary = () => {
  return (
    <>
      {/* Título de sección para mostrar la diferencia de fuentes */}
      <Typography variant="h3" sx={{ mb: 3, color: "#2A9D8F" }}>
        Mi Perfil de Donante
      </Typography>
      
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: (t) =>
            t.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "grey.800",
          bgcolor: (t) =>
            t.palette.mode === "light" ? "#ffffff" : t.palette.grey[900],
          background: (t) =>
            t.palette.mode === "light" 
              ? "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"
              : t.palette.grey[900],
          boxShadow: (t) =>
            t.palette.mode === "light"
              ? "0 8px 32px rgba(0,0,0,0.08)"
              : "0 8px 32px rgba(0,0,0,0.3)",
          transition: "all 0.3s ease",
          '&:hover': {
            boxShadow: (t) =>
              t.palette.mode === "light"
                ? "0 12px 40px rgba(0,0,0,0.12)"
                : "0 12px 40px rgba(0,0,0,0.4)",
            transform: "translateY(-2px)",
          },
        }}
      >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        alignItems="center"
      >
        {/* Avatar */}
        <Avatar
          src={userIcon}
          sx={{
            width: 100,
            height: 100,
            fontSize: 36,
            bgcolor: "#2A9D8F",
            color: "white",
            fontWeight: "600",
            boxShadow: "0 8px 24px rgba(42, 157, 143, 0.3)",
            transition: "all 0.3s ease",
            '&:hover': {
              transform: "scale(1.05)",
              boxShadow: "0 12px 32px rgba(42, 157, 143, 0.4)",
            },
          }}
        >
          C
        </Avatar>

        {/* Info general */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              color: (t) =>
                t.palette.mode === "light"
                  ? "#1a202c"
                  : t.palette.grey[100],
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              fontSize: "1.25rem",
            }}
          >
            Chris Donor
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: (t) =>
                t.palette.mode === "light"
                  ? "#64748b"
                  : t.palette.grey[400],
              mt: 0.5,
              fontWeight: 500,
              fontSize: "0.8rem",
            }}
          >
            Miembro desde Septiembre 2025
          </Typography>
        </Box>

        {/* Pequeñas estadísticas */}
        <Stack
          direction="row"
          spacing={4}
          sx={{
            textAlign: { xs: "center", sm: "right" },
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: "rgba(42, 157, 143, 0.05)",
              border: "1px solid rgba(42, 157, 143, 0.1)",
              minWidth: 80,
            }}
          >
            <Typography 
              variant="h6" 
              fontWeight={700}
              sx={{ color: "#2A9D8F", mb: 0.5, fontSize: "1rem" }}
            >
              $450
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: (t) =>
                  t.palette.mode === "light"
                    ? "#64748b"
                    : t.palette.grey[400],
                fontWeight: 500,
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Donado
            </Typography>
          </Box>

          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: "rgba(42, 157, 143, 0.05)",
              border: "1px solid rgba(42, 157, 143, 0.1)",
              minWidth: 80,
            }}
          >
            <Typography 
              variant="h6" 
              fontWeight={700}
              sx={{ color: "#2A9D8F", mb: 0.5, fontSize: "1rem" }}
            >
              12
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: (t) =>
                  t.palette.mode === "light"
                    ? "#64748b"
                    : t.palette.grey[400],
                fontWeight: 500,
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Proyectos
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Paper>
    </>
  );
};

export default ProfileSummary;
