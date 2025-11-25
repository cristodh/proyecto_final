import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
} from "@mui/material";

const NotificationPreferences = () => {
  const [prefs, setPrefs] = useState({
    emailGeneral: true,
    emailDonations: true,
    emailProjectUpdates: false,
    emailSecurity: true,

    appGeneral: true,
    appDonations: true,
    appProjectUpdates: true,
    appSecurity: true,
  });

  const toggle = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        border: "1px solid",
        borderColor: (t) =>
          t.palette.mode === "light" ? "grey.200" : "grey.800",
        bgcolor: (t) =>
          t.palette.mode === "light" ? "white" : t.palette.grey[900],
      }}
    >
      {/* Título */}
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          mb: 3,
          color: (t) =>
            t.palette.mode === "light"
              ? t.palette.text.primary
              : t.palette.grey[100],
        }}
      >
        Notificaciones
      </Typography>

      {/* Sección: Correo */}
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
        Notificaciones por correo
      </Typography>

      <FormGroup sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={prefs.emailGeneral}
              onChange={() => toggle("emailGeneral")}
            />
          }
          label="Recordatorios y avisos generales"
        />

        <FormControlLabel
          control={
            <Switch
              checked={prefs.emailDonations}
              onChange={() => toggle("emailDonations")}
            />
          }
          label="Actualizaciones sobre mis donaciones"
        />

        <FormControlLabel
          control={
            <Switch
              checked={prefs.emailProjectUpdates}
              onChange={() => toggle("emailProjectUpdates")}
            />
          }
          label="Noticias y progreso de proyectos que sigo"
        />

        <FormControlLabel
          control={
            <Switch
              checked={prefs.emailSecurity}
              onChange={() => toggle("emailSecurity")}
            />
          }
          label="Alertas de seguridad y actividad inusual"
        />
      </FormGroup>

      <Divider sx={{ my: 3 }} />

      {/* Sección: Dentro de la plataforma */}
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
        Notificaciones dentro de la plataforma
      </Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={prefs.appGeneral}
              onChange={() => toggle("appGeneral")}
            />
          }
          label="Alertas generales"
        />

        <FormControlLabel
          control={
            <Switch
              checked={prefs.appDonations}
              onChange={() => toggle("appDonations")}
            />
          }
          label="Movimientos y estado de mis donaciones"
        />

        <FormControlLabel
          control={
            <Switch
              checked={prefs.appProjectUpdates}
              onChange={() => toggle("appProjectUpdates")}
            />
          }
          label="Cambios en proyectos que sigo"
        />

        <FormControlLabel
          control={
            <Switch
              checked={prefs.appSecurity}
              onChange={() => toggle("appSecurity")}
            />
          }
          label="Alertas de seguridad dentro de mi cuenta"
        />
      </FormGroup>
    </Paper>
  );
};

export default NotificationPreferences;
