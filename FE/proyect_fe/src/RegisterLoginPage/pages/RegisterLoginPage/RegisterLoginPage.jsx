// pages/RegisterLoginPage.jsx
import { Box, Paper, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import TopMessage from "../../components/TopMessage/TopMessage";
import RoleSelector from "../../components/RoleSelector/RoleSelector";
import AuthForm from "../../components/AuthForm/AuthForm";
import DividerWithText from "../../components/DividerWithText/DividerWithText";

export default function RegisterLoginPage() {
  const [tab, setTab] = useState(0);

  const handleChange = (_, value) => setTab(value);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 6,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 450 }}>
        <TopMessage />

        <Paper elevation={4} sx={{ mt: 4, borderRadius: 3 }}>
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
                  color="secondary"
                >
                  Únete como
                </Typography>


                <RoleSelector />
                
              </>
            )}

            <AuthForm mode={tab === 0 ? "login" : "register"} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
