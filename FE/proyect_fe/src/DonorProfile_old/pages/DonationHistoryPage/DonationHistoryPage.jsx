// pages/DonationHistoryPage.jsx
import { Box, Button, Typography } from "@mui/material";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import DonationFilters from "../../components/DonationFilters/DonationFilters";
import DonationHistoryTable from "../../components/DonationTable/DonationTable";
import { useEffect, useState } from "react";
import axios from "axios"; // Usamos axios para la petición HTTP
import DownloadIcon from '@mui/icons-material/Download';
export default function DonationHistoryPage() {
    // 1. Estado para guardar la info del usuario logueado
    const [user, setUser] = useState(null);

    const rows = [
       
    ];

    // 2. useEffect para obtener la info del usuario al cargar la página
    useEffect(() => {
        // 2.1. Obtener el ID del usuario desde localStorage
        const userId = localStorage.getItem("id");
        if (!userId) return; // Si no hay ID, no hacemos nada

        // 2.2. Hacer la petición al backend para obtener la info del usuario
        axios.get(`http://localhost:8000/user/user_id/${userId}/`)
            .then((res) => {
                // 2.3. Guardar la info en el estado
                if (res.data && res.data.length > 0) {
                    setUser(res.data[0]); // El backend devuelve un array
                    localStorage.setItem("user", JSON.stringify(res.data[0])); // Guardar usuario en localStorage
                }
            })
            .catch((err) => {
                console.error("Error al obtener usuario:", err);
            });
    }, []);

    return (
        <Box>
            <TopNavBar />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                    gap: 4,
                    p: { xs: 2, lg: 4 },
                }}
            >
                <SideNavBar />
                <Box flex={1} display="flex" flexDirection="column" gap={3}>
                    {/* Heading */}
                    <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
                        <Typography variant="h4" fontWeight="black">
                            Historial de Donaciones
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<DownloadIcon />}
                        >
                            Exportar Historial
                        </Button>
                    </Box>

                    {/* 3. Mostrar la info del usuario logueado */}
                    {user && (
                        <Box mb={2} p={2} bgcolor="#f5f5f5" borderRadius={2}>
                            <Typography variant="subtitle1" fontWeight="bold">Usuario logueado:</Typography>
                            <Typography>Nombre: {user.first_name} {user.last_name}</Typography>
                            <Typography>Email: {user.email}</Typography>
                            <Typography>
                                Rol: {user.role_name
                                    ? user.role_name === "User"
                                        ? "Usuario"
                                        : user.role_name === "CampaignManager"
                                            ? "Administrador de Campañas"
                                            : user.role_name === "Admin"
                                                ? "Administrador"
                                                : user.role_name === "Contributor"
                                                    ? "Donante"
                                                    : "Desconocido"
                                    : "Desconocido"}
                            </Typography>
                        </Box>
                    )}


                    <DonationFilters />
                    <DonationHistoryTable rows={rows} />
                </Box>
            </Box>
        </Box>
    );
}
