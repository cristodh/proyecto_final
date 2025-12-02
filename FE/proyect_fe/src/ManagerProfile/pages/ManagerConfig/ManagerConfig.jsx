import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import Sidebar from "../../components/SideBar/Sidebar";
import Header from "../../components/HeaderUser/HeaderUser";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import BusinessIcon from "@mui/icons-material/Business";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { getData } from "../../../Register/services/fetch";

export default function ManagerConfig() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [userLogged, setUserLogged] = useState([]);

  // Estados para configuración
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    position: ''
  });

  const [notifications, setNotifications] = useState({
    emailDonations: true,
    emailUpdates: true,
    emailMarketing: false,
    pushNotifications: true
  });

  const [preferences, setPreferences] = useState({
    language: 'es',
    currency: 'CRC',
    timezone: 'America/Costa_Rica'
  });

  useEffect(() => {
    async function getUser() {
      const response = await getData(`user/user_id/${localStorage.getItem('id')}/`);
      const user = response[0];
      setUserLogged(user);
      
      // Cargar datos del perfil
      setProfileData({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        organization: 'Mi Organización',
        position: 'Gerente de Proyectos'
      });
    }
    getUser();
  }, []);

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field) => {
    setNotifications(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar la configuración
    console.log('Configuración guardada:', { profileData, notifications, preferences });
  };

  return (
    <Box sx={{
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fef7f0 0%, #fff4e6 25%, #fef7f0 50%, #fff8f3 75%, #fef7f0 100%)",
    }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={userLogged} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header onToggleSidebar={toggleSidebar} user={userLogged} />

        <Box sx={{ flex: 1, ml: { xs: 0, md: "280px" }, pt: 2 }}>
          <Container maxWidth="lg" sx={{ py: 2 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: "#1a202c" }}>
                Configuración
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Personaliza tu experiencia y gestiona tu cuenta
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Información del Perfil */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid rgba(255,140,0,0.1)",
                    background: "linear-gradient(135deg, rgba(255, 140, 0, 0.02) 0%, rgba(255, 140, 0, 0.01) 100%)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <PersonIcon sx={{ color: "#FF8C00", mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Información Personal
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        value={profileData.firstName}
                        onChange={(e) => handleProfileChange('firstName', e.target.value)}
                        variant="outlined"
                        size="medium"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Apellido"
                        value={profileData.lastName}
                        onChange={(e) => handleProfileChange('lastName', e.target.value)}
                        variant="outlined"
                        size="medium"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Correo Electrónico"
                        value={profileData.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        variant="outlined"
                        size="medium"
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Teléfono"
                        value={profileData.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        variant="outlined"
                        size="medium"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Información de la Organización */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid rgba(255,140,0,0.1)",
                    background: "linear-gradient(135deg, rgba(255, 140, 0, 0.02) 0%, rgba(255, 140, 0, 0.01) 100%)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <BusinessIcon sx={{ color: "#FF8C00", mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Organización
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Nombre de la Organización"
                        value={profileData.organization}
                        onChange={(e) => handleProfileChange('organization', e.target.value)}
                        variant="outlined"
                        size="medium"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Cargo/Posición"
                        value={profileData.position}
                        onChange={(e) => handleProfileChange('position', e.target.value)}
                        variant="outlined"
                        size="medium"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Preferencias del Sistema */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid rgba(255,140,0,0.1)",
                    background: "linear-gradient(135deg, rgba(255, 140, 0, 0.02) 0%, rgba(255, 140, 0, 0.01) 100%)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <SecurityIcon sx={{ color: "#FF8C00", mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Preferencias
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Idioma</InputLabel>
                        <Select
                          value={preferences.language}
                          label="Idioma"
                          onChange={(e) => handlePreferenceChange('language', e.target.value)}
                        >
                          <MenuItem value="es">Español</MenuItem>
                          <MenuItem value="en">English</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Moneda</InputLabel>
                        <Select
                          value={preferences.currency}
                          label="Moneda"
                          onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                        >
                          <MenuItem value="CRC">Colones (₡)</MenuItem>
                          <MenuItem value="USD">Dólares ($)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Zona Horaria</InputLabel>
                        <Select
                          value={preferences.timezone}
                          label="Zona Horaria"
                          onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                        >
                          <MenuItem value="America/Costa_Rica">Costa Rica (UTC-6)</MenuItem>
                          <MenuItem value="America/New_York">Nueva York (UTC-5)</MenuItem>
                          <MenuItem value="Europe/Madrid">Madrid (UTC+1)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Configuración de Notificaciones */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid rgba(255,140,0,0.1)",
                    background: "linear-gradient(135deg, rgba(255, 140, 0, 0.02) 0%, rgba(255, 140, 0, 0.01) 100%)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <NotificationsIcon sx={{ color: "#FF8C00", mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Notificaciones
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.emailDonations}
                          onChange={() => handleNotificationChange('emailDonations')}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#FF8C00',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#FF8C00',
                            },
                          }}
                        />
                      }
                      label="Notificaciones de nuevas donaciones"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.emailUpdates}
                          onChange={() => handleNotificationChange('emailUpdates')}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#FF8C00',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#FF8C00',
                            },
                          }}
                        />
                      }
                      label="Actualizaciones del sistema"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.emailMarketing}
                          onChange={() => handleNotificationChange('emailMarketing')}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#FF8C00',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#FF8C00',
                            },
                          }}
                        />
                      }
                      label="Contenido promocional"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.pushNotifications}
                          onChange={() => handleNotificationChange('pushNotifications')}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#FF8C00',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#FF8C00',
                            },
                          }}
                        />
                      }
                      label="Notificaciones push"
                    />
                  </Box>
                </Paper>
              </Grid>

              {/* Botón de guardar */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    sx={{
                      bgcolor: "#FF8C00",
                      color: "white",
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "1rem",
                      boxShadow: "0 4px 12px rgba(255, 140, 0, 0.3)",
                      '&:hover': {
                        bgcolor: "#E67C00",
                        boxShadow: "0 6px 16px rgba(255, 140, 0, 0.4)",
                      }
                    }}
                  >
                    Guardar Configuración
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}