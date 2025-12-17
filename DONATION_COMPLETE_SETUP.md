# Integración de Donaciones - Actualización Completa

## Cambios Realizados

### Backend - Modelo (campaigns/models.py)
Se agregaron dos campos nuevos al modelo `Donation`:
```python
proof_of_payment_url = models.URLField(blank=True, null=True)
proof_of_payment_description = models.TextField(blank=True, null=True)
```

**Migraciones:**
- Creada: `0009_donation_proof_of_payment_description_and_more.py`
- Aplicada exitosamente

### Backend - Serializers (campaigns/serializers.py)
Se actualizaron ambos serializers para incluir los nuevos campos:
- `DonationSerializer`: Agregados `proof_of_payment_url` y `proof_of_payment_description`
- `DonationCreateSerializer`: Agregados los mismos campos

### Backend - Views (campaigns/views.py)
Se agregó nueva vista `PaymentMethodsView`:
```python
GET /api/campaigns/payments/methods/
```
- Acceso público (sin autenticación)
- Retorna lista dinámicamente desde `Donation.PAYMENT_CHOICES`

### Backend - URLs (campaigns/urls.py)
Se agregó ruta:
```python
path('payments/methods/', PaymentMethodsView.as_view()),
```

### Frontend - Componente (CampaignDetailsModal.jsx)

#### Estados Nuevos
```javascript
const [paymentMethods, setPaymentMethods] = useState([]);
const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(true);
```

#### Campos en donationData
```javascript
proofOfPaymentUrl: "",
proofOfPaymentDescription: "",
```

#### useEffect para Métodos de Pago
```javascript
useEffect(() => {
  const fetchPaymentMethods = async () => {
    const response = await fetch("/api/campaigns/payments/methods/");
    const data = await response.json();
    setPaymentMethods(data.payment_methods);
  };
  fetchPaymentMethods();
}, []);
```

#### Nuevos Campos en el Formulario
1. **Método de Pago**: Ahora dinámico del backend
2. **URL del Comprobante de Pago**: Campo URL para Cloudinary
3. **Descripción del Comprobante**: TextField multiline para detalles

#### Validaciones
- proof_of_payment_url es requerida
- proof_of_payment_description es requerida

## Flujo Completo de Donación

```
1. Usuario abre modal de campaña
2. Si es donante, click en "Hacer una Donación"
3. Se cargan dinámicamente los métodos de pago del backend
4. Usuario completa el formulario:
   - Monto
   - Método de pago (del backend)
   - Email de confirmación
   - URL del comprobante (sube a Cloudinary primero)
   - Descripción del comprobante
   - Mensaje (opcional)
   - Anónimo (checkbox)
5. Click en "Confirmar Donación"
6. Se envía payload al backend con todos los campos
7. Backend crea registro de Donation y actualiza current_amount de Campaign
```

## Payload Completo

```json
{
  "campaign": 1,
  "amount": 10000.00,
  "message": "Mensaje de apoyo",
  "anonymous": false,
  "payment_method": "credit_card",
  "confirmation_email": "usuario@email.com",
  "proof_of_payment_url": "https://res.cloudinary.com/...",
  "proof_of_payment_description": "Transferencia 16/12/2025 Ref: TRX12345"
}
```

## Respuesta del Backend

```json
{
  "message": "¡Donación realizada exitosamente!",
  "donation": {
    "id": 1,
    "amount": "10000.00",
    "donated_at": "2025-12-16T10:30:45Z",
    "message": "Mensaje de apoyo",
    "anonymous": false,
    "payment_method": "credit_card",
    "campaign": 1,
    "campaign_name": "Nombre de la Campaña",
    "donor": 5,
    "donor_username": "username",
    "donor_email": "usuario@email.com",
    "confirmation_number": "DON-ABC12345-1",
    "confirmation_email": "usuario@email.com",
    "proof_of_payment_url": "https://res.cloudinary.com/...",
    "proof_of_payment_description": "Transferencia 16/12/2025 Ref: TRX12345"
  },
  "campaign_current_amount": "50000.00"
}
```

## Próximos Pasos

1. **Descomentar la llamada real al API**: En `handleSubmitDonation`, reemplazar la simulación con:
   ```javascript
   const token = localStorage.getItem("token");
   const response = await fetch("http://tu-backend.com/api/campaigns/donations/create/", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
     body: JSON.stringify(payload),
   });
   ```

2. **Sistema de Carga a Cloudinary**: Crear componente para subir archivos directamente a Cloudinary

3. **Verificación de Comprobantes**: Sistema para que administradores verifiquen los comprobantes

4. **Notificaciones**: Agregar toast/snackbar para feedback del usuario

## Información Importante

- Los **métodos de pago son dinámicos** y vienen del backend
- Los **comprobantes se alojan en Cloudinary**, no en el servidor
- La **URL debe ser pública** para que el backend pueda acceder
- La **descripción es obligatoria** para trazabilidad

## Testing

Para probar localmente:
1. Backend debe estar corriendo en `http://localhost:8000`
2. Endpoint de métodos de pago: `GET http://localhost:8000/api/campaigns/payments/methods/`
3. El usuario debe tener `role === 4` para ver el formulario
