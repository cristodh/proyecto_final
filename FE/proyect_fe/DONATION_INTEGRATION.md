# Integración de Donaciones - Frontend

## Descripción
Se ha agregado una sección completa de donación en el componente `CampaignDetailsModal.jsx`. El formulario está diseñado para solo ser accesible por usuarios con rol de **donante (role === 2)**.

## Características del Formulario

### Campos
- **Monto (CRC)**: Campo numérico con validación de monto mínimo de 100
- **Método de Pago**: Select con opciones predefinidas
  - SINPE Móvil
  - Transferencia Bancaria - BCR
  - Transferencia Bancaria - Banco Nacional
  - Transferencia Bancaria - BAC
  - Transferencia Bancaria - Otro Banco
- **Email de Confirmación**: Validación de email, se pre-llena con el email del usuario
- **Mensaje**: Campo de texto opcional para mensaje de apoyo
- **Donación Anónima**: Checkbox para realizar donación sin identificar al donante

### Estados
- **Formulario colapsado**: Botón "Hacer una Donación" en verde
- **Formulario expandido**: Muestra todos los campos del formulario
- **Cargando**: Los campos se deshabilitan y muestra indicador de progreso
- **Éxito**: Mensaje de confirmación que se auto-cierra en 3 segundos
- **Error**: Mensaje de error con validaciones

### Restricciones
- Solo visible para usuarios autenticados con rol de donante
- Solo activa si la campaña aún tiene días restantes (no finalizadas)
- Muestra mensajes informativos si:
  - Usuario no es donante
  - Campaña ha finalizado

## Integración con Backend

### Endpoint Requerido
```
POST /campaign/donations/create/
```

### Payload (Body)
```json
{
  "campaign": 1,
  "amount": 10000.00,
  "message": "Mensaje de apoyo",
  "anonymous": false,
  "payment_method": "sinpe_movil",
  "confirmation_email": "usuario@email.com"
}
```

### Respuesta Esperada (201 Created)
```json
{
  "message": "¡Donación realizada exitosamente!",
  "donation": {
    "id": 1,
    "amount": "10000.00",
    "donated_at": "2025-12-16T10:30:45Z",
    "message": "Mensaje de apoyo",
    "anonymous": false,
    "payment_method": "sinpe_movil",
    "campaign": 1,
    "campaign_name": "Nombre de la Campaña",
    "donor": 5,
    "donor_username": "username",
    "donor_email": "usuario@email.com",
    "confirmation_number": "DON-ABC12345-1",
    "confirmation_email": "usuario@email.com"
  },
  "campaign_current_amount": "50000.00"
}
```

## Implementación

### Paso 1: Reemplazar la llamada simulada
En la función `handleSubmitDonation`, busca el comentario y descomentar:

```jsx
// Cambiar de:
console.log("Donación enviada:", payload);
await new Promise((resolve) => setTimeout(resolve, 1500));

// A:
const token = localStorage.getItem("token"); // O donde guardes el token
const response = await fetch("http://tu-backend.com/api/campaigns/donate/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.error || "Error al procesar la donación");
}

const data = await response.json();
```

### Paso 2: Manejar la respuesta
```jsx
// Después de recibir la respuesta exitosa:
console.log("Donación exitosa:", data);
// Aquí puedes actualizar el monto actual de la campaña
// Disparar un evento o actualizar el estado global si es necesario
```

### Paso 3: Manejo de errores
El formulario ya tiene validación de:
- Monto mayor a 0
- Email válido
- Campos requeridos

El error del servidor se mostrará en el Alert de error.

## Validaciones Locales (Frontend)
- Monto > 0
- Email válido (HTML5)
- Campos requeridos están completos

## Validaciones del Backend
- Usuario debe estar autenticado (IsAuthenticated)
- Usuario debe tener rol de donante
- Campaña debe existir
- Campaña debe estar en estado 'active'
- Monto debe ser mayor a 0
- Generar número de confirmación único

## Base de Datos - Modelo Donation

```python
class Donation(models.Model):
  PAYMENT_CHOICES = [
    ('sinpe_movil', 'SINPE Móvil'),
    ('bank_transfer_bcr', 'Transferencia Bancaria - BCR'),
    ('bank_transfer_bn', 'Transferencia Bancaria - Banco Nacional'),
    ('bank_transfer_bac', 'Transferencia Bancaria - BAC'),
    ('bank_transfer_other', 'Transferencia Bancaria - Otro Banco'),
  ]
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donated_at = models.DateTimeField(auto_now_add=True)
    message = models.TextField(blank=True, null=True)
    anonymous = models.BooleanField(default=False)
    payment_method = models.CharField(choices=PAYMENT_CHOICES, max_length=50)
    campaign = models.ForeignKey('Campaign', on_delete=models.CASCADE)
    donor = models.ForeignKey('users.User', on_delete=models.CASCADE)
    confirmation_number = models.CharField(max_length=100, unique=True)
    confirmation_email = models.EmailField()
```

## Estados del Usuario
- `user.role === 4`: Donante (puede hacer donaciones)
- `user.role !== 4`: No donante (muestra mensaje informativo)
- No autenticado: Muestra botón de "Iniciar Sesión"

## Próximos Pasos
1. Implementar la llamada real al endpoint en `handleSubmitDonation`
2. Manejar errores específicos del servidor
3. Actualizar el monto actual de la campaña después de la donación
4. Agregar notificaciones toast si es necesario
5. Registrar las donaciones en un historial/log
