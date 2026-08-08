import { Outlet } from "react-router-dom";
import { Sparkles } from "lucide-react";
import "./AuthLayout.css";

export default function AuthLayout() {
  return (
    <main className="login-page">
      <div className="login-page__backdrop" aria-hidden="true" />

      <section className="login-card" aria-labelledby="auth-title">

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div className="login-card__brand">
            <span className="login-card__brand-mark">
              <Sparkles size={20} aria-hidden="true" />
            </span>
            <span className="login-card__brand-name">FinanceAI</span>
          </div>
        </div>

        {/* El contenido de la tarjeta (login, registro, etc.) se renderiza aquí */}
        <Outlet />
      </section>
    </main>
  );
}
