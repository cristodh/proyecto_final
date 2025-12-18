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
import ManagerSidebar from "../ManagerSidebar/ManagerSidebar";
import ManagerHeader from "../ManagerHeader/ManagerHeader";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import BusinessIcon from "@mui/icons-material/Business";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { patchData } from "../../../services/fetch";
import { getUserData } from "../../../services/userService";
import { Snackbar, Alert, CircularProgress } from "@mui/material";

export default function ManagerConfigContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.up("md"));
  const [userLogged, setUserLogged] = useState(null);
  const [loading, setLoading] = useState(true);

  const [profileData, setProfileData] = useState({ 
    first_name: '', 
    last_name: '', 
    email: '', 
    phone_number: '', 
    nationality: '', 
    address: '' 
  });
  
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  const [notifications, setNotifications] = useState({ emailDonations: true, emailUpdates: true, emailMarketing: false, pushNotifications: true });
  const [preferences, setPreferences] = useState({ language: 'es', currency: 'CRC', timezone: 'America/Costa_Rica' });

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const userId = localStorage.getItem('id');
        const userData = await getUserData(userId);
        if (userData) {
          setUserLogged(userData);
          setProfileData({
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            email: userData.email || '',
            phone_number: userData.phone_number || '',
            nationality: userData.nationality || '',
            address: userData.address || ''
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  const toggleSidebar = () => setSidebarOpen((s) => !s);
  
  const handleProfileChange = (field, value) => setProfileData(prev => ({ ...prev, [field]: value }));
  const handleNotificationChange = (field) => setNotifications(prev => ({ ...prev, [field]: !prev[field] }));
  const handlePreferenceChange = (field, value) => setPreferences(prev => ({ ...prev, [field]: value }));
  
  const handleSave = async () => {
    try {
      const userId = localStorage.getItem('id');
      const response = await patchData(`user/users/${userId}/`, profileData);
      
      if (response && response.ok !== false) {
        setAlert({ open: true, message: "Perfil actualizado exitosamente", severity: "success" });
        // Recargar datos del usuario
        const userData = await getUserData(userId);
        if (userData) {
          setUserLogged(userData);
        }
      } else {
        setAlert({ open: true, message: "Error al actualizar el perfil", severity: "error" });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setAlert({ open: true, message: "Error al actualizar el perfil", severity: "error" });
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: "flex", 
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #f1f5f9 50%, #f8fafc 75%, #f1f5f9 100%)" }}>
      <ManagerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={userLogged} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ManagerHeader onToggleSidebar={toggleSidebar} user={userLogged} />

        <Box sx={{ flex: 1, ml: { xs: 0, md: "280px" }, pt: 2 }}>
          <Container maxWidth="lg" sx={{ py: 2 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: "#1a202c" }}>
                Configuración
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Personaliza tu experiencia y gestiona tu cuenta
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(30,58,138,0.1)", background: "linear-gradient(135deg, rgba(30, 58, 138, 0.02) 0%, rgba(30, 58, 138, 0.01) 100%)" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <PersonIcon sx={{ color: "#3B82F6", mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Información Personal
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Nombre" value={profileData.first_name} onChange={(e) => handleProfileChange('first_name', e.target.value)} variant="outlined" size="medium" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Apellido" value={profileData.last_name} onChange={(e) => handleProfileChange('last_name', e.target.value)} variant="outlined" size="medium" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Correo Electrónico" value={profileData.email} onChange={(e) => handleProfileChange('email', e.target.value)} variant="outlined" size="medium" type="email" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Teléfono" value={profileData.phone_number} onChange={(e) => handleProfileChange('phone_number', e.target.value)} variant="outlined" size="medium" />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(30,58,138,0.1)", background: "linear-gradient(135deg, rgba(30, 58, 138, 0.02) 0%, rgba(30, 58, 138, 0.01) 100%)" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <BusinessIcon sx={{ color: "#3B82F6", mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Información Adicional
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Nacionalidad" value={profileData.nationality} onChange={(e) => handleProfileChange('nationality', e.target.value)} variant="outlined" size="medium" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Dirección" value={profileData.address} onChange={(e) => handleProfileChange('address', e.target.value)} variant="outlined" size="medium" multiline rows={2} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(30,58,138,0.1)", background: "linear-gradient(135deg, rgba(30, 58, 138, 0.02) 0%, rgba(30, 58, 138, 0.01) 100%)" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <SecurityIcon sx={{ color: "#3B82F6", mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Preferencias
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Idioma</InputLabel>
                        <Select value={preferences.language} label="Idioma" onChange={(e) => handlePreferenceChange('language', e.target.value)}>
                          <MenuItem value="es">Español</MenuItem>
                          <MenuItem value="en">English</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Moneda</InputLabel>
                        <Select value={preferences.currency} label="Moneda" onChange={(e) => handlePreferenceChange('currency', e.target.value)}>
                          <MenuItem value="CRC">Colones (₡)</MenuItem>
                          <MenuItem value="USD">Dólares ($)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Zona Horaria</InputLabel>
                        <Select value={preferences.timezone} label="Zona Horaria" onChange={(e) => handlePreferenceChange('timezone', e.target.value)}>
                          <MenuItem value="America/Costa_Rica">Costa Rica (UTC-6)</MenuItem>
                          <MenuItem value="America/New_York">Nueva York (UTC-5)</MenuItem>
                          <MenuItem value="Europe/Madrid">Madrid (UTC+1)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(30,58,138,0.1)", background: "linear-gradient(135deg, rgba(30, 58, 138, 0.02) 0%, rgba(30, 58, 138, 0.01) 100%)" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <NotificationsIcon sx={{ color: "#3B82F6", mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Notificaciones
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <FormControlLabel control={<Switch checked={notifications.emailDonations} onChange={() => handleNotificationChange('emailDonations')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#3B82F6' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#3B82F6' } }} />} label="Notificaciones de nuevas donaciones" />
                    <FormControlLabel control={<Switch checked={notifications.emailUpdates} onChange={() => handleNotificationChange('emailUpdates')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#3B82F6' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#3B82F6' } }} />} label="Actualizaciones del sistema" />
                    <FormControlLabel control={<Switch checked={notifications.emailMarketing} onChange={() => handleNotificationChange('emailMarketing')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#3B82F6' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#3B82F6' } }} />} label="Contenido promocional" />
                    <FormControlLabel control={<Switch checked={notifications.pushNotifications} onChange={() => handleNotificationChange('pushNotifications')} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#3B82F6' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#3B82F6' } }} />} label="Notificaciones push" />
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} sx={{ bgcolor: "#1E3A8A", color: "white", px: 4, py: 1.5, borderRadius: 2, textTransform: "none", fontWeight: 700, boxShadow: "0 6px 20px rgba(30,58,138,0.25)", '&:hover': { bgcolor: "#3B82F6", boxShadow: "0 8px 24px rgba(30,58,138,0.35)" } }}>
                    Guardar cambios
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Snackbar para alertas */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
