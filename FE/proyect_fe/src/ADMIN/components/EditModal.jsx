import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Box,
  Grid,
  TextField,
  Alert,
  Button,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { putData, getData, authenticatedGetData } from "../../services/fetch";

// ============================================================
// COMPONENTE MODAL DE EDICIÓN
// ============================================================
/**
 * EditModal
 * Componente que muestra el modal para editar información del usuario y organización
 * Maneja completamente la lógica de guardado (normal y con aprobación)
 * 
 * @param {boolean} open - Estado de apertura del modal
 * @param {Object} selectedUser - Datos del usuario a editar
 * @param {Object} editFormData - Datos del formulario del usuario
 * @param {Function} onFormChange - Callback para cambios en formulario del usuario
 * @param {Object} editOrgFormData - Datos del formulario de organización
 * @param {Function} onOrgFormChange - Callback para cambios en formulario de organización
 * @param {boolean} saving - Estado de guardado
 * @param {Function} onClose - Callback para cerrar el modal
 * @param {Array} users - Lista de usuarios
 * @param {Function} setUsers - Función para actualizar lista de usuarios
 * @param {Object} organizationData - Datos de la organización del usuario
 * @param {Function} onCloseEditModal - Callback para cerrar el modal de edición
 */
export default function EditModal({
  open,
  selectedUser,
  editFormData,
  onFormChange,
  editOrgFormData,
  onOrgFormChange,
  saving,
  onClose,
  onSave,
  users,
  setUsers,
  organizationData,
  onCloseEditModal,
}) {
  // ============================================================
  // ESTADOS
  // ============================================================
  const [tabValue, setTabValue] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [rejectionReason, setRejectionReason] = useState(null);
  const [loadingReason, setLoadingReason] = useState(false);
  const [isEditingReason, setIsEditingReason] = useState(false);
  const [editedReason, setEditedReason] = useState("");
  const [openChangeRoleDialog, setOpenChangeRoleDialog] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedNewRole, setSelectedNewRole] = useState("");
  const [loadingRoles, setLoadingRoles] = useState(false);

  // ============================================================
  // EFECTOS
  // ============================================================
  /**
   * Carga el motivo de rechazo cuando el modal se abre y el usuario tiene rol 4
   * También carga los roles disponibles cuando se abre el modal
   */
  useEffect(() => {
    if (open && selectedUser && selectedUser.role_id === 4) {
      loadRejectionReason();
    }
    if (open) {
      loadRoles();
    }
  }, [open, selectedUser]);

  /**
   * Carga el motivo de rechazo del usuario desde el backend
   */
  const loadRejectionReason = async () => {
    setLoadingReason(true);
    try {
      const response = await authenticatedGetData(`user/rejection_reason/?user_id=${selectedUser.id}`);
      if (response && response.rejection_reason) {
        setRejectionReason(response.rejection_reason);
        setEditedReason(response.rejection_reason);
      }
    } catch (error) {
      console.error('Error loading rejection reason:', error);
    } finally {
      setLoadingReason(false);
    }
  };

  /**
   * Carga los roles disponibles desde el backend
   */
  const loadRoles = async () => {
    setLoadingRoles(true);
    try {
      const response = await authenticatedGetData('user/new_roles/');
      if (response && Array.isArray(response)) {
        setRoles(response);
      }
    } catch (error) {
      console.error('Error loading roles:', error);
    } finally {
      setLoadingRoles(false);
    }
  };

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
   * Abre el diálogo para cambiar el rol del usuario
   */
  const handleOpenChangeRoleDialog = () => {
    setSelectedNewRole(selectedUser?.role_id || "");
    setOpenChangeRoleDialog(true);
  };

  /**
   * Cierra el diálogo de cambio de rol
   */
  const handleCloseChangeRoleDialog = () => {
    setOpenChangeRoleDialog(false);
    setSelectedNewRole("");
  };

  /**
   * Cambia el rol del usuario
   */
  const handleChangeRole = async () => {
    if (!selectedNewRole) {
      return;
    }

    setIsSaving(true);
    try {
      const response = await putData(`user/update_delete/`, {
        id: selectedUser.id,
        role_id: selectedNewRole
      });

      if (response && (response.ok || response.message === 'User updated successfully')) {
        // Actualizar la lista de usuarios localmente
        const roleObj = roles.find(r => r.id === parseInt(selectedNewRole));
        setUsers(users.map(u =>
          u.id === selectedUser.id ? { ...u, role_id: parseInt(selectedNewRole), role: roleObj?.role || u.role } : u
        ));
        handleCloseChangeRoleDialog();
        alert('Rol actualizado exitosamente');
      } else {
        alert('Error al actualizar el rol: ' + (response?.error || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error changing role:', error);
      alert('Error al cambiar el rol');
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Cambia el rol a Pendiente (3) y guarda
   */
  const handleSetPending = async () => {
    setIsSaving(true);
    try {
      const userResponse = await putData(`user/update_delete/`, {
        id: selectedUser.id,
        role_id: 3, // Cambiar a Pendiente
        active: false,
        ...editFormData
      });

      console.log('User set pending response:', userResponse);

      if (userResponse && (userResponse.ok || userResponse.message === 'User updated successfully')) {
        // Actualizar la lista de usuarios localmente
        setUsers(users.map(u =>
          u.id === selectedUser.id ? { ...u, role_id: 3, role: 'Pendiente', status: 'pending', ...editFormData } : u
        ));
        handleClose();
      }
    } catch (error) {
      console.error('Error setting user to pending:', error);
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Guarda el motivo de rechazo editado
   */
  const handleSaveRejectionReason = async () => {
    if (!editedReason.trim()) {
      alert("Por favor ingresa un motivo de rechazo");
      return;
    }

    setIsSaving(true);
    try {
      const response = await putData(`user/rejection_reason/`, {
        user: selectedUser.id,
        rejection_reason: editedReason,
      });

      if (response && (response.ok || response.message === "Rejection reason updated successfully" || response.message === "Rejection reason created successfully")) {
        setRejectionReason(editedReason);
        setIsEditingReason(false);
        alert("Motivo del rechazo actualizado correctamente");
      }
    } catch (error) {
      console.error("Error saving rejection reason:", error);
      alert("Error al guardar el motivo del rechazo");
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Ejecuta el guardado normal (solo actualiza información sin cambiar rol)
   */
  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      // Actualizar usuario
      const userResponse = await putData(`user/update_delete/`, {
        id: selectedUser.id,
        ...editFormData
      });

      console.log('User update response:', userResponse);

      if (userResponse && (userResponse.ok || userResponse.message === 'User updated successfully')) {
        // Actualizar la lista de usuarios localmente
        setUsers(users.map(u =>
          u.id === selectedUser.id ? { ...u, ...editFormData } : u
        ));

        // Si hay datos de organización para actualizar
        if (organizationData && Object.keys(editOrgFormData).length > 0) {
          try {
            const orgResponse = await putData(`organization/update_delete/`, {
              id: organizationData.id,
              ...editOrgFormData
            });

            console.log('Organization update response:', orgResponse);

            if (orgResponse && (orgResponse.ok || orgResponse.message === 'Organization updated successfully')) {
              console.log('Organization updated successfully');
            }
          } catch (error) {
            console.error('Error updating organization:', error);
          }
        }

        handleClose();
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Ejecuta la aprobación y guardado
   * Cambia el rol de Denegado (4) a Gestor de Campañas (1)
   * Activa el usuario (active: true)
   * También actualiza la información del usuario si hay cambios
   */
  const handleApproveAndSave = async () => {
    setIsSaving(true);
    try {
      // Actualizar usuario con rol 1 (Gestor de Campañas) y activo
      const userResponse = await putData(`user/update_delete/`, {
        id: selectedUser.id,
        role_id: 1, // Cambiar a Gestor de Campañas
        active: true, // Activar usuario
        ...editFormData
      });

      console.log('User approve and save response:', userResponse);

      if (userResponse && (userResponse.ok || userResponse.message === 'User updated successfully')) {
        // Actualizar la lista de usuarios localmente
        setUsers(users.map(u =>
          u.id === selectedUser.id ? { ...u, role_id: 1, role: 'Gestor de Campañas', status: 'active', ...editFormData } : u
        ));

        // Si hay datos de organización para actualizar
        if (organizationData && Object.keys(editOrgFormData).length > 0) {
          try {
            const orgResponse = await putData(`organization/update_delete/`, {
              id: organizationData.id,
              ...editOrgFormData
            });

            console.log('Organization update response:', orgResponse);

            if (orgResponse && (orgResponse.ok || orgResponse.message === 'Organization updated successfully')) {
              console.log('Organization updated successfully');
            }
          } catch (error) {
            console.error('Error updating organization:', error);
          }
        }

        handleClose();
      }
    } catch (error) {
      console.error('Error approving and saving user:', error);
    } finally {
      setIsSaving(false);
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
        Editar Información del Usuario
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* Tabs para navegar entre secciones */}
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="Información del Usuario" />
            <Tab label="Información de Organización" />
            {/* Tab de motivo de rechazo solo si el usuario tiene rol 4 (Denegado) */}
            {selectedUser && selectedUser.role_id === 4 && (
              <Tab label="Motivo del Rechazo" />
            )}
          </Tabs>

          {/* TAB 1: Formulario de edición del usuario */}
          {tabValue === 0 && (
            <Box>
              <Grid container spacing={2}>
                {/* Campo: Usuario */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Usuario"
                    value={editFormData.username || ""}
                    onChange={(e) => onFormChange("username", e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                {/* Campo: Email */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={editFormData.email || ""}
                    onChange={(e) => onFormChange("email", e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                {/* Campo: Nombre */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    value={editFormData.first_name || ""}
                    onChange={(e) => onFormChange("first_name", e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                {/* Campo: Apellido */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Apellido"
                    value={editFormData.last_name || ""}
                    onChange={(e) => onFormChange("last_name", e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                {/* Campo: Teléfono */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    value={editFormData.phone_number || ""}
                    onChange={(e) => onFormChange("phone_number", e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                {/* Campo: Fecha de Nacimiento */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Fecha de Nacimiento"
                    type="date"
                    value={editFormData.date_of_birth || ""}
                    onChange={(e) => onFormChange("date_of_birth", e.target.value)}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                {/* Campo: Cédula */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cédula"
                    value={editFormData.goverment_ID || ""}
                    onChange={(e) => onFormChange("goverment_ID", e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                {/* Campo: Género */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Género"
                    value={editFormData.gender || ""}
                    onChange={(e) => onFormChange("gender", e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                {/* Campo: Nacionalidad */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nacionalidad"
                    value={editFormData.nationality || ""}
                    onChange={(e) => onFormChange("nationality", e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* TAB 2: Formulario de edición de la organización */}
          {tabValue === 1 && (
            <Box>
              {/* Validar si hay datos de organización */}
              {Object.keys(editOrgFormData).length > 0 ? (
                <Grid container spacing={2}>
                  {/* Campo: Nombre de Organización */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nombre de Organización"
                      value={editOrgFormData.organization_name || ""}
                      onChange={(e) => onOrgFormChange("organization_name", e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  {/* Campo: Tipo de Organización */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Tipo de Organización"
                      value={editOrgFormData.organization_type || ""}
                      onChange={(e) => onOrgFormChange("organization_type", e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  {/* Campo: Cédula Jurídica */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Cédula Jurídica"
                      value={editOrgFormData.tax_id || ""}
                      onChange={(e) => onOrgFormChange("tax_id", e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  {/* Campo: Sitio Web */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Sitio Web"
                      value={editOrgFormData.website || ""}
                      onChange={(e) => onOrgFormChange("website", e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  {/* Campo: Años de Experiencia */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Años de Experiencia"
                      value={editOrgFormData.experience_years || ""}
                      onChange={(e) => onOrgFormChange("experience_years", e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  {/* Campo: Área de Enfoque */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Área de Enfoque"
                      value={editOrgFormData.focus_area || ""}
                      onChange={(e) => onOrgFormChange("focus_area", e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  {/* Campo: Descripción */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Descripción"
                      value={editOrgFormData.description || ""}
                      onChange={(e) => onOrgFormChange("description", e.target.value)}
                      variant="outlined"
                      size="small"
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Alert severity="info">No hay información de organización disponible para este usuario.</Alert>
              )}
            </Box>
          )}

          {/* TAB 3: Motivo del rechazo (solo si rol = 4) */}
          {selectedUser && selectedUser.role_id === 4 && tabValue === 2 && (
            <Box>
              {loadingReason ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : isEditingReason ? (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: "text.secondary" }}>
                    Editar Motivo del Rechazo
                  </Typography>
                  <TextField
                    fullWidth
                    label="Motivo del rechazo"
                    value={editedReason}
                    onChange={(e) => setEditedReason(e.target.value)}
                    variant="outlined"
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      onClick={handleSaveRejectionReason}
                      variant="contained"
                      color="primary"
                      disabled={isSaving}
                      size="small"
                    >
                      {isSaving ? "Guardando..." : "Guardar"}
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditingReason(false);
                        setEditedReason(rejectionReason);
                      }}
                      variant="outlined"
                      size="small"
                      disabled={isSaving}
                    >
                      Cancelar
                    </Button>
                  </Box>
                </Box>
              ) : rejectionReason ? (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: "text.secondary" }}>
                    Motivo del Rechazo
                  </Typography>
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {rejectionReason}
                  </Alert>
                  <Button
                    onClick={() => setIsEditingReason(true)}
                    variant="contained"
                    color="warning"
                    size="small"
                  >
                    Editar Comentario
                  </Button>
                </Box>
              ) : (
                <Alert severity="info">No hay motivo de rechazo registrado para este usuario.</Alert>
              )}
            </Box>
          )}
        </Box>
      </DialogContent>
      {/* Botones de acciones del modal de edición */}
      <DialogActions sx={{ p: 2, gap: 1, flexWrap: 'wrap' }}>
        {/* Botón Cancelar */}
        <Button onClick={handleClose} variant="outlined">
          Cancelar
        </Button>
        {/* Botón Cambiar Rol */}
        <Button 
          onClick={handleOpenChangeRoleDialog}
          variant="contained" 
          color="secondary"
          disabled={isSaving}
        >
          Cambiar Rol
        </Button>
        {/* Botón Guardar Cambios */}
        <Button onClick={handleSaveChanges} variant="contained" color="primary" disabled={isSaving}>
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </Button>
        {/* Botón Establecer como Pendiente (solo para Gestor de Proyectos - role_id 1) */}
        {selectedUser && selectedUser.role_id === 1 && (
          <Button 
            onClick={handleSetPending} 
            variant="contained" 
            color="info"
            disabled={isSaving}
          >
            {isSaving ? "Procesando..." : "Establecer como Pendiente"}
          </Button>
        )}
        {/* Botón Aprobar (solo si el usuario está en rol Denegado - id 4) */}
        {selectedUser && selectedUser.role_id === 4 && (
          <Button 
            onClick={handleApproveAndSave} 
            variant="contained" 
            color="success" 
            disabled={isSaving}
          >
            {isSaving ? "Procesando..." : "Aprobar y Guardar"}
          </Button>
        )}
      </DialogActions>

      {/* Diálogo para cambiar rol */}
      <Dialog open={openChangeRoleDialog} onClose={handleCloseChangeRoleDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Cambiar Rol</DialogTitle>
        <DialogContent sx={{ minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {loadingRoles ? (
            <CircularProgress />
          ) : roles && roles.length > 0 ? (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Nuevo rol</InputLabel>
              <Select
                value={selectedNewRole}
                label="Nuevo rol"
                onChange={(e) => setSelectedNewRole(e.target.value)}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Typography color="error">No hay roles disponibles</Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseChangeRoleDialog} variant="outlined">
            Cancelar
          </Button>
          <Button 
            onClick={handleChangeRole} 
            variant="contained" 
            color="primary"
            disabled={isSaving || !selectedNewRole || loadingRoles}
          >
            Cambiar
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
