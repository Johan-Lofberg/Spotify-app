// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token'); // ✅ matchar SpotifyCallback
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
