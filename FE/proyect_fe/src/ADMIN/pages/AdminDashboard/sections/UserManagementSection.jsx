// ============================================================
// IMPORTS Y DEPENDENCIAS
// ============================================================
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
  TextField,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import { getData, putData, deleteData } from "../../../../services/fetch";
import ApprovalModal from "../../../components/ApprovalModal";
import EditModal from "../../../components/EditModal";

export default function UserManagementSection() {
  // ============================================================
  // ESTADOS - GESTIÓN DE USUARIOS
  // ============================================================
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  // ============================================================
  // ESTADOS - MODAL DE APROBACIÓN
  // ============================================================
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [organizationData, setOrganizationData] = useState(null);
  const [loadingOrgData, setLoadingOrgData] = useState(false);

  // ============================================================
  // ESTADOS - MODAL DE EDICIÓN
  // ============================================================
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editOrgFormData, setEditOrgFormData] = useState({});
  const [savingEdit, setSavingEdit] = useState(false);

  // ============================================================
  // FUNCIONES UTILIDAD
  // ============================================================
  /**
   * Formatea una fecha al formato español (DD/MM/YYYY)
   * @param {string} fecha - Fecha en formato ISO
   * @returns {string} - Fecha formateada en español
   */
  const formatoFecha = (fecha) => {
    const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  }

  // ============================================================
  // EFECTOS - CARGA INICIAL DE USUARIOS
  // ============================================================
  /**
   * Obtiene la lista de usuarios del backend en el montaje del componente
   * Mapea los datos del backend al formato esperado por la UI
   */
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getData('user/new_users/');
        if (response) {
          // Mapear los datos del backend al formato esperado por la UI
          const formattedUsers = response.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role_name || 'User',
            role_id: user.role_id || null,
            status: user.active ? 'active' : 'inactive',
            phone_number: user.phone_number,
            date_of_birth: user.date_of_birth,
            goverment_ID: user.goverment_ID,
            gender: user.gender,
            nationality: user.nationality,
            created_at: user.created_at
          }));
          setUsers(formattedUsers);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // ============================================================
  // LÓGICA DE FILTRADO
  // ============================================================
  /**
   * Filtra los usuarios según el rol, estado y término de búsqueda
   */
  const filteredUsers = users.filter(
    (u) =>
      (filterRole === "all" || u.role_id === parseInt(filterRole)) &&
      (filterStatus === "all" || u.status === filterStatus) &&
      (u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // ============================================================
  // FUNCIONES DE MAPEO - ROLES Y COLORES
  // ============================================================
  /**
   * Obtiene la etiqueta de texto para un role_id
   * @param {number} role_id - ID del rol
   * @returns {string} - Nombre legible del rol
   */
  const getRoleLabel = (role_id) => {
    switch (role_id) {
      case 1:
        return "Gestor de Campañas";
      case 2:
        return "Donor";
      case 3:
        return "Pendiente de Aprobación";
      case 4:
        return "Denegado";
      case 5:
        return "Administrador";
      default:
        return role_id || "Sin rol";
    }
  };

  /**
   * Obtiene el color de Material UI para mostrar un role_id
   * @param {number} role_id - ID del rol
   * @returns {string} - Color de Material UI (success, default, warning, error, primary)
   */
  const getRoleColor = (role_id) => {
    switch (role_id) {
      case 1:
        return "success";
      case 2:
        return "default";
      case 3:
        return "warning";
      case 4:
        return "error";
      case 5:
        return "primary";
      default:
        return "error";
    }
  };

  /**
   * Obtiene el color de Material UI para mostrar el estado del usuario
   * @param {string} status - Estado (active, suspended, banned)
   * @returns {string} - Color de Material UI
   */
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "suspended":
        return "warning";
      case "banned":
        return "error";
      default:
        return "default";
    }
  };

  /**
   * Obtiene la etiqueta de texto para un estado
   * @param {string} status - Estado del usuario
   * @returns {string} - Etiqueta capitalizada
   */
  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // ============================================================
  // FUNCIONES CRUD - CAMBIOS EN USUARIOS
  // ============================================================
  /**
   * Cambia el rol de un usuario
   * @param {number} id - ID del usuario
   * @param {number} newRole - Nuevo role ID
   */
  const handleChangeRole = async (id, newRole) => {
    try {
      // Buscar el usuario actual para obtener todos sus datos
      const user = users.find(u => u.id === id);
      if (!user) return;
      
      // Enviar PUT al endpoint de actualización con el nuevo role
      const response = await putData(`user/update_delete/`, { 
        id: id,
        role: newRole 
      });
      
      if (response && response.ok) {
        setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
      }
    } catch (error) {
      console.error('Error changing role:', error);
    }
  };

  /**
   * Alterna el estado activo/inactivo del usuario
   * @param {number} id - ID del usuario
   */
  const handleToggleStatus = async (id) => {
    try {
      const user = users.find(u => u.id === id);
      if (!user) return;
      
      const newStatus = user.status === 'active' ? 'inactive' : 'active';
      const newActive = newStatus === 'active';
      
      // Enviar PUT para actualizar el estado activo del usuario
      const response = await putData(`user/update_delete/`, { 
        id: id,
        active: newActive 
      });

      console.log(response);
      
      
      if (response && response.ok) {
        setUsers(users.map((u) =>
          u.id === id ? { ...u, status: newStatus } : u
        ));
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  /**
   * Elimina un usuario del sistema
   * @param {number} id - ID del usuario a eliminar
   */
  const handleDelete = async (id) => {
    try {
      // Enviar DELETE para eliminar el usuario
      const response = await deleteData(`user/update_delete/?id=${id}`);
      
      if (response && response.ok) {
        setUsers(users.filter(u => u.id !== id));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // ============================================================
  // FUNCIONES DE APROBACIÓN Y RECHAZO
  // ============================================================
  // [MOVIDAS A ApprovalModal]
  // Las funciones handleApproveUser y handleRejectUser 
  // ahora se manejan directamente en el componente ApprovalModal

  // ============================================================
  // FUNCIONES DE MODAL - APROBACIÓN
  // ============================================================
  /**
   * Abre el modal de aprobación y carga los datos de la organización
   * @param {Object} user - Objeto usuario a revisar
   */
  const handleOpenModal = async (user) => {
    setSelectedUser(user);
    setOpenModal(true);
    setLoadingOrgData(true);

    // Traer datos de la organización si existe
    try {
      const response = await getData(`organization/`);
      if (response) {
        // Filtrar la organización del usuario actual
        const userOrg = response.find(org => org.manager === user.id);
        setOrganizationData(userOrg || null);
      }
    } catch (error) {
      console.error('Error fetching organization data:', error);
      setOrganizationData(null);
    } finally {
      setLoadingOrgData(false);
    }
  };

  /**
   * Cierra el modal de aprobación y limpia los estados
   */
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setOrganizationData(null);
  };

  // ============================================================
  // FUNCIONES DE MODAL - EDICIÓN
  // ============================================================
  /**
   * Abre el modal de edición con datos precargados del usuario
   * @param {Object} user - Objeto usuario a editar
   */
  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setEditFormData({
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      date_of_birth: user.date_of_birth,
      goverment_ID: user.goverment_ID,
      gender: user.gender,
      nationality: user.nationality,
    });

    // Cargar datos de la organización si no están cargados
    const loadOrgData = async () => {
      try {
        const response = await getData(`organization/`);
        if (response) {
          const userOrg = response.find(org => org.manager === user.id);
          if (userOrg) {
            setEditOrgFormData({
              organization_name: userOrg.organization_name || '',
              organization_type: userOrg.organization_type || '',
              tax_id: userOrg.tax_id || '',
              website: userOrg.website || '',
              experience_years: userOrg.experience_years || '',
              focus_area: userOrg.focus_area || '',
              description: userOrg.description || '',
            });
          } else {
            setEditOrgFormData({});
          }
        }
      } catch (error) {
        console.error('Error loading organization data:', error);
        setEditOrgFormData({});
      }
    };

    loadOrgData();
    setOpenEditModal(true);
  };

  /**
   * Cierra el modal de edición y limpia los estados
   */
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedUser(null);
    setEditFormData({});
    setEditOrgFormData({});
  };

  // ============================================================
  // FUNCIONES DE FORMULARIOS - ACTUALIZACIÓN DE DATOS
  // ============================================================
  /**
   * Actualiza los datos del formulario de edición del usuario
   * @param {string} field - Campo a actualizar
   * @param {any} value - Nuevo valor del campo
   */
  const handleEditFormChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Actualiza los datos del formulario de edición de la organización
   * @param {string} field - Campo a actualizar
   * @param {any} value - Nuevo valor del campo
   */
  const handleEditOrgFormChange = (field, value) => {
    setEditOrgFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ============================================================
  // FUNCIONES DE GUARDADO
  // ============================================================
  /**
   * Guarda los cambios realizados en la edición de usuario y/o organización
   * Realiza dos PUT requests: uno para el usuario y otro para la organización (si existen cambios)
   */
  const handleSaveEdit = async () => {
    if (!selectedUser) return;
    setSavingEdit(true);

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
            } else {
              console.warn('Organization update may have failed:', orgResponse);
            }
          } catch (error) {
            console.error('Error updating organization:', error);
          }
        }

        handleCloseEditModal();
      } else {
        console.warn('User update may have failed:', userResponse);
      }
    } catch (error) {
      console.error('Error saving edit:', error);
    } finally {
      setSavingEdit(false);
    }
  };

  // ============================================================
  // RENDERIZADO JSX
  // ============================================================
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* ========================================================
          ENCABEZADO PRINCIPAL
          ======================================================== */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          Gestión de Usuarios
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Control total del ecosistema humano de Fundify
        </Typography>
      </Box>

      {/* ========================================================
          SECCIÓN DE FILTROS Y BÚSQUEDA
          ======================================================== */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          border: 1,
          borderColor: "custom.borderLight",
        }}
      >
        <Grid container spacing={2}>
          {/* Campo de búsqueda por usuario o email */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar por usuario o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          {/* Filtro por rol */}
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              label="Rol"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="1">Colaborador</MenuItem>
              <MenuItem value="2">Administrador</MenuItem>
              <MenuItem value="3">Gestor de Campañas</MenuItem>
              <MenuItem value="4">Denegado</MenuItem>
            </TextField>
          </Grid>
          {/* Filtro por estado */}
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              label="Estado"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="active">Activo</MenuItem>
              <MenuItem value="suspended">Suspendido</MenuItem>
              <MenuItem value="banned">Baneado</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* ========================================================
          TABLA DE USUARIOS
          ======================================================== */}
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
          {/* Encabezados de la tabla */}
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Usuario</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Rol</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Donaciones
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Se creó el: </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          {/* Cuerpo de la tabla con datos de usuarios */}
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} hover>
                {/* Columna: Usuario */}
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {user.username}
                  </Typography>
                </TableCell>
                {/* Columna: Email */}
                <TableCell>
                  <Typography variant="body2">{user.email}</Typography>
                </TableCell>
                {/* Columna: Rol con badge de color */}
                <TableCell>
                  <Chip
                    label={getRoleLabel(user.role_id)}
                    color={getRoleColor(user.role_id)}
                    size="small"
                  />
                </TableCell>
                {/* Columna: Estado con badge de color */}
                <TableCell>
                  <Chip
                    label={getStatusLabel(user.status)}
                    color={getStatusColor(user.status)}
                    size="small"
                  />
                </TableCell>
                {/* Columna: Donaciones */}
                <TableCell align="right">{user.donations}</TableCell>
                {/* Columna: Fecha de creación */}
                <TableCell>{formatoFecha(user.created_at) || "Sin fecha"}</TableCell>
                {/* Columna: Botones de acciones */}
                <TableCell align="center">
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                    {/* Botón Ver/Editar */}
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleOpenEditModal(user)}
                      startIcon={<EditIcon />}
                    >
                      Ver/Editar
                    </Button>
                    {/* Botón Verificar (solo para usuarios pendientes de aprobación) */}
                    {user.role_id === 3 && (
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => handleOpenModal(user)}
                      >
                        Verificar
                      </Button>
                    )}
                    {/* Botón Suspender/Activar */}
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleToggleStatus(user.id)}
                      startIcon={<BlockIcon />}
                      color={user.status === "active" ? "warning" : "success"}
                    >
                      {user.status === "active" ? "Suspender" : "Activar"}
                    </Button>
                    {/* Botón Eliminar */}
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(user.id)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ========================================================
          MODAL DE APROBACIÓN DE USUARIOS
          ======================================================== */}
      <ApprovalModal
        open={openModal}
        selectedUser={selectedUser}
        organizationData={organizationData}
        loadingOrgData={loadingOrgData}
        onClose={handleCloseModal}
        users={users}
        setUsers={setUsers}
        formatDate={formatoFecha}
      />

      {/* ========================================================
          MODAL DE EDICIÓN DE USUARIOS
          ======================================================== */}
      <EditModal
        open={openEditModal}
        selectedUser={selectedUser}
        editFormData={editFormData}
        onFormChange={handleEditFormChange}
        editOrgFormData={editOrgFormData}
        onOrgFormChange={handleEditOrgFormChange}
        saving={savingEdit}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
        users={users}
        setUsers={setUsers}
        organizationData={organizationData}
        onCloseEditModal={handleCloseEditModal}
      />
    </Container>
  );
}
