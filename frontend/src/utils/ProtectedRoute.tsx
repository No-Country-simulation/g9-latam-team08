import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../api/auth";

/**
 * Guard de autenticación.
 * Si el usuario no tiene token, redirige a /login.
 * Si tiene token, renderiza las rutas hijas.
 */
function ProtectedRoute() {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
