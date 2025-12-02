import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Statistics() {
  // --- DATA MOCK (puedes reemplazarlo luego con datos de tu API) ---
  const summaryCards = [
    {
      icon: "volunteer_activism",
      label: "Recaudación Total (últimos 30 días)",
      value: "$4,320",
    },
    {
      icon: "groups",
      label: "Nuevos Donantes (últimos 30 días)",
      value: "37",
    },
    {
      icon: "moving",
      label: "Progreso Medio de Campañas",
      value: "65%",
    },
  ];

  const campaignFunds = [
    { name: "Huerto Comunitario", value: 7500, progress: 85 },
    { name: "Limpieza de Playa", value: 3250, progress: 45 },
    { name: "Taller de Arte Infantil", value: 1800, progress: 60 },
  ];

  const donorsChart = [
    { name: "Huerto Com.", donors: 80 },
    { name: "Limp. Playa", donors: 55 },
    { name: "Taller Arte", donors: 65 },
  ];

  const recentActivity = [
    {
      campaign: "Huerto Comunitario Urbano",
      donor: "Carlos Ruiz",
      amount: "$50",
      time: "Hace 2 horas",
    },
    {
      campaign: "Limpieza de la Playa Costazul",
      donor: "Laura Méndez",
      amount: "$25",
      time: "Hace 5 horas",
    },
    {
      campaign: "Huerto Comunitario Urbano",
      donor: "Donante Anónimo",
      amount: "$100",
      time: "Hace 1 día",
    },
  ];

  // --- COMPONENT ---
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* TITLE */}
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Informes y Estadísticas
        </Typography>
        <Typography color="text.secondary">
          Visualiza el rendimiento y el impacto de tus campañas.
        </Typography>
      </Box>

      {/* SUMMARY CARDS */}
      <Grid container spacing={3}>
        {summaryCards.map((card, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
              <Box
                sx={{
                  fontSize: 36,
                  color: "primary.main",
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                }}
                className="material-symbols-outlined"
              >
                {card.icon}
              </Box>
              <Typography color="text.secondary" fontSize={14} fontWeight={500}>
                {card.label}
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* FUNDS + DONORS CHART */}
      <Grid container spacing={4}>
        {/* FUNDS PER CAMPAIGN */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Fondos Recaudados por Campaña
            </Typography>

            {campaignFunds.map((item, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                  }}
                >
                  <Typography fontSize={14} fontWeight={500} color="text.secondary">
                    {item.name}
                  </Typography>
                  <Typography fontSize={14} fontWeight={500}>
                    ${item.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    height: 10,
                    borderRadius: 50,
                    backgroundColor: "grey.200",
                  }}
                >
                  <Box
                    sx={{
                      width: `${item.progress}%`,
                      height: "100%",
                      borderRadius: 50,
                      backgroundColor: "warning.main",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* DONORS BAR CHART */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Donantes por Campaña
            </Typography>

            <Box sx={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={donorsChart}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="donors" fill="#E9C46A" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* RECENT ACTIVITY */}
      <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
        >
          <Typography variant="h6" fontWeight="bold">
            Actividad Reciente
          </Typography>

          <Button variant="outlined" startIcon={<span className="material-symbols-outlined">download</span>}>
            Exportar Datos
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Campaña</TableCell>
              <TableCell>Donante</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentActivity.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.campaign}</TableCell>
                <TableCell>{row.donor}</TableCell>
                <TableCell sx={{ color: "primary.main", fontWeight: 600 }}>
                  {row.amount}
                </TableCell>
                <TableCell color="text.secondary">{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
