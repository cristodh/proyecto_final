import '../NavBar/NavBar.css';
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">FUNDIFY</h1>
        <div className="nav-links">
          <button 
            onClick={() => navigate("/auth-user")}
          className="nav-button">Inicio</button>
          <button className="nav-button">About Us</button>
        </div>
      </div>
    </nav>
  );
}
