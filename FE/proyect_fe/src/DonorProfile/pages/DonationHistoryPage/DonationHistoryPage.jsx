// pages/DonationHistoryPage.jsx
import { Box, Button, Typography } from "@mui/material";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import DonationFilters from "../../components/DonationFilters/DonationFilters";
import DonationHistoryTable from "../../components/DonationTable/DonationTable";

export default function DonationHistoryPage() {
    const rows = [
        {
            title: 'Comedor Infantil "Esperanza"',
            tag: "#Alimentación",
            date: "15 de Nov, 2023",
            amount: "€50.00",
            status: "Financiado",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBWBdekPIIp0MK3a7QD8MeK-qTEPDZBrIsrN2K73C-zzQ4i7Ds-JvQjkkC5g_jWEZ8axPb-PCMJr3ac-iRy9sj1xooEIzopP9MW_-wcw8uxd6lSj_LUOeNOON1E-oz5FHH4GS8nevelCUv1PYq-tjXYtRS6aDg8FbAJyjrw6KeuYJlRvRxLipmbx4MUvgK_MoJMVgOr6WGYTqYsOFMDbSPzLL1ZTKS1lDCvDCxZDi9Pj8XiBhvbPQE-baZ1J4WV53EWY9gGzhUABoU",
        },
        {
            title: "Reforestación del Parque Central",
            tag: "#MedioAmbiente",
            date: "02 de Oct, 2023",
            amount: "€100.00",
            status: "En Progreso",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBW2Z8RgBvFDlmzuvl9_-PgEwECT3yIlFhBhv1HQGQpywgPlQtOKpSaKelrIGyb4X0O0IdjX7wgZiN00uY6LIwXmM2R_WU8-ZyPsNrMjnA6EJC1DRdo6kIcbBfX0_nncxkQQ3bWZNnwLIGW_YlsT-cg15wRa8v0v7fAcrWIbWzOViUgbThptUo1M5teIz6CfLgjH24_64pqIm48H-gzWKMfflcCYbwEjczY-ICk0clbvsUQgy9FGe4KAajXlDqurNst27IZH7k4Qio",
        },
    ];

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
                            startIcon={<span className="material-symbols-outlined">download</span>}
                        >
                            Exportar Historial
                        </Button>
                    </Box>

                    <DonationFilters />
                    <DonationHistoryTable rows={rows} />
                </Box>
            </Box>
        </Box>
    );
}
