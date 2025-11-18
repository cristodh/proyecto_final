// components/SideNavBar.jsx
import { Box, Avatar, Typography, ButtonBase } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SideNavBar() {
    const navItems = [
        { label: "Resumen", icon: <DashboardIcon /> },
        { label: "Historial de Donaciones", icon: <HistoryIcon />, active: true },
        { label: "Proyectos Seguidos", icon: <FavoriteIcon /> },
        { label: "Configuración", icon: <SettingsIcon /> },
    ];

    return (
        <Box
            sx={{
                width: { xs: "100%", lg: 260 },
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                height: "fit-content",
                position: { lg: "sticky" },
                top: 100,
                display: "flex",
                flexDirection: "column",
                gap: 3,
            }}
        >
            {/* User Info */}
            <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                    sx={{ width: 48, height: 48 }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYvHJv4tSgbqJkvVeIgtNSxUkeJfo4teaR3w9SDho3cnLyWOK54JcTwRnt1saiLxmMSQAJCUFr_MpB8_7leYw4G6qft1ZBPhauvA_JMxe40tE8LcXZcR_cqhljEtclIuZHTgl1EQ7qY_q38skHSKnuwW8tpSDIkiYQZ4LZe5YF5SJXzIyaQA9KvOGH0eNBGs9QME5ZYtthAxDBekRhGxkNzDGuEYs2thVbK4jjerUL4lYCz4Pz2mGXz5-aT0y8c3mi1eb6eTPDBPo"
                />
                <Box>
                    <Typography fontWeight="bold">Carlos Mendoza</Typography>
                    <Typography variant="caption" color="text.secondary">
                        Miembro desde Octubre 2023
                    </Typography>
                </Box>
            </Box>

            {/* Stats */}
            <Box display="flex" gap={2} flexWrap="wrap">
                <Box
                    sx={{
                        flex: 1,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        p: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        €1,250
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Total Donado
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        p: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        15
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Proyectos Apoyados
                    </Typography>
                </Box>
            </Box>

            {/* Nav List */}
            <Box display="flex" flexDirection="column" gap={1}>
                {navItems.map((item) => (
                    <ButtonBase
                        key={item.label}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            gap: 2,
                            px: 2,
                            py: 1.2,
                            borderRadius: 2,
                            bgcolor: item.active ? "primary.main" : "transparent",
                            color: item.active ? "white" : "text.primary",
                            "&:hover": {
                                bgcolor: item.active ? "primary.dark" : "action.hover",
                            },
                        }}
                    >
                        {item.icon}
                        <Typography
                            variant="body2"
                            fontWeight={item.active ? "bold" : "medium"}
                        >
                            {item.label}
                        </Typography>
                    </ButtonBase>
                ))}
            </Box>
        </Box>
    );
}
