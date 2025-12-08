import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  // Verificar si existe un token y si es admin
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!token || !isAdmin) {
    // Si no hay token o no es admin, redirige a login
    return <Navigate to="/auth-user" replace />;
  }

  // Si hay token y es admin, renderiza el componente
  return children;
};

export default AdminProtectedRoute;
