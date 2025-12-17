# Guía de Integración - Tab de Donaciones en Modal de Campaña

## Ubicación del Componente

El componente `CampaignDonationsTab` está en:
```
src/ADMIN/components/CampaignDonationsTab.jsx
```

## Cómo Integrarlo

### Paso 1: Importar el componente

En tu archivo que renderiza el modal de campaña (probablemente en `ManagerProfile` o `ADMIN`):

```jsx
import CampaignDonationsTab from "../components/CampaignDonationsTab";
```

### Paso 2: Agregar el Tab

Asume que tienes un sistema de tabs (Material-UI Tabs). Agrega un nuevo tab:

```jsx
// En tu componente de lista de tabs
<Tab label="Donaciones Pendientes" value={tabValue} index={3} />
```

### Paso 3: Renderizar el Content del Tab

```jsx
import TabPanel from "@mui/material/TabPanel";

// En el renderizado
<TabPanel value={tabValue} index={3}>
  <CampaignDonationsTab 
    campaign={campaign}
    user={user}
    formatCurrency={formatCurrency}
    token={token}
    onDonationApproved={(newAmount) => {
      // Actualiza el monto actual de la campaña
      setCampaign(prev => ({
        ...prev,
        current_amount: newAmount
      }));
    }}
  />
</TabPanel>
```

## Props Requeridas

| Prop | Tipo | Descripción |
|------|------|-------------|
| `campaign` | Object | Objeto con datos de la campaña (id, current_amount, etc) |
| `user` | Object | Usuario autenticado |
| `formatCurrency` | Function | Función para formatear dinero (recibe amount, retorna string) |
| `token` | String | Token JWT para autenticación |
| `onDonationApproved` | Function | Callback cuando se aprueba una donación. Recibe el nuevo `current_amount` |

## Ejemplo Completo

```jsx
import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import CampaignDetailsModal from "./CampaignDetailsModal";
import CampaignDonationsTab from "./CampaignDonationsTab";
import TabPanel from "@mui/material/TabPanel";

export default function MyCampaignPage() {
  const [campaign, setCampaign] = useState({
    id: 1,
    name: "Mi Campaña",
    current_amount: 100000,
    // ... más datos
  });
  
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState({
    id: 1,
    username: "admin",
  });
  
  const token = localStorage.getItem("token");
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
    }).format(value || 0);
  };

  return (
    <Box>
      <Tabs value={tabValue} onChange={(e, val) => setTabValue(val)}>
        <Tab label="Detalles" />
        <Tab label="Descripción" />
        <Tab label="Configuración" />
        <Tab label="Donaciones Pendientes" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        {/* Detalles */}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Descripción */}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {/* Configuración */}
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <CampaignDonationsTab 
          campaign={campaign}
          user={user}
          formatCurrency={formatCurrency}
          token={token}
          onDonationApproved={(newAmount) => {
            setCampaign(prev => ({
              ...prev,
              current_amount: newAmount
            }));
          }}
        />
      </TabPanel>
    </Box>
  );
}
```

## Variables Importantes

### Campaign Object
```javascript
{
  id: 1,
  name: "Nombre de la campaña",
  current_amount: 150000,
  goal_amount: 500000,
  // ... más campos
}
```

### User Object
```javascript
{
  id: 1,
  username: "admin_user",
  email: "admin@example.com",
  role: 1, // o el que corresponda a admin/staff
  is_staff: true,
}
```

### Token
```javascript
// Obtenlo de localStorage, context, Redux, etc
const token = localStorage.getItem("authToken");
```

### formatCurrency Function
```javascript
const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 0,
  }).format(value || 0);
};
```

## Comportamiento

### Carga Automática
- El componente carga automáticamente las donaciones pendientes cuando se monta
- Usa `useEffect` con dependencia en `campaign.id` y `user.id`

### Actualización Manual
Para forzar una recarga (si es necesario):
```jsx
// Si agregas una ref al componente:
const donationsTabRef = useRef();
// Luego puedes llamar:
donationsTabRef.current.refetch();
```

### Estados del Componente
- **Loading**: Muestra spinner mientras carga
- **Error**: Muestra alert rojo con el error
- **Empty**: Muestra mensaje si no hay donaciones
- **Loaded**: Muestra lista de donaciones con botones

## Manejo de Errores

El componente maneja automáticamente:
- Errores de red
- Errores de autenticación
- Errores de permisos
- Errores del servidor

Los errores se muestran en un Alert en rojo.

## Configuración de URL Base

Por defecto, el componente usa:
```javascript
http://localhost:8000
```

Si necesitas cambiar la URL del backend, edita en el archivo:
```javascript
const response = await fetch(
  `http://localhost:8000/api/campaigns/...`
);
```

Alternativa: Usar variable de entorno
```javascript
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

const response = await fetch(
  `${API_BASE}/api/campaigns/donations/campaign/${campaign.id}/pending/`
);
```

## Permisos Requeridos

El componente solo funciona si:
- Usuario está autenticado (tiene token)
- Usuario es creator de la campaña O es staff (is_staff = true)

Si el usuario no tiene permisos, el backend retorna 403 (Forbidden).

## Mejoras Futuras

El componente está listo para agregar:
1. Paginación si hay muchas donaciones
2. Filtros (por estado, fecha, monto)
3. Búsqueda por donante
4. Exportar a CSV
5. Notificaciones en tiempo real (WebSocket)

## Debugging

Para ver logs en la consola, el componente usa `console.error()`. 
Puedes agregar más logs durante desarrollo en el componente.

## Performance

- Las donaciones se cargan solo cuando se abre el tab
- Solo se recargan si campaign.id o user.id cambian
- Las imágenes de Cloudinary se cargan desde CDN
