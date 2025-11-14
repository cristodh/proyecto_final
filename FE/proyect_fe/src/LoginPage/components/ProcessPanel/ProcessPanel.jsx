import './ProcessPanel.css';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

export default function ProcessPanel() {
  return (
    <Box className="process-panel">
      <Typography variant="h5">Proposito Fundify</Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Desde la idea hasta el impacto, así es como facilitamos el cambio en tu comunidad.
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="1. Publicación y Verificación del Proyecto"
            secondary="Revisamos la legitimidad y viabilidad de cada causa."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="2. Donación Fácil y Segura"
            secondary="Contribuye de forma segura a través de nuestra plataforma."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="3. Seguimiento Transparente del Impacto"
            secondary="Actualizaciones en tiempo real sobre el uso de fondos."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="4. Comunidad Fortalecida"
            secondary="Compartimos el impacto final y fortalecemos la comunidad."
          />
        </ListItem>
      </List>
    </Box>
  );
}
