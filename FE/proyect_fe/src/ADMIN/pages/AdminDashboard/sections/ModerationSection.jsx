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
  CircularProgress,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import BlockIcon from "@mui/icons-material/Block";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getAdminData,
  patchData,
  deleteData,
  putData,
  authenticatedPostData,
} from "../../../../services/fetch";

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
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [actionReason, setActionReason] = useState("");

  const reasonLabels = {
    spam: "Spam o contenido no deseado",
    fraud: "Fraude o estafa",
    abuse: "Acoso o abuso",
    inappropriate: "Contenido inapropiado",
    other: "Otro",
  };

  const normalizeReports = (items) =>
    items.map((report) => ({
      id: report.id,
      type: report.report_type || (report.campaign ? "campaign" : "user"),
      campaignName: report.campaign_name,
      campaignId: report.campaign,
      reportedUserName: report.reported_user_username,
      reportedUserId: report.reported_user,
      reporterName: report.reporter_username,
      reasonCode: report.reason,
      reasonLabel: reasonLabels[report.reason] || report.reason,
      description: report.description || "Sin descripción",
      status: report.status,
      createdAt: report.created_at,
      createdAtText: report.created_at
        ? new Date(report.created_at).toLocaleString("es-CR", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        : "",
      donationId: report.donation,
      raw: report,
    }));

  const loadReports = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const [campaignData, userData] = await Promise.all([
        getAdminData("campaign/reports/?type=campaign"),
        getAdminData("campaign/reports/?type=user"),
      ]);

      if (!campaignData || !campaignData.results) {
        setCampaignReports([]);
      } else {
        const normalizedCampaigns = normalizeReports(campaignData.results).filter(
          (r) => r.type === "campaign"
        );
        setCampaignReports(normalizedCampaigns);
      }

      if (!userData || !userData.results) {
        setUserReports([]);
      } else {
        const normalizedUsers = normalizeReports(userData.results).filter(
          (r) => r.type === "user"
        );
        setUserReports(normalizedUsers);
      }

      if ((!campaignData || !campaignData.results) && (!userData || !userData.results)) {
        setErrorMessage("No se pudo obtener la lista de reportes");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      setErrorMessage("Error al cargar los reportes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "warning";
      case "reviewed":
        return "info";
      case "dismissed":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status) => {
    return status === "open"
      ? "Pendiente"
      : status === "reviewed"
        ? "Revisado"
        : status === "dismissed"
          ? "Descartado"
          : status;
  };

  const handleOpenDialog = (report) => {
    setSelectedReport(report);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReport(null);
    setActionReason("");
  };

  const handleAction = async (action) => {
    if (!selectedReport) return;

    const requiresReason = action !== "delete" && action !== "omit" ? true : action === "omit" ? false : true;
    if (requiresReason && !actionReason.trim()) {
      setErrorMessage("Debes ingresar un motivo para esta acción");
      return;
    }

    const statusMap = {
      warn: "reviewed",
      suspend: "reviewed",
      approve: "reviewed",
      delete: "dismissed",
      omit: "dismissed",
    };

    setActionLoading(true);
    setErrorMessage("");
    try {
      if (selectedReport.type === "campaign") {
        if (action === "approve") {
          // Denegar campaña: actualizar estado de la campaña con motivo
          await patchData(`campaign/status/${selectedReport.campaignId}/`, {
            campaign_status: "rejected",
            admin_comment: actionReason,
          });
          await patchData(`campaign/reports/${selectedReport.id}/`, {
            status: statusMap[action] || "reviewed",
          });
        } else if (action === "omit") {
          await patchData(`campaign/reports/${selectedReport.id}/`, {
            status: statusMap[action] || "dismissed",
          });
        } else {
          // warn / suspend -> solo marcar revisado con motivo
          await patchData(`campaign/reports/${selectedReport.id}/`, {
            status: statusMap[action] || "reviewed",
            admin_comment: actionReason,
          });
        }
      } else if (selectedReport.type === "user") {
        if (action === "approve" || action === "suspend" || action === "warn") {
          // Suspender/desactivar usuario reportado
          if (selectedReport.reportedUserId) {
            await putData("users/update_delete/", {
              id: selectedReport.reportedUserId,
              active: false,
            });
            await authenticatedPostData("users/rejection_reason/", {
              user: selectedReport.reportedUserId,
              rejection_reason: actionReason,
            });
          }
          await patchData(`campaign/reports/${selectedReport.id}/`, {
            status: statusMap[action] || "reviewed",
          });
        } else if (action === "omit") {
          await patchData(`campaign/reports/${selectedReport.id}/`, {
            status: statusMap[action] || "dismissed",
          });
        } else if (action === "delete") {
          await deleteData(`campaign/reports/${selectedReport.id}/`);
        }
      } else {
        // Fallback: solo actualizar estado del reporte
        if (action === "delete") {
          await deleteData(`campaign/reports/${selectedReport.id}/`);
        } else {
          await patchData(`campaign/reports/${selectedReport.id}/`, {
            status: statusMap[action] || "reviewed",
          });
        }
      }

      await loadReports();
      handleCloseDialog();
    } catch (error) {
        console.error('Error processing action:', error);
        setErrorMessage('No se pudo completar la acción');
    } finally {
      setActionLoading(false);
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
          {campaignReports.length === 0 && !loading && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="body2" color="text.secondary">
                  No hay reportes de campañas
                </Typography>
              </TableCell>
            </TableRow>
          )}

          {campaignReports.map((report) => (
            <TableRow key={report.id} hover>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {report.campaignName}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <WarningIcon sx={{ fontSize: 18, color: "warning.main" }} />
                  {report.reasonLabel}
                </Box>
              </TableCell>
              <TableCell>{report.reporterName || "-"}</TableCell>
              <TableCell>{report.createdAtText}</TableCell>
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
          {userReports.length === 0 && !loading && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="body2" color="text.secondary">
                  No hay reportes de usuarios
                </Typography>
              </TableCell>
            </TableRow>
          )}

          {userReports.map((report) => (
            <TableRow key={report.id} hover>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {report.reportedUserName}
                </Typography>
              </TableCell>
              <TableCell>{report.reasonLabel}</TableCell>
              <TableCell>{report.reporterName || "-"}</TableCell>
              <TableCell>{report.createdAtText}</TableCell>
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

      {errorMessage && (
        <Box sx={{ mb: 2 }}>
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        </Box>
      )}

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

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress size={28} />
        </Box>
      )}

      {/* Dialog de acción */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Revisar Reporte</DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Motivo:</strong> {selectedReport.reasonLabel}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Descripción:</strong> {selectedReport.description}
              </Typography>
              <Typography variant="body2">
                <strong>Reportado por:</strong> {selectedReport.reporterName || "-"}
              </Typography>
              {selectedReport.campaignName && (
                <Typography variant="body2">
                  <strong>Campaña:</strong> {selectedReport.campaignName}
                </Typography>
              )}
              {selectedReport.reportedUserName && (
                <Typography variant="body2">
                  <strong>Usuario:</strong> {selectedReport.reportedUserName}
                </Typography>
              )}
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Motivo del administrador (obligatorio para cambiar estado):
                </Typography>
                <textarea
                  style={{ width: "100%", minHeight: 80, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder="Describe el motivo de la decisión"
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={() => handleAction("warn")}
            startIcon={<WarningIcon />}
            variant="outlined"
            disabled={actionLoading}
          >
            Advertir
          </Button>
          <Button
            onClick={() => handleAction("suspend")}
            startIcon={<BlockIcon />}
            variant="outlined"
            color="warning"
            disabled={actionLoading}
          >
            Suspender
          </Button>
          <Button
            onClick={() => handleAction("approve")}
            startIcon={<DoneIcon />}
            variant="contained"
            color="success"
            disabled={actionLoading}
          >
            Resolver / Denegar
          </Button>
          <Button
            onClick={() => handleAction("omit")}
            startIcon={<DeleteIcon />}
            variant="outlined"
            color="error"
            disabled={actionLoading}
          >
            Omitir reporte
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
