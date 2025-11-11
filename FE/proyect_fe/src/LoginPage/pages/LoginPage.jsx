import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useState } from 'react'; 

export default function Login() {
  return (
    <div className="login-page">
       <div>
        <Button variant="contained">Iniciar sesión</Button>
        <Button variant="contained">Registrarse</Button>
       </div>
    </div>
  );
}
