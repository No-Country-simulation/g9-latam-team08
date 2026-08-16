import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import LandingPage from "../../pages/LandingPage";
import Login from "../../pages/Login";
import Historial from "../../pages/Historial";
import Register from "../../pages/Register";
import NotFoundPage from "../../pages/NotFoundPage";
import AuthLayout from "../../components/layout/AuthLayout";
import Nav from "../../components/layout/Nav";
import ProtectedRoute from "../../utils/ProtectedRoute";
import Soporte from "../../pages/Soporte";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      // ==========================================
      // 1. RUTAS PÚBLICAS (Visibles para todos)
      // ==========================================
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "demo",
        element: <LandingPage initialSection="demo" />,
      },

      // ==========================================
      // 2. RUTAS PRIVADAS (Protegidas)
      // ==========================================
      {
        // El guardia envuelve todo este bloque
        element: <ProtectedRoute />,
        children: [
          {
            element: <Nav />,
            children: [
              {
                path: "historial",
                element: <Historial />,
              },
              {
                path: "soporte",
                element: <Soporte />,
              }
            ],
          },
        ],
      },

      // ==========================================
      // 3. RUTAS DE AUTENTICACIÓN
      // ==========================================
      {
        element: <AuthLayout />,
        children: [
            {
            path: "login",
            element: <Login />,
            },
            {
            path: "register",
            element: <Register />,
            },
        ],
      },

      // ==========================================
      // 4. RUTA NO ENCONTRADA (404)
      // ==========================================
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
