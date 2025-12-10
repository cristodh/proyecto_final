// ============================================================
// IMPORTS Y DEPENDENCIAS
// ============================================================
import { Box, Paper, Tabs, Tab, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import TopMessage from "../../components/TopMessage/TopMessage";
import RoleSelector from "../../components/RoleSelector/RoleSelector";
import AuthForm from "../../components/AuthForm/AuthForm";
import AdminLoginForm from "../../components/AdminLoginForm/AdminLoginForm";

// ============================================================
// PÁGINA PRINCIPAL DE REGISTRO Y LOGIN
// ============================================================
/**
 * RegisterLoginPage
 * Página que gestiona el flujo de login/registro y admin login
 * Soporta dos modos: usuario normal y administrador
 */
export default function RegisterLoginPage() {
  // ============================================================
  // ESTADOS
  // ============================================================
  const [tab, setTab] = useState(0);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const location = useLocation();

  // ============================================================
  // EFECTOS
  // ============================================================
  /**
   * Cambia a la pestaña de registro si viene del query param
   */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('tab') === 'register') {
      setTab(1);
    }
  }, [location]);

  // ============================================================
  // FUNCIONES DE MANEJO
  // ============================================================
  /**
   * Maneja el cambio entre tabs de login y registro
   */
  const handleChange = (_, value) => setTab(value);

  /**
   * Vuelve desde el login de admin al login normal
   */
  const handleBackFromAdmin = () => setIsAdminLogin(false);

  // ============================================================
  // RENDERIZADO JSX
  // ============================================================
  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)", // Resta la altura del header
          background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f8fafc 50%, #f1f5f9 75%, #f0f9ff 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          py: 2,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 450 }}>
          <TopMessage />

          <Paper elevation={4} sx={{ mt: 4, borderRadius: 3 }}>
            {!isAdminLogin ? (
              <>
                {/* ========================================================
                    TABS DE LOGIN Y REGISTRO
                    ======================================================== */}
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
                  {/* ========================================================
                      SECCIÓN DE REGISTRO - SELECTOR DE ROL
                      ======================================================== */}
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

                  {/* ========================================================
                      COMPONENTE DE AUTENTICACIÓN
                      ======================================================== */}
                  <AuthForm mode={tab === 0 ? "login" : "register"} onTabChange={setTab} />

                  {/* ========================================================
                      BOTÓN DE ADMIN LOGIN
                      ======================================================== */}
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
              <>
                {/* ========================================================
                    LOGIN DE ADMINISTRADOR
                    ======================================================== */}
                <Box sx={{ p: { xs: 3, sm: 4 } }}>
                  <AdminLoginForm onBack={handleBackFromAdmin} />
                </Box>
              </>
            )}
          </Paper>
        </Box>
      </Box>
    </>
  );
}
