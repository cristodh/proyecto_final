import React from "react";
import { Box, Typography, Divider } from "@mui/material";

/**
 * TermsAndConditionsContent
 * Contenido de Términos y Condiciones de Uso
 */
export default function TermsAndConditionsContent() {
  return (
    <Box sx={{ fontSize: "14px", lineHeight: 1.8, color: "#333" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, mt: 2 }}>
        TÉRMINOS Y CONDICIONES DE USO
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        Última actualización: Diciembre 2025
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Sección 1 */}
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
        1. Introducción
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Bienvenido a nuestra plataforma de financiamiento colectivo. Estos Términos y Condiciones 
        ("Términos") regulan el acceso y uso de nuestro sitio web y aplicaciones móviles (la "Plataforma"). 
        Al acceder o utilizar la Plataforma, usted acepta estar vinculado por estos Términos. Si no está 
        de acuerdo con alguna parte de estos Términos, no debe utilizar la Plataforma.
      </Typography>

      {/* Sección 2 */}
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
        2. Registro de Cuenta
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Para utilizar ciertos servicios de la Plataforma, debe crear una cuenta. Usted es responsable 
        de mantener la confidencialidad de su contraseña y de toda la actividad que ocurra en su cuenta. 
        Acepta proporcionar información precisa, actual y completa durante el registro. No puede crear 
        cuentas múltiples ni transferir su cuenta a terceros.
      </Typography>

      {/* Sección 3 */}
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
        3. Roles de Usuario
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        <strong>Donantes:</strong> Personas que realizan contribuciones monetarias a proyectos listados 
        en la Plataforma.
        <br />
        <strong>Gestores de Proyectos:</strong> Organizaciones o individuos que crean y administran 
        campañas de financiamiento.
        <br />
        Cada rol tiene derechos y responsabilidades específicos que deben ser respetados.
      </Typography>

      {/* Sección 4 */}
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
        4. Donaciones
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Las donaciones realizadas a través de la Plataforma son irrevocables salvo en circunstancias 
        específicas definidas por nuestras políticas. Los fondos se transfieren al gestor del proyecto 
        después de que la donación sea aprobada por nuestro equipo de revisión. La Plataforma no es 
        responsable del uso de los fondos por parte de los gestores de proyectos.
      </Typography>

      {/* Sección 5 */}
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
        5. Prohibiciones de Conducta
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Al usar la Plataforma, usted acepta no:
        <br />
        • Crear contenido ilegal, difamatorio o abusivo
        <br />
        • Realizar actividades fraudulentas o engañosas
        <br />
        • Violar la privacidad de otros usuarios
        <br />
        • Interferir con la operación de la Plataforma
        <br />
        • Intentar acceder sin autorización a sistemas o datos
      </Typography>

      {/* Sección 6 */}
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
        6. Limitación de Responsabilidad
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        La Plataforma se proporciona "tal cual" sin garantías de ningún tipo. No somos responsables 
        de daños indirectos, incidentales, especiales o consecuentes derivados del uso o la imposibilidad 
        de usar la Plataforma. La responsabilidad total por reclamaciones no excederá el monto de 
        donaciones en los últimos 12 meses.
      </Typography>

      {/* Sección 7 */}
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
        7. Política de Privacidad
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Su privacidad es importante para nosotros. Recopilamos y procesamos información personal 
        de acuerdo con las leyes aplicables. Los datos se utilizan únicamente para facilitar 
        transacciones y mejorar la Plataforma. No vendemos su información personal a terceros.
      </Typography>

      {/* Sección 8 */}
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
        8. Modificación de Términos
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los cambios 
        entrarán en vigor inmediatamente. Su uso continuado de la Plataforma constituye su 
        aceptación de los términos modificados.
      </Typography>

      {/* Sección 9 */}
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
        9. Terminación de Cuenta
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Podemos rescindir o suspender su cuenta en cualquier momento por violación de estos Términos 
        o por conducta inapropiada. Puede solicitar la eliminación de su cuenta en cualquier momento 
        contactando a nuestro equipo de soporte.
      </Typography>

      {/* Sección 10 */}
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
        10. Ley Aplicable
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Estos Términos se rigen por las leyes de Costa Rica. Cualquier disputa será resuelta 
        exclusivamente por los tribunales competentes en Costa Rica.
      </Typography>

      {/* Sección 11 */}
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
        11. Contacto
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Para preguntas sobre estos Términos, por favor contacte a: support@plataforma.cr
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "#666", mt: 2 }}>
        © 2025 Plataforma de Financiamiento Colectivo. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}
