import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import NotFoundPage from "../../pages/NotFoundPage";
import AuthLayout from "../../components/layout/AuthLayout";
import ProtectedRoute from "../../utils/ProtectedRoute";
import DashboardLayout from "../../features/dashboard/components/DashboardLayout";

const LandingPage = lazy(() => import("../../pages/LandingPage"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const DashboardPage = lazy(() => import("../../pages/DashboardPage"));
const Historial = lazy(() => import("../../pages/Historial"));
const NewAnalysisPage = lazy(() => import("../../pages/NewAnalysisPage"));
const GoalsPage = lazy(() => import("../../pages/GoalsPage"));
const NotificationsPage = lazy(() => import("../../pages/NotificationsPage"));
const Soporte = lazy(() => import("../../pages/Soporte"));

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
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: "dashboard",
                element: <DashboardPage />,
              },
              {
                path: "historial",
                element: <Historial />,
              },
              {
                path: "analisis/nuevo",
                element: <NewAnalysisPage />,
              },
              {
                path: "metas",
                element: <GoalsPage />,
              },
              {
                path: "notificaciones",
                element: <NotificationsPage />,
              },
              {
                path: "soporte",
                element: <Soporte />,
              },
              {
                path: "dashboard/historial",
                element: <Navigate to="/historial" replace />,
              },
              {
                path: "dashboard/metas",
                element: <Navigate to="/metas" replace />,
              },
              {
                path: "dashboard/notificaciones",
                element: <Navigate to="/notificaciones" replace />,
              },
              {
                path: "dashboard/soporte",
                element: <Navigate to="/soporte" replace />,
              },
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
