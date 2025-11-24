// components/TopNavBar.jsx
import { AppBar, Toolbar, Box, IconButton, Typography, Avatar } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import logoFundify from "../../../imgs/LogoFundifyClose.png";

export default function TopNavBar() {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backdropFilter: "blur(8px)",
                backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                        ? "rgba(16,34,22,0.8)"
                        : "rgba(248,249,250,0.8)",
                borderBottom: "1px solid",
                borderColor: (theme) =>
                    theme.palette.mode === "dark" ? "#444" : "#ddd",
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Logo */}
                <Box display="flex" alignItems="center" gap={1}>
                    <img 
                        src={logoFundify} 
                        alt="Fundify Logo" 
                        style={{ 
                            height: "48px",
                            width: "auto"
                        }} 
                    />
                </Box>

                {/* Middle Nav (Desktop Only) */}
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        gap: 4,
                        mx: "auto",
                    }}
                >
                    <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}>
                        Explorar Proyectos
                    </Typography>
                    <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}>
                        Cómo Funciona
                    </Typography>
                </Box>

                {/* Icons */}
                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton>
                        <NotificationsNoneIcon />
                    </IconButton>

                    <Avatar
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9a6zDxg4IjCO2zA6JSoWOJUP4iMJiAVXNTyLLmOPDznGb54s0s0dFH0EdEu0olDTKN7BKs7WYk2_kR1wDMaDz4mSXqVVGRj-imlv0B8QO7f6nYVd8wNAiEzOgYDZjcGJydLM-1og8XjyGby9lJLVfAwZiSLRqDr2TMyy2MkL2JPKK4fMSWNfLTVgF7cuFEt8_g_QJrZbGJ6BKsFoDr72b8YSjmeXlKT7Ocja-1Wrbiwlajq7DpJATA3VhD7cVrITiLTHVGTyltOA"
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
