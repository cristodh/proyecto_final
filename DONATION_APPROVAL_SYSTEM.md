# Sistema de Aprobación de Donaciones - Documentación Completa

## Overview
Se ha implementado un sistema completo de aprobación de donaciones donde:
1. Los usuarios donantes crean donaciones con comprobante de pago
2. Las donaciones comienzan en estado **"pending"** (pendiente)
3. El admin ve estas donaciones en un tab del modal de campaña
4. El admin puede **aprobar** o **rechazar** cada donación
5. Cuando se aprueba, el monto se suma automáticamente al `current_amount` de la campaña

## Cambios en Backend

### Modelo Donation (campaigns/models.py)
Se agregaron nuevos campos y estados:

```python
DONATION_STATUS = [
    ('pending', 'Pending'),
    ('approved', 'Approved'),
    ('rejected', 'Rejected'),
]

# Nuevos campos
donation_status = models.CharField(max_length=20, choices=DONATION_STATUS, default='pending')
approved_at = models.DateTimeField(blank=True, null=True)
approved_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, blank=True, null=True, related_name='approved_donations')
rejection_reason = models.TextField(blank=True, null=True)
```

### Serializers (campaigns/serializers.py)
Se actualizó `DonationSerializer` para incluir:
- `donation_status`
- `approved_at`
- `approved_by`
- `approved_by_username` (read-only)
- `rejection_reason`

### Nuevas Vistas (campaigns/views.py)

#### 1. DonationApprovalsView
```
GET /api/campaigns/donations/campaign/{campaign_id}/pending/
```
- Requiere autenticación
- Solo visible para creator de campaña o staff
- Retorna todas las donaciones pendientes de una campaña

**Respuesta:**
```json
{
  "pending_donations": [
    {
      "id": 1,
      "amount": "10000.00",
      "donation_status": "pending",
      "proof_of_payment_url": "https://...",
      "proof_of_payment_description": "...",
      ...
    }
  ],
  "count": 1
}
```

#### 2. DonationApproveView
```
PATCH /api/campaigns/donations/{donation_id}/approve/
```
- Requiere autenticación
- Solo para creator o staff
- Valida que la donación esté en estado "pending"
- Actualiza:
  - `donation_status` → "approved"
  - `approved_at` → timestamp actual
  - `approved_by` → usuario que aprobó
- **Suma automáticamente el monto a `campaign.current_amount`**

**Respuesta:**
```json
{
  "message": "Donación aprobada exitosamente",
  "donation": { ... },
  "campaign_current_amount": "150000.00"
}
```

#### 3. DonationRejectView
```
PATCH /api/campaigns/donations/{donation_id}/reject/
```
- Requiere autenticación
- Requiere campo `rejection_reason` en el body
- Valida que la donación esté en estado "pending"
- Actualiza:
  - `donation_status` → "rejected"
  - `rejection_reason` → motivo proporcionado
  - `approved_by` → usuario que rechazó

**Payload:**
```json
{
  "rejection_reason": "El comprobante de pago está incompleto"
}
```

## Cambios en Frontend

### Nuevo Componente: CampaignDonationsTab.jsx
Ubicación: `src/ADMIN/components/CampaignDonationsTab.jsx`

**Props:**
- `campaign`: Objeto campaña actual
- `user`: Usuario autenticado (debe ser admin/creator)
- `formatCurrency`: Función para formatear moneda
- `token`: Token de autenticación
- `onDonationApproved`: Callback cuando se aprueba una donación

**Características:**

1. **Carga automática de donaciones pendientes**
   - useEffect con fetch a `GET /api/campaigns/donations/campaign/{id}/pending/`

2. **Visualización de comprobante**
   - Muestra imagen del comprobante desde Cloudinary
   - Resolución responsive

3. **Información mostrada:**
   - Monto de la donación
   - Nombre donante (o "Anónimo")
   - Email de confirmación
   - Método de pago (chip)
   - Descripción del comprobante (en Paper)
   - Mensaje opcional
   - Número de confirmación

4. **Acciones:**
   - Botón "Rechazar": Abre dialog para ingresar motivo
   - Botón "Aprobar": Aprueba directamente
   - Estados de carga durante procesamiento

5. **Estados:**
   - Loading: Spinner mientras carga
   - Empty: Mensaje si no hay donaciones pendientes
   - Error: Alert con mensaje de error
   - Processing: Desactiva botones durante procesamiento

### Integración en Modal de Campaña
Para integrar este tab en tu modal de campaña (ManagerProfile o ADMIN):

```jsx
import CampaignDonationsTab from "./CampaignDonationsTab";

// En el componente que renderiza el modal:
<TabPanel value={tabValue} index={/* tu index */}>
  <CampaignDonationsTab 
    campaign={campaign}
    user={user}
    formatCurrency={formatCurrency}
    token={token}
    onDonationApproved={(newAmount) => {
      // Actualiza el monto en la campaña
      setCampaign(prev => ({ ...prev, current_amount: newAmount }));
    }}
  />
</TabPanel>
```

## Flujo Completo

### 1. Donante crea donación
```
POST /api/campaigns/donations/create/
Body:
{
  "campaign": 1,
  "amount": 10000,
  "payment_method": "credit_card",
  "confirmation_email": "donor@example.com",
  "proof_of_payment_url": "https://res.cloudinary.com/...",
  "proof_of_payment_description": "Transferencia 16/12/2025 Ref: TRX123"
}
```
**Estado inicial: "pending"**

### 2. Admin ve donaciones pendientes
```
GET /api/campaigns/donations/campaign/1/pending/
```
Returns: Lista de donaciones con estado "pending"

### 3. Admin aprueba
```
PATCH /api/campaigns/donations/1/approve/
```
Resultado:
- Donación pasa a estado "approved"
- `campaign.current_amount` aumenta en 10000
- Se registra admin que aprobó
- Se registra fecha/hora de aprobación

### 4. UI se actualiza
- La donación desaparece del tab de pendientes
- El monto de la campaña se actualiza

## URLs de la API

```
# Métodos de pago
GET /api/campaigns/payments/methods/

# Crear donación
POST /api/campaigns/donations/create/

# Ver donaciones pendientes
GET /api/campaigns/donations/campaign/{campaign_id}/pending/

# Aprobar donación
PATCH /api/campaigns/donations/{donation_id}/approve/

# Rechazar donación
PATCH /api/campaigns/donations/{donation_id}/reject/
```

## Migraciones
- Migración aplicada: `0010_donation_approved_at_donation_approved_by_and_more.py`

## Validaciones

### Backend
- Usuario debe estar autenticado
- Usuario debe ser creator de campaña o staff (is_staff)
- Donación debe existir
- Donación debe estar en estado "pending" (para aprobar/rechazar)
- Rejection_reason es requerida para rechazar
- Monto se suma a campaign.current_amount usando transaction.atomic()

### Frontend
- Motivo de rechazo no puede estar vacío
- Validaciones de URL en comprobante
- Estados de carga y error

## Seguridad
- Solo admins/creators pueden ver donaciones pendientes
- Solo admins/creators pueden aprobar/rechazar
- transaction.atomic() asegura que no hay inconsistencias
- Historial completo en BD (quién aprobó, cuándo, motivo de rechazo)

## Próximas Mejoras
1. Notificación al donante cuando se aprueba/rechaza
2. Historial de donaciones (ver aprobadas/rechazadas)
3. Filtros por estado en lista de donaciones
4. Búsqueda por donante
5. Exportar reporte de donaciones
6. Confirmar email al donante
7. Re-enviar comprobante si se rechaza
