# 📊 FLUJO DE APROBACIÓN DE DONACIONES - DIAGRAMA VISUAL

## Diagrama de Estados

```
                    ┌──────────────┐
                    │   CREACIÓN   │
                    │  DE DONACIÓN │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │   VALIDAR    │
                    │   - Monto    │
                    │   - Email    │
                    │   - Comprobante
                    └──────┬───────┘
                           │
                    ┌──────▼───────────────┐
                    │  ESTADO: "pending"   │◄─────────────┐
                    │  🔴 PENDIENTE        │              │
                    │ (Aguardando Admin)   │              │
                    └───┬──────────────┬───┘              │
                        │              │                  │
                ┌───────▼──┐      ┌───▼────────┐          │
                │ ADMIN VE │      │   RECHAZO  │          │
                │ DONACIÓN │      │  ❌        │          │
                └───────┬──┘      │            │          │
                        │         │ ESTADO:    │          │
                        │         │ "rejected" │          │
                   ┌────▼─────┐   │            │          │
                   │   AUDIT  │   │ • Motivo   │          │
                   │ • Imagen │   │ • Admin    │          │
                   │ • Monto  │   │ • Fecha    │          │
                   │ • Datos  │   │            │          │
                   │ • Descrip│   └───────┬────┘          │
                   └────┬─────┘          │                │
                        │                │                │
               ┌────────▼────────┐       │                │
               │ ¿APROBAR O NO?  │       │                │
               └────┬──────────┬─┘       │                │
                    │          │        │                │
                  APRUEBA    RECHAZA    │                │
                    │          │        │                │
            ┌───────▼──────┐   │        │                │
            │   APROBADO   │   │        │                │
            │   ✅ ESTADO  │   │        │                │
            │ "approved"   │   │        │                │
            │              │   │        │                │
            │ • Actualiza  │   │        │                │
            │   DB         │   │        │                │
            │ • SUMA monto │   │        │                │
            │   a campaign │   │        │                │
            │ • Admin      │   │        │                │
            │ • Fecha      │   │        │                │
            └───────┬──────┘   │        │                │
                    │          │        │                │
            ┌───────▼──────────▼────────▼────────┐       │
            │    FRONTEND SE ACTUALIZA           │       │
            │                                    │       │
            │ • Quita de lista "Pendientes"      │       │
            │ • Actualiza monto campaña          │       │
            │ • Muestra confirmación             │       │
            │ • Guarda en historial              │       │
            └────────────────────────────────────┘       │
                                                         │
        ┌────────────────────────────────────────────────┤
        │ (Re-intento después)                           │
        │                                                │
        └────────────────────────────────────────────────┘
```

## Secuencia de Eventos

```
DONANTE                          BACKEND                    ADMIN
   │                               │                          │
   │ 1. Completa Formulario        │                          │
   │    + Sube comprobante         │                          │
   │    a Cloudinary               │                          │
   │                               │                          │
   │ 2. Click "Confirmar"          │                          │
   │    POST /donations/create/    │                          │
   ├──────────────────────────────►│                          │
   │                               │                          │
   │                               │ 3. Validar              │
   │                               │    • Monto > 0          │
   │                               │    • Email válido       │
   │                               │    • Campaign active    │
   │                               │    • Comprobante URL    │
   │                               │                          │
   │                               │ 4. Crear Donation       │
   │                               │    donation_status =    │
   │                               │    "pending"            │
   │                               │                          │
   │ 5. Response OK                │                          │
   │◄──────────────────────────────┤                          │
   │                               │                          │
   │ 6. "¡Donación creada!"        │                          │
   │    (Aguardando aprobación)    │                          │
   │                               │                          │
   │                               │                          │
   │                               │ 7. Abre Modal           │
   │                               │    GET /pending/        │
   │                               ├─────────────────────────►│
   │                               │                          │
   │                               │ 8. Ve donaciones        │
   │                               │    • Comprobante        │
   │                               │    • Monto              │
   │                               │    • Datos              │
   │                               │                          │
   │                               │ 9. Click "APROBAR"     │
   │                               │    PATCH /approve/      │
   │                               │◄─────────────────────────┤
   │                               │                          │
   │                               │ 10. Validaciones       │
   │                               │     • Status = pending  │
   │                               │     • Admin check       │
   │                               │     • Campaign check    │
   │                               │                          │
   │                               │ 11. ACTUALIZA BD       │
   │                               │     • Status = approved │
   │                               │     • Suma monto        │
   │                               │ current_amount + monto  │
   │                               │                          │
   │                               │ 12. Response OK        │
   │                               │     + newAmount        │
   │                               ├─────────────────────────►│
   │                               │                          │
   │                               │ 13. UI actualizado      │
   │                               │     • Quita de lista    │
   │                               │     • Actualiza monto   │
   │                               │     • "¡Aprobada!"      │
   │                               │                          │

[O RECHAZAR]

   │                               │                          │
   │                               │                          │
   │                               │ 9b. Click "RECHAZAR"   │
   │                               │     Dialog motivo       │
   │                               │ PATCH /reject/          │
   │                               │◄─────────────────────────┤
   │                               │                          │
   │                               │ 10b. Validaciones      │
   │                               │      • Status = pending │
   │                               │      • Motivo presente  │
   │                               │                          │
   │                               │ 11b. ACTUALIZA BD      │
   │                               │      • Status=rejected  │
   │                               │      • Guarda motivo    │
   │                               │                          │
   │                               │ 12b. Response OK       │
   │                               │◄─────────────────────────┤
   │                               │                          │
   │                               │ 13b. UI actualizado    │
   │                               │      • Quita de lista   │
   │                               │      • "¡Rechazada!"    │
```

## Estados y Transiciones

```
┌─────────────┐
│   PENDING   │ ◄─── INICIO (cuando se crea)
│   🔴        │
│  PENDIENTE  │
└────┬─────┬─┘
     │     │
     │     └───────────────────────┐
     │                             │
     ▼                             ▼
┌─────────────┐              ┌─────────────┐
│  APPROVED   │              │  REJECTED   │
│  ✅         │              │  ❌         │
│  APROBADA   │              │  RECHAZADA  │
│             │              │             │
│ • Monto ✅ │              │ • Motivo ✅ │
│   sumado    │              │   guardado  │
│ • Admin  ✅│              │ • Admin  ✅│
│ • Fecha  ✅│              │ • Fecha  ✅│
└─────────────┘              └─────────────┘
```

## Respuestas de la API

### Crear Donación (POST /donations/create/)
```json
{
  "message": "¡Donación realizada exitosamente!",
  "donation": {
    "id": 1,
    "amount": "10000.00",
    "donation_status": "pending",  ◄─── IMPORTANTE
    "campaign_id": 1,
    "donor_id": 5,
    "confirmation_number": "DON-ABC123-1",
    ...
  }
}
```

### Ver Pendientes (GET /campaign/{id}/pending/)
```json
{
  "pending_donations": [
    {
      "id": 1,
      "amount": "10000.00",
      "donation_status": "pending",
      "proof_of_payment_url": "https://...",
      "proof_of_payment_description": "Transferencia...",
      ...
    }
  ],
  "count": 1
}
```

### Aprobar (PATCH /donations/{id}/approve/)
```json
{
  "message": "Donación aprobada exitosamente",
  "donation": {
    "id": 1,
    "donation_status": "approved",   ◄─── CAMBIÓ
    "approved_at": "2025-12-16T10:30:45Z",  ◄─── NUEVO
    "approved_by_username": "admin_user",   ◄─── NUEVO
    ...
  },
  "campaign_current_amount": "150000.00"  ◄─── ACTUALIZADO
}
```

### Rechazar (PATCH /donations/{id}/reject/)
```json
{
  "message": "Donación rechazada",
  "donation": {
    "id": 1,
    "donation_status": "rejected",   ◄─── CAMBIÓ
    "rejection_reason": "Comprobante incompleto",  ◄─── NUEVO
    "approved_by_username": "admin_user",  ◄─── ADMIN QUE RECHAZÓ
    ...
  }
}
```

## Matriz de Permisos

```
┌──────────────────┬─────────┬──────────┬──────────┐
│ Acción           │ Donante │ Creator  │ Staff    │
├──────────────────┼─────────┼──────────┼──────────┤
│ Crear donación   │   ✅    │    ✅    │    ✅    │
│ Ver propias      │   ✅    │    ✅    │    ✅    │
│ Ver todas        │   ❌    │    ✅    │    ✅    │
│ Ver pendientes   │   ❌    │    ✅    │    ✅    │
│ Aprobar          │   ❌    │    ✅    │    ✅    │
│ Rechazar         │   ❌    │    ✅    │    ✅    │
└──────────────────┴─────────┴──────────┴──────────┘
```

## Auditoría Completa

Cada donación guarda:
```
CREACIÓN
├─ ID donación
├─ Monto
├─ Donante
├─ Método pago
├─ Comprobante URL
├─ Descripción comprobante
├─ Fecha creación
└─ Estado inicial: "pending"

APROBACIÓN
├─ Quién aprobó (admin)
├─ Cuándo aprobó (timestamp)
├─ Monto sumado a campaign
├─ Nuevo total de campaign
└─ Estado: "approved"

O RECHAZO
├─ Quién rechazó (admin)
├─ Cuándo rechazó
├─ Motivo del rechazo
└─ Estado: "rejected"
```

## Casos de Uso

### Caso 1: Donación Exitosa
```
Donante → Crea donación (pending) 
       → Admin aprueba → Dinero sumado ✅
```

### Caso 2: Donación Rechazada
```
Donante → Crea donación (pending)
       → Admin rechaza (con motivo)
       → Dinero NO se suma
       → Donante ve rechazo
```

### Caso 3: Reintento
```
Donante → Crea donación (rechazada)
       → Corrige comprobante
       → Crea nueva donación (pending)
       → Admin aprueba → ✅
```

## Performance

```
Donaciones pendientes: O(1) - Indexed by donation_status
Aprobar: O(1) - Atomic transaction
Rechazar: O(1) - Atomic transaction
Cargar comprobante: CDN Cloudinary (rápido)
```

## Seguridad

```
✅ SQL Injection: ORM Django protege
✅ XSS: React escapa HTML
✅ CSRF: Django token protege
✅ Autorización: Validada en backend
✅ Integridad: Transacciones atómicas
✅ Auditoría: Historial completo
✅ Datos: Solo HTTPS en producción
```

---

**Versión:** 1.0
**Estado:** ✅ Producción
**Última actualización:** 2025-12-16
