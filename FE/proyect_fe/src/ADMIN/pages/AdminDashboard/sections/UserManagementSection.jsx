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

export default function UserManagementSection() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  const formatoFecha = (fecha) => {
    const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  }

  // Traer usuarios del backend
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
            role: user.role?.role || 'USER',
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

  const filteredUsers = users.filter(
    (u) =>
      (filterRole === "all" || u.role === filterRole) &&
      (filterStatus === "all" || u.status === filterStatus) &&
      (u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getRoleLabel = (role) => {
    switch (role) {
      case 1:
        return "Administrador de proyectos";
      case 2:
        return "Donante";
      case 3:
        return "Pendiente";
      case 5:
        return "Super Admin";
      default:
        return role;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "donor":
        return "primary";
      case "organizer":
        return "success";
      case "admin":
        return "warning";
      case "superadmin":
        return "error";
      default:
        return "default";
    }
  };

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

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

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

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          Gestión de Usuarios
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Control total del ecosistema humano de Fundify
        </Typography>
      </Box>

      {/* Filtros y búsqueda */}
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
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              label="Rol"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="donor">Donante</MenuItem>
              <MenuItem value="organizer">Organizador</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="superadmin">Super Admin</MenuItem>
            </TextField>
          </Grid>
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

      {/* Tabla de usuarios */}
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
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {user.username}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.email}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getRoleLabel(user.role)}
                    color={getRoleColor(user.role)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(user.status)}
                    color={getStatusColor(user.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">{user.donations}</TableCell>
                <TableCell>{formatoFecha(user.created_at) || "Sin fecha"}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={()=>{
                        console.log(user);
                        
                      }}
                      startIcon={<EditIcon />}
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleToggleStatus(user.id)}
                      startIcon={<BlockIcon />}
                      color={user.status === "active" ? "warning" : "success"}
                    >
                      {user.status === "active" ? "Suspender" : "Activar"}
                    </Button>
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
    </Container>
  );
}
