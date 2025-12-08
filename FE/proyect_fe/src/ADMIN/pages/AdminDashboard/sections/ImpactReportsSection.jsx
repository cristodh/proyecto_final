import React, { useState } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import DownloadIcon from "@mui/icons-material/Download";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`reports-tabpanel-${index}`}
      aria-labelledby={`reports-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ImpactReportsSection() {
  const [tabValue, setTabValue] = useState(0);

  const impactSocialData = [
    { month: "Julio", projects: 42, people: 2100, communities: 15 },
    { month: "Agosto", projects: 48, people: 2400, communities: 18 },
    { month: "Septiembre", projects: 38, people: 1900, communities: 14 },
    { month: "Octubre", projects: 55, people: 2750, communities: 20 },
    { month: "Noviembre", projects: 51, people: 2550, communities: 19 },
    { month: "Diciembre", projects: 63, people: 3150, communities: 23 },
  ];

  const impactFinancialData = [
    { month: "Julio", raised: 125000, commissions: 6250, byMethod: 85000 },
    { month: "Agosto", raised: 165000, commissions: 8250, byMethod: 110000 },
    { month: "Septiembre", raised: 145000, commissions: 7250, byMethod: 98000 },
    { month: "Octubre", raised: 205000, commissions: 10250, byMethod: 140000 },
    { month: "Noviembre", raised: 185000, commissions: 9250, byMethod: 126000 },
    { month: "Diciembre", raised: 250000, commissions: 12500, byMethod: 170000 },
  ];

  const topCampaigns = [
    { name: "Educación Rural", amount: 125000, status: "Completada" },
    { name: "Agua Potable", amount: 98000, status: "Activa" },
    { name: "Salud Comunitaria", amount: 87500, status: "Completada" },
  ];

  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
  };

  const StatBox = ({ label, value }) => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        border: 1,
        borderColor: "custom.borderLight",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 900, color: "primary.main" }}>
        {value}
      </Typography>
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          Reportes de Impacto
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Datos, métricas y análisis del impacto generado por Fundify
        </Typography>
      </Box>

      {/* Botones de exportación */}
      <Box sx={{ mb: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={() => handleExport("pdf")}
        >
          PDF
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={() => handleExport("excel")}
        >
          Excel
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={() => handleExport("csv")}
        >
          CSV
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          border: 1,
          borderColor: "custom.borderLight",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Impacto Social" id="reports-tab-0" />
          <Tab label="Impacto Financiero" id="reports-tab-1" />
          <Tab label="Rankings" id="reports-tab-2" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={3}>
              <StatBox label="Proyectos Completados" value="297" />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatBox label="Personas Beneficiadas" value="14,850" />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatBox label="Comunidades Impactadas" value="109" />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatBox label="Organizaciones" value="47" />
            </Grid>
          </Grid>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: 1,
              borderColor: "custom.borderLight",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Evolución del Impacto Social
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={impactSocialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="projects"
                  fill="#3B82F6"
                  name="Proyectos Completados"
                />
                <Bar
                  dataKey="people"
                  fill="#10B981"
                  name="Personas Beneficiadas"
                />
                <Bar dataKey="communities" fill="#F59E0B" name="Comunidades" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={3}>
              <StatBox label="Total Recaudado" value="$1.28M" />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatBox label="Comisiones Fundify" value="$64K" />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatBox label="Promedio por Campaña" value="$18.5K" />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatBox label="Tasa Conversión" value="23.4%" />
            </Grid>
          </Grid>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: 1,
              borderColor: "custom.borderLight",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Evolución Financiera
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={impactFinancialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="raised"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  name="Total Recaudado"
                />
                <Line
                  type="monotone"
                  dataKey="commissions"
                  stroke="#EC4899"
                  strokeWidth={2}
                  name="Comisiones"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Top 10 Campañas Más Exitosas
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: 1,
                  borderColor: "custom.borderLight",
                }}
              >
                {topCampaigns.map((campaign, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 2,
                      borderBottom:
                        index < topCampaigns.length - 1
                          ? 1
                          : "none",
                      borderColor: "divider",
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {index + 1}. {campaign.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {campaign.status}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      ${campaign.amount.toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
}
