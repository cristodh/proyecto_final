# ✅ Sistema de Aprobación de Donaciones - Completado

## 🎯 Flujo del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. DONANTE CREA DONACIÓN (Usuario con role=4)                  │
│                                                                 │
│ - Abre modal de campaña                                         │
│ - Click en "Hacer una Donación"                                 │
│ - Completa formulario:                                          │
│   • Monto                                                       │
│   • Método de pago (dinámico del backend)                      │
│   • Email de confirmación                                      │
│   • URL del comprobante (Cloudinary)                           │
│   • Descripción del comprobante                                │
│   • Mensaje (opcional)                                         │
│   • Anónimo (checkbox)                                         │
│ - Envía a backend                                              │
│ - Se crea con estado: "pending" 🔴                             │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. ADMIN VE DONACIONES PENDIENTES                               │
│                                                                 │
│ - Abre modal de campaña                                         │
│ - Navega a tab: "Donaciones Pendientes"                        │
│ - Ve lista de donaciones con:                                  │
│   • Imagen del comprobante                                     │
│   • Monto                                                      │
│   • Donante (o "Anónimo")                                      │
│   • Email                                                      │
│   • Método de pago                                             │
│   • Descripción del comprobante                                │
│   • Mensaje (si existe)                                        │
│ - Dos botones: "Rechazar" y "Aprobar"                         │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 3A. ADMIN APRUEBA DONACIÓN                                      │
│                                                                 │
│ - Click en "Aprobar"                                            │
│ - Envía PATCH a /api/campaigns/donations/{id}/approve/        │
│ - Backend:                                                      │
│   • Cambia estado a "approved" ✅                              │
│   • Registra fecha/hora de aprobación                          │
│   • Registra admin que aprobó                                  │
│   • SUMA monto a campaign.current_amount                       │
│ - Frontend:                                                     │
│   • Quita de lista                                             │
│   • Actualiza monto de la campaña                              │
│   • Muestra confirmación                                       │
└─────────────────────────────────────────────────────────────────┘

                    O

┌─────────────────────────────────────────────────────────────────┐
│ 3B. ADMIN RECHAZA DONACIÓN                                      │
│                                                                 │
│ - Click en "Rechazar"                                           │
│ - Abre dialog para motivo                                       │
│ - Ingresa motivo del rechazo                                    │
│ - Click en "Rechazar"                                           │
│ - Envía PATCH a /api/campaigns/donations/{id}/reject/         │
│ - Backend:                                                      │
│   • Cambia estado a "rejected" ❌                              │
│   • Guarda motivo del rechazo                                  │
│   • Registra admin que rechazó                                 │
│   • NO suma el monto                                           │
│ - Frontend:                                                     │
│   • Quita de lista                                             │
│   • Muestra confirmación                                       │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Estados de la Donación

| Estado | Valor BD | Descripción | Acciones |
|--------|----------|-------------|----------|
| Pendiente | `pending` | 🔴 Esperando aprobación | Admin puede aprobar/rechazar |
| Aprobada | `approved` | ✅ Cuenta hacia la meta | Dinero sumado a campaign |
| Rechazada | `rejected` | ❌ No cuenta | Motivo registrado |

## 🔧 Cambios Técnicos

### Backend

**Modelo (models.py)**
```python
DONATION_STATUS = [
    ('pending', 'Pending'),
    ('approved', 'Approved'),
    ('rejected', 'Rejected'),
]

donation_status = CharField(default='pending')
approved_at = DateTimeField(null=True)
approved_by = ForeignKey(User, null=True)
rejection_reason = TextField(null=True)
```

**Vistas (views.py)**
- `DonationApprovalsView`: GET donaciones pendientes
- `DonationApproveView`: PATCH para aprobar
- `DonationRejectView`: PATCH para rechazar

**URLs**
```
GET    /api/campaigns/donations/campaign/{id}/pending/
PATCH  /api/campaigns/donations/{id}/approve/
PATCH  /api/campaigns/donations/{id}/reject/
```

### Frontend

**Componente: CampaignDonationsTab.jsx**
- Carga donaciones pendientes
- Muestra comprobante de Cloudinary
- Botones de aprobar/rechazar
- Dialog para motivo de rechazo
- Estados de carga y error

## 🔐 Seguridad

✅ Solo creator/staff pueden ver donaciones pendientes
✅ Solo creator/staff pueden aprobar/rechazar
✅ Transacciones atómicas al actualizar monto
✅ Historial completo en BD
✅ Token JWT requerido

## 📈 Datos Registrados

Cuando se aprueba una donación:
```json
{
  "donation_status": "approved",
  "approved_at": "2025-12-16T10:30:45Z",
  "approved_by": 1,
  "campaign.current_amount": "incrementado"
}
```

Cuando se rechaza:
```json
{
  "donation_status": "rejected",
  "rejection_reason": "Motivo...",
  "approved_by": 1
}
```

## 🚀 Próximas Mejoras

- [ ] Email de notificación al donante
- [ ] Historial de donaciones aprobadas/rechazadas
- [ ] Filtros de estado
- [ ] Búsqueda por donante
- [ ] Exportar reporte
- [ ] Re-enviar comprobante si se rechaza
- [ ] Validación de imagen en Cloudinary
- [ ] Límite de rechazo automático

## ✅ Testing

1. Crear donación como donante → Estado: "pending"
2. Acceder como admin → Ver en tab de donaciones pendientes
3. Aprobar → Monto se suma a campaign.current_amount
4. Verificar en DB → Estado: "approved", approved_at y approved_by registrados

Alternativa:
1. Crear donación
2. Acceder como admin
3. Rechazar con motivo
4. Verificar → Estado: "rejected", rejection_reason guardado
