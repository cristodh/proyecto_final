import '../NavBar/NavBar.css';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position="static" className="navbar" elevation={0}>
      <Toolbar className="nav-container">
        <Typography variant="h4" className="logo" sx={{ flexGrow: 1 }}>
          FUNDIFY
        </Typography>
        <div className="nav-links">
          <Button className="nav-button">Inicio</Button>
          <Button className="nav-button">About Us</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
