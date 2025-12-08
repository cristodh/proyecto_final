// pages/RegisterLoginPage.jsx
import { Box, Paper, Tabs, Tab, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import TopMessage from "../../components/TopMessage/TopMessage";
import RoleSelector from "../../components/RoleSelector/RoleSelector";
import AuthForm from "../../components/AuthForm/AuthForm";
import AdminLoginForm from "../../components/AdminLoginForm/AdminLoginForm";

export default function RegisterLoginPage() {
  const [tab, setTab] = useState(0);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('tab') === 'register') {
      setTab(1);
    }
  }, [location]);

  const handleChange = (_, value) => setTab(value);
  const handleBackFromAdmin = () => setIsAdminLogin(false);

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)", // Resta la altura del header
          background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f8fafc 50%, #f1f5f9 75%, #f0f9ff 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Vuelve a center para centrado
          px: 2,
          py: 2, // Padding reducido pero manteniendo centrado
        }}
      >
      <Box sx={{ width: "100%", maxWidth: 450 }}>
        <TopMessage />

        <Paper elevation={4} sx={{ mt: 4, borderRadius: 3 }}>
          {!isAdminLogin ? (
            <>
              <Tabs
                value={tab}
                onChange={handleChange}
                centered
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tab label="Iniciar Sesión" />
                <Tab label="Registrarse" />
              </Tabs>

              <Box sx={{ p: { xs: 3, sm: 4 } }}>
                {tab === 1 && (
                  <>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      mb={3}
                    >
                      Selecciona tu rol para comenzar.
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      textAlign="center"
                      color="black"
                    >
                      Únete como
                    </Typography>

                    <RoleSelector />
                  </>
                )}

                <AuthForm mode={tab === 0 ? "login" : "register"} onTabChange={setTab} />

                {/* Botón de Admin - Solo visible en login */}
                {tab === 0 && (
                  <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: "divider" }}>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      color="text.secondary"
                      mb={2}
                    >
                      ¿Eres administrador?
                    </Typography>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      onClick={() => setIsAdminLogin(true)}
                      sx={{ textTransform: "none" }}
                    >
                      Admin
                    </Button>
                  </Box>
                )}
              </Box>
            </>
          ) : (
            <Box sx={{ p: { xs: 3, sm: 4 } }}>
              <AdminLoginForm onBack={handleBackFromAdmin} />
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
    </>
  );
}
