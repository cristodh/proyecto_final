import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Grid,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { patchData } from "../../../services/fetch";

const ProfileForm = ({ user, onUpdate }) => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    nationality: "",
    address: "",
  });
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (user) {
      setValues({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        nationality: user.nationality || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem('id');
      const response = await patchData(`user/users/${userId}/`, values);
      
      if (response) {
        setAlert({ open: true, message: "Perfil actualizado exitosamente", severity: "success" });
        if (onUpdate) {
          onUpdate(response);
        }
      } else {
        setAlert({ open: true, message: "Error al actualizar el perfil", severity: "error" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setAlert({ open: true, message: "Error al actualizar el perfil", severity: "error" });
    }
  };

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
        border: "1px solid rgba(0,0,0,0.05)",
        bgcolor: "#ffffff",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        '&:hover': {
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
        },
      }}
      elevation={0}
    >
      {/* Título */}
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{
          mb: 4,
          color: "#1a202c",
          letterSpacing: "-0.02em",
          position: "relative",
          '&::after': {
            content: '""',
            position: "absolute",
            bottom: -8,
            left: 0,
            width: 60,
            height: 3,
            background: "linear-gradient(90deg, #2A9D8F, #02695D)",
            borderRadius: 2,
          },
        }}
      >
        Información Personal
      </Typography>

      {/* Formulario */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre"
            name="first_name"
            value={values.first_name}
            onChange={handleChange}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'rgba(248, 250, 252, 0.5)',
                '&:hover fieldset': {
                  borderColor: '#2A9D8F',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2A9D8F',
                  borderWidth: 2,
                },
              },
              '& .MuiInputLabel-root': {
                fontWeight: 500,
                '&.Mui-focused': {
                  color: '#2A9D8F',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Apellido"
            name="last_name"
            value={values.last_name}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'rgba(248, 250, 252, 0.5)',
                '&:hover fieldset': {
                  borderColor: '#2A9D8F',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2A9D8F',
                  borderWidth: 2,
                },
              },
              '& .MuiInputLabel-root': {
                fontWeight: 500,
                '&.Mui-focused': {
                  color: '#2A9D8F',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Correo electrónico"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'rgba(248, 250, 252, 0.5)',
                '&:hover fieldset': {
                  borderColor: '#2A9D8F',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2A9D8F',
                  borderWidth: 2,
                },
              },
              '& .MuiInputLabel-root': {
                fontWeight: 500,
                '&.Mui-focused': {
                  color: '#2A9D8F',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Teléfono"
            name="phone_number"
            value={values.phone_number}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'rgba(248, 250, 252, 0.5)',
                '&:hover fieldset': {
                  borderColor: '#2A9D8F',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2A9D8F',
                  borderWidth: 2,
                },
              },
              '& .MuiInputLabel-root': {
                fontWeight: 500,
                '&.Mui-focused': {
                  color: '#2A9D8F',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nacionalidad"
            name="nationality"
            value={values.nationality}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'rgba(248, 250, 252, 0.5)',
                '&:hover fieldset': {
                  borderColor: '#2A9D8F',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2A9D8F',
                  borderWidth: 2,
                },
              },
              '& .MuiInputLabel-root': {
                fontWeight: 500,
                '&.Mui-focused': {
                  color: '#2A9D8F',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Dirección"
            name="address"
            value={values.address}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'rgba(248, 250, 252, 0.5)',
                '&:hover fieldset': {
                  borderColor: '#2A9D8F',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2A9D8F',
                  borderWidth: 2,
                },
              },
              '& .MuiInputLabel-root': {
                fontWeight: 500,
                '&.Mui-focused': {
                  color: '#2A9D8F',
                },
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Botón */}
      <Box textAlign="right" mt={5}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          sx={{ 
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            background: 'linear-gradient(135deg, #2A9D8F 0%, #02695D 100%)',
            boxShadow: '0 4px 16px rgba(42, 157, 143, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #238A7B 0%, #025951 100%)',
              boxShadow: '0 6px 24px rgba(42, 157, 143, 0.4)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Guardar Cambios
        </Button>
      </Box>

      {/* Alert de feedback */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ProfileForm;
