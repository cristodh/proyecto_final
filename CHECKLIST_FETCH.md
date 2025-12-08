# CHECKLIST - Componentes y su estado de preparación para Fetch

## ✅ ADMIN DASHBOARD

### Sections
- [x] **CampaignsSection.jsx** - LISTO
  - [x] Datos ficticios eliminados
  - [x] fetch importado
  - [x] useEffect con TODO
  - [x] handleDelete implementado
  - [x] handleUpdate implementado
  - [x] botones con onClick

- [x] **ModerationSection.jsx** - LISTO
  - [x] Datos ficticios eliminados
  - [x] fetch importado
  - [x] useEffect con TODO
  - [x] handleAction implementado

- [x] **UserManagementSection.jsx** - LISTO
  - [x] Datos ficticios eliminados
  - [x] fetch importado
  - [x] useEffect con TODO
  - [x] handleDelete implementado
  - [x] handleToggleStatus implementado
  - [x] botones con onClick

- [ ] DashboardMain.jsx
  - [ ] Datos de gráficos aún ficticios
  - TODO: Eliminar o envolver en useState[]

- [ ] ImpactReportsSection.jsx
  - [ ] Datos de gráficos aún ficticios
  - TODO: Eliminar o envolver en useState[]

---

## ⏳ MANAGER PROFILE

### Pages
- [ ] ManageProfile/ManagerAnalytics/ManagerAnalytics.jsx
  - [ ] monthlyData, categoryFunds, topDonors aún ficticios
  - TODO: Mover a useState[] con useEffect + fetch

- [ ] ManageProfile/ManagerCampaigns/ManagerCampaigns.jsx
  - [ ] Array campaigns ficticioso
  - TODO: useState([]) + useEffect + fetch

### Components
- [ ] components/Statistics/Statistics.jsx
  - [ ] summaryCards, campaignFunds, donorsChart, recentActivity ficticios
  - TODO: useState([]) + useEffect + fetch

- [x] components/NewCampaign/AddCampaign.jsx
  - [x] Estructura ya lista para POST
  - TODO: Solo descomentar postData cuando esté listo

---

## ⏳ DONOR PROFILE

### Pages
- [ ] DonorMain/DonorMain.jsx
  - [ ] donorStats, recentProjects, achievements ficticios
  - TODO: Convertir a useState + useEffect + fetch

- [ ] DonorFollowed/DonorFollowed.jsx
  - [ ] Revisar datos
  - TODO: Asegurar fetch está activo

- [ ] DonorConfig/DonorConfig.jsx
  - [ ] ProfileForm con datos ficticios
  - TODO: Agregar putData comentado

---

## 🎯 COMO PROCEDER

### Para CampaignsSection (ya listo):
```jsx
// Paso 1: Buscar TODO en el archivo
// Paso 2: Descomentar las líneas
// const response = await getData('campaigns/');
// if (response) setCampaigns(response);

// Paso 3: Ajusta el endpoint según tu backend
// Paso 4: Prueba
```

### Para otros archivos no limpiados:
```jsx
// Paso 1: Crear useState([]) para los datos
// const [campanas, setCampanas] = useState([]);

// Paso 2: Agregar useEffect
// useEffect(() => {
//   const fetch = async () => {
//     // const response = await getData('endpoint/');
//     // setCampanas(response);
//   };
//   fetch();
// }, []);

// Paso 3: Reemplazar referencias a datos ficticios por el estado
```

---

## 📡 ENDPOINTS ESPERADOS

```
/campaigns/                     - GET listado
/campaigns/{id}/               - GET, PUT, DELETE individual
/users/                        - GET listado
/user/user_id/{id}/           - GET individual con token
/reports/campaigns/            - GET listado
/reports/users/                - GET listado
/statistics/manager/           - GET estadísticas
/statistics/admin/             - GET estadísticas
```

---

## 🚀 ESTADO GENERAL

✅ **Infraestructura de Fetch**: COMPLETA
✅ **PUT y DELETE**: IMPLEMENTADOS
✅ **Admin Sections**: LISTAS para conectar
⏳ **Manager y Donor Profiles**: SEMI-LISTAS (faltan conversiones de datos ficticios)

**Próximo paso**: Descomentar los fetch en los marcados con TODO cuando tengas el backend listo.
