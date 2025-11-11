import '../styles/Header.css';
export default function Header() {
  return (
    <header className="header">
      <h1>Bienvenido a Fundify</h1>
      <p className="tagline">Un puente para el cambio social</p>
      <nav>
        <a href="#">Iniciar Sesión</a>
        <a href="#">Registrarse</a>
      </nav>
    </header>
  );
}