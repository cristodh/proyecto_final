# TODO - Limpieza de Datos Ficticios y Preparación de Fetch

## ✅ COMPLETADO

1. **src/services/fetch.js** - Funciones añadidas:
   - `postData()` - POST requests
   - `getData()` - GET requests
   - `tokenGetData()` - GET con autenticación
   - `putData()` - PUT requests para actualizar ✅
   - `deleteData()` - DELETE requests para eliminar ✅

2. **ADMIN Sections** - Parcialmente completado:
   - ✅ `CampaignsSection.jsx` - Datos ficticios eliminados, fetch comentado
   - ✅ `ModerationSection.jsx` - Datos ficticios eliminados, fetch comentado
   - ✅ `UserManagementSection.jsx` - Datos ficticios eliminados, fetch comentado
   - ⏳ `DashboardMain.jsx` - Datos ficticios de gráficos aún activos
   - ⏳ `ImpactReportsSection.jsx` - Datos ficticios de gráficos aún activos

---

## 📋 PENDIENTE POR LIMPIAR

### MANAGER PROFILE
- `pages/ManageProfile/ManagerAnalytics/ManagerAnalytics.jsx`
  - Eliminar: `monthlyData`, `donationDistribution`, `categoryFunds`, `topDonors`
  - Agregar fetch comentado para traer datos

- `pages/ManageProfile/ManagerCampaigns/ManagerCampaigns.jsx`
  - Eliminar: Array `campaigns` ficticioso
  - Agregar fetch comentado para traer campañas del usuario

- `components/Statistics/Statistics.jsx`
  - Eliminar: `summaryCards`, `campaignFunds`, `donorsChart`, `recentActivity`
  - Agregar fetch comentado para traer estadísticas

- `components/NewCampaign/AddCampaign.jsx`
  - Ya tiene estructura lista para POST
  - Descomenta `postData` cuando backend esté listo

### DONOR PROFILE
- `pages/DonorMain/DonorMain.jsx`
  - Eliminar: `donorStats`, `recentProjects`, `achievements`
  - Agregar fetch comentado para traer datos del donante

- `pages/DonorFollowed/DonorFollowed.jsx`
  - Eliminar datos ficticios si los hay
  - Asegurar fetch para traer proyectos seguidos

- `components/DonorConfigPage/ProfileForm.jsx`
  - Eliminar datos ficticios del perfil
  - Agregar `putData` comentado para actualizar perfil

### ADMIN DASHBOARD - GRÁFICOS
- `pages/AdminDashboard/AdminDashboard.jsx`
  - Eliminar: `ecosystemData`, `moderationData`, `impactData`
  - Agregar fetch comentado para traer datos

- `sections/DashboardMain.jsx`
  - Eliminar: `ecosystemData`, `moderationData`, `impactData`
  - Agregar fetch comentado para traer datos

- `sections/ImpactReportsSection.jsx`
  - Eliminar: `impactSocialData`, `impactFinancialData`, `topCampaigns`
  - Agregar fetch comentado para traer datos

---

## 🔧 PATRONES A USAR

### Estado vacío + useEffect + Fetch
```jsx
const [campaigns, setCampaigns] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      // const response = await getData('campaigns/');
      // if (response) setCampaigns(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### Actualizar (PUT)
```jsx
const handleUpdate = async (id, data) => {
  // TODO: Implementar actualizacion en backend
  try {
    // const response = await putData(`campaigns/${id}/`, data);
    // if (response.ok) {
    //   // Actualizar estado local
    // }
  } catch (error) {
    console.error('Error updating:', error);
  }
};
```

### Eliminar (DELETE)
```jsx
const handleDelete = async (id) => {
  // TODO: Implementar eliminacion en backend
  try {
    // const response = await deleteData(`campaigns/${id}/`);
    // if (response.ok) {
    //   // Remover del estado
    // }
  } catch (error) {
    console.error('Error deleting:', error);
  }
};
```

---

## 📡 ENDPOINTS ESPERADOS (Backend)

### Users
- GET `/user/new_users/` - Listar todos los usuarios
- GET `/user/user_id/{id}/` - Obtener usuario por ID
- PUT `/user/{id}/` - Actualizar usuario
- DELETE `/user/{id}/` - Eliminar usuario

### Campaigns
- GET `/campaigns/` - Listar todas las campañas
- GET `/campaigns/{id}/` - Obtener campaña por ID
- POST `/campaigns/create/` - Crear campaña
- PUT `/campaigns/{id}/` - Actualizar campaña
- DELETE `/campaigns/{id}/` - Eliminar campaña

### Reports
- GET `/reports/campaigns/` - Listar reportes de campañas
- GET `/reports/users/` - Listar reportes de usuarios
- PUT `/reports/{id}/` - Actualizar estado del reporte
- DELETE `/reports/{id}/` - Eliminar reporte

### Statistics
- GET `/statistics/manager/` - Estadísticas del organizador
- GET `/statistics/admin/` - Estadísticas del admin
- GET `/statistics/donor/` - Estadísticas del donante

---

## 🎯 PASOS SIGUIENTES

1. Una vez que el Backend esté listo, descomentar los fetch comentados
2. Reemplazar URLs de ejemplo con endpoints reales
3. Agregar manejo de errores y tokens según sea necesario
4. Probar cada sección con datos reales del backend
