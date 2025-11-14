import '../NavBar/NavBar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">FUNDIFY</h1>
        <div className="nav-links">
          <button className="nav-button">Inicio</button>
          <button className="nav-button">About Us</button>
        </div>
      </div>
    </nav>
  );
}
