import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Verificar si existe un token en localStorage (usuario autenticado)
  const token = localStorage.getItem('token');

  if (!token) {
    // Si no hay token, redirige a login
    return <Navigate to="/Home" replace />;
  }

  // Si hay token, renderiza el componente
  return children;
};

export default ProtectedRoute;
