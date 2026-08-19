import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Verificamos si existe un usuario logueado en la memoria del navegador
  const isAuthenticated = localStorage.getItem("userId") !== null;

  // Si no está autenticado, lo pateamos a la pantalla de login de forma automática
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, Outlet renderiza la página que el usuario quería ver (ej: Historial)
  return <Outlet />;
}
