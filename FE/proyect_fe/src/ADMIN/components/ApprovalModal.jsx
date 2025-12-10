import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Box,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { putData } from "../../services/fetch";
import RejectionModal from "./RejectionModal";

// ============================================================
// COMPONENTE MODAL DE APROBACIÓN
// ============================================================
/**
 * ApprovalModal
 * Componente que muestra el modal para revisar y aprobar/rechazar solicitudes de usuarios
 * Maneja completamente la lógica de aprobación y rechazo internamente
 * 
 * @param {boolean} open - Estado de apertura del modal
 * @param {Object} selectedUser - Datos del usuario a revisar
 * @param {Object} organizationData - Datos de la organización del usuario
 * @param {boolean} loadingOrgData - Estado de carga de datos de organización
 * @param {Function} onClose - Callback para cerrar el modal
 * @param {Array} users - Lista de usuarios
 * @param {Function} setUsers - Función para actualizar lista de usuarios
 * @param {Function} formatDate - Función para formatear fechas
 */
export default function ApprovalModal({
  open,
  selectedUser,
  organizationData,
  loadingOrgData,
  onClose,
  users,
  setUsers,
  formatDate,
}) {
  // ============================================================
  // ESTADOS
  // ============================================================
  const [tabValue, setTabValue] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [openRejectionModal, setOpenRejectionModal] = useState(false);

  // ============================================================
  // FUNCIONES DE MANEJO
  // ============================================================
  /**
   * Maneja el cambio de tabs
   */
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  /**
   * Aprueba un usuario cambiendo su rol a "Gestor de Campañas" y activándolo
   */
  const handleApprove = async () => {
    if (!selectedUser) return;
    setIsProcessing(true);

    try {
      const response = await putData(`user/update_delete/`, {
        id: selectedUser.id,
        role_id: 1, // Gestor de Campañas
        active: true // Activar usuario
      });

      console.log('Approve response:', response);

      if (response && response.ok) {
        // Actualizar el usuario en el estado local
        setUsers(users.map((u) =>
          u.id === selectedUser.id ? { ...u, role_id: 1, role: 'Gestor de Campañas', status: 'active' } : u
        ));
        handleClose();
      }
    } catch (error) {
      console.error('Error approving user:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Rechaza un usuario abriendo el modal de razón de rechazo
   */
  const handleReject = () => {
    if (!selectedUser) return;
    setOpenRejectionModal(true);
  };

  /**
   * Confirma el rechazo del usuario con su motivo
   */
  const handleConfirmRejection = async (rejectionReason) => {
    if (!selectedUser) return;
    setIsProcessing(true);

    try {
      const response = await putData(`user/update_delete/`, {
        id: selectedUser.id,
        role_id: 4, // Denegado
        active: false // Desactivar usuario
      });

      console.log('Reject response:', response);

      if (response && response.ok) {
        // Actualizar el usuario en el estado local
        setUsers(users.map((u) =>
          u.id === selectedUser.id ? { ...u, role_id: 4, role: 'Denegado', status: 'inactive' } : u
        ));
        handleClose();
      }
    } catch (error) {
      console.error('Error rejecting user:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Cierra el modal
   */
  const handleClose = () => {
    setTabValue(0); // Resetear tab al cerrar
    onClose();
  };

  if (!selectedUser) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: 20 }}>
        Revisar Solicitud de Usuario
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* Tabs para navegar entre secciones */}
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="Información del Usuario" />
            <Tab label="Información de Organización" />
          </Tabs>

          {/* TAB 1: Información personal del usuario */}
          {tabValue === 0 && (
            <Box>
              <Grid container spacing={2}>
                {/* Usuario */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                    Usuario
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedUser.username}
                  </Typography>
                </Grid>
                {/* Email */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                    Email
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedUser.email}
                  </Typography>
                </Grid>
                {/* Nombre completo */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                    Nombre
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedUser.first_name} {selectedUser.last_name}
                  </Typography>
                </Grid>
                {/* Teléfono */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                    Teléfono
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedUser.phone_number || "No disponible"}
                  </Typography>
                </Grid>
                {/* Género */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                    Género
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedUser.gender || "No disponible"}
                  </Typography>
                </Grid>
                {/* Fecha de Nacimiento */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                    Fecha de Nacimiento
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {formatDate(selectedUser.date_of_birth) || "No disponible"}
                  </Typography>
                </Grid>
                {/* Cédula */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                    Cédula
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedUser.goverment_ID || "No disponible"}
                  </Typography>
                </Grid>
                {/* Nacionalidad */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                    Nacionalidad
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {selectedUser.nationality || "No disponible"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* TAB 2: Información de la organización del usuario */}
          {tabValue === 1 && (
            <Box>
              {/* Loading */}
              {loadingOrgData ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : organizationData ? (
                <Grid container spacing={2}>
                  {/* Nombre de Organización */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                      Nombre de Organización
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {organizationData.organization_name}
                    </Typography>
                  </Grid>
                  {/* Tipo de Organización */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                      Tipo de Organización
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {organizationData.organization_type}
                    </Typography>
                  </Grid>
                  {/* Cédula Jurídica */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                      Cédula Jurídica
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {organizationData.tax_id}
                    </Typography>
                  </Grid>
                  {/* Sitio Web */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                      Sitio Web
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {organizationData.website ? (
                        <a href={organizationData.website} target="_blank" rel="noopener noreferrer">
                          {organizationData.website}
                        </a>
                      ) : (
                        "No disponible"
                      )}
                    </Typography>
                  </Grid>
                  {/* Años de Experiencia */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                      Años de Experiencia
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {organizationData.experience_years}
                    </Typography>
                  </Grid>
                  {/* Área de Enfoque */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                      Área de Enfoque
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {organizationData.focus_area}
                    </Typography>
                  </Grid>
                  {/* Descripción */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                      Descripción
                    </Typography>
                    <Typography variant="body2">
                      {organizationData.description || "No disponible"}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Alert severity="info">No hay información de organización disponible para este usuario.</Alert>
              )}
            </Box>
          )}
        </Box>
      </DialogContent>
      {/* Botones de acciones del modal de aprobación */}
      <DialogActions sx={{ p: 2, gap: 1 }}>
        {/* Botón Cancelar */}
        <Button onClick={handleClose} variant="outlined" disabled={isProcessing}>
          Cancelar
        </Button>
        {/* Botón Aprobar */}
        <Button onClick={handleApprove} variant="contained" color="success" disabled={isProcessing}>
          {isProcessing ? "Procesando..." : "Aprobar"}
        </Button>
        {/* Botón Rechazar */}
        <Button onClick={handleReject} variant="outlined" color="error" disabled={isProcessing}>
          {isProcessing ? "Procesando..." : "Rechazar"}
        </Button>
      </DialogActions>

      {/* ========================================================
          MODAL DE RAZÓN DE RECHAZO
          ======================================================== */}
      <RejectionModal
        open={openRejectionModal}
        selectedUser={selectedUser}
        onClose={() => setOpenRejectionModal(false)}
        onConfirm={handleConfirmRejection}
      />
    </Dialog>
  );
}
