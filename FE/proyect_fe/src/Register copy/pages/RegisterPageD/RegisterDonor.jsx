import '../RegisterPageD/RegisterDonor.css';
import Navbar from '../../components/NavBar/NavBar';
import RegisterFormD from '../../components/RegisFormD/RegisFormD';

export default function RegisterDonor() {
  return (
    <div className="register-donor-page">
      <Navbar />
      <div className="register-donor-container">
        <h1>Registro de Donador</h1>
        <p className="subtitle">Apoya proyectos que transforman comunidades</p>
        <RegisterFormD />
      </div>
    </div>
  );
}
