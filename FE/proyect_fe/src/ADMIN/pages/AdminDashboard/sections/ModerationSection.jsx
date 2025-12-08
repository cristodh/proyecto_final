import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import BlockIcon from "@mui/icons-material/Block";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import { getData, putData, deleteData } from "../../../../services/fetch";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`moderation-tabpanel-${index}`}
      aria-labelledby={`moderation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ModerationSection() {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [campaignReports, setCampaignReports] = useState([]);
  const [userReports, setUserReports] = useState([]);
  const [loading, setLoading] = useState(false);

  // TODO: Agregar useEffect para traer reportes del backend
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        // const campaignData = await getData('reports/campaigns/');
        // const userData = await getData('reports/users/');
        // if (campaignData) setCampaignReports(campaignData);
        // if (userData) setUserReports(userData);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "reviewed":
        return "info";
      case "resolved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status) => {
    return status === "pending"
      ? "Pendiente"
      : status === "reviewed"
        ? "Revisado"
        : status === "resolved"
          ? "Resuelto"
          : "Rechazado";
  };

  const handleOpenDialog = (report) => {
    setSelectedReport(report);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReport(null);
  };

  const handleAction = async (action) => {
    // TODO: Implementar acciones en backend (warn, suspend, resolve, delete)
    try {
      // const response = await putData(`reports/${selectedReport.id}/`, { action: action, status: 'resolved' });
      // if (response.ok) {
      //   // Actualizar lista de reportes
      //   handleCloseDialog();
      // }
    } catch (error) {
      console.error('Error processing action:', error);
    }
  };

  const CampaignReportsTable = () => (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 2,
        border: 1,
        borderColor: "custom.borderLight",
      }}
    >
      <Table>
        <TableHead sx={{ bgcolor: "grey.50" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Campaña</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Motivo</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Reportado por</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Fecha</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="center">
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaignReports.map((report) => (
            <TableRow key={report.id} hover>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {report.campaign}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <WarningIcon sx={{ fontSize: 18, color: "warning.main" }} />
                  {report.reason}
                </Box>
              </TableCell>
              <TableCell>{report.reporter}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(report.status)}
                  color={getStatusColor(report.status)}
                  size="small"
                />
              </TableCell>
              <TableCell align="center">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleOpenDialog(report)}
                >
                  Revisar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const UserReportsTable = () => (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 2,
        border: 1,
        borderColor: "custom.borderLight",
      }}
    >
      <Table>
        <TableHead sx={{ bgcolor: "grey.50" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Usuario</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Motivo</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Reportado por</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Fecha</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="center">
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userReports.map((report) => (
            <TableRow key={report.id} hover>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {report.user}
                </Typography>
              </TableCell>
              <TableCell>{report.reason}</TableCell>
              <TableCell>{report.reporter}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(report.status)}
                  color={getStatusColor(report.status)}
                  size="small"
                />
              </TableCell>
              <TableCell align="center">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleOpenDialog(report)}
                >
                  Revisar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          Moderación y Seguridad
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Control de abuso, reportes y mantenimiento de la seguridad del sistema
        </Typography>
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
          <Tab label="Reportes de Campañas" id="moderation-tab-0" />
          <Tab label="Reportes de Usuarios" id="moderation-tab-1" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <CampaignReportsTable />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <UserReportsTable />
        </TabPanel>
      </Paper>

      {/* Dialog de acción */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Revisar Reporte</DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Motivo:</strong> {selectedReport.reason}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Evidencia:</strong> {selectedReport.evidence}
              </Typography>
              <Typography variant="body2">
                <strong>Reportado por:</strong> {selectedReport.reporter}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={() => handleAction("warn")}
            startIcon={<WarningIcon />}
            variant="outlined"
          >
            Advertir
          </Button>
          <Button
            onClick={() => handleAction("suspend")}
            startIcon={<BlockIcon />}
            variant="outlined"
            color="warning"
          >
            Suspender
          </Button>
          <Button
            onClick={() => handleAction("approve")}
            startIcon={<DoneIcon />}
            variant="contained"
            color="success"
          >
            Resolver
          </Button>
          <Button
            onClick={() => handleAction("delete")}
            startIcon={<DeleteIcon />}
            variant="outlined"
            color="error"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
