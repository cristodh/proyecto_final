import './LoginPage.css';
import Navbar from '../../components/NavBar/NavBar';
import ProcessPanel from '../../components/ProcessPanel/ProcessPanel';
import LoginForm from '../../components/LoginForm/LoginForm';
import ChooseCard from '../../components/ChooseType/ChooseCard';
import { useState } from 'react';
import ContributorForm from '../../components/LoginForm/ContributorForm';
import ManagerForm from '../../components/LoginForm/ManagerForm';
import { useNavigate } from 'react-router-dom';

// SVG Icons
const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2L2 8c0-1.11.89-2 2-2h6V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h6z" fill="currentColor"/>
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const [showSelector, setShowSelector] = useState(true);
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="login-page">
      <Navbar />
      <div className="login-content">
        <div className="left-panel">
          <ProcessPanel />
        </div>
        <div className="right-panel">
          <button onClick={()=>{
             setShowSelector(false)
             setShowForm(true)
          }}>
            Iniciar Sesión
          </button>
          <button onClick={()=>{
             setShowSelector(true)
             setShowForm(false)
          }}>
            Registrarse
          </button>
          {showSelector && (
          <div className="cards-container">
            <ChooseCard
              icon={<HeartIcon />}
              title={'Donante'}
              description={'Apoya a proyectos que transforman comunidades'}
              selected={()=>{
                navigate('/contributor')
              }}
            />
            <ChooseCard
              icon={<BriefcaseIcon />}
              title={'Manager'}
              description={'Crea y conecta tu idea con la comunidad'}
              selected={()=>{
                navigate('/manager')
              }}
            />
          </div>
          )}
          {showForm && (
            <LoginForm/>
          )}
        </div>
      </div>
    </div>
  );
}
