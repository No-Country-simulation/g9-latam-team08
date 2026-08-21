import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import logoFinanceAI from "../../assets/logo-financeai.svg";
import RouteContentFallback from "./RouteContentFallback";
import "./AuthLayout.css";

export default function AuthLayout() {
  return (
    <main className="login-page">
      <div className="login-page__backdrop" aria-hidden="true" />

      <section className="login-card" aria-labelledby="auth-title">
        <div className="logo-content">
          <img
            className="logo-image"
            src={logoFinanceAI}
            alt="FinanceAI"
          />
        </div>

        {/* El contenido de la tarjeta (login, registro, etc.) se renderiza aquí */}
        <Suspense fallback={<RouteContentFallback message="Preparando acceso..." compact />}>
          <Outlet />
        </Suspense>
      </section>
    </main>
  );
}
