import { Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="login-page">
      <div className="login-page__backdrop" aria-hidden="true" />

      <section className="login-card" aria-labelledby="login-title">
        <header className="login-card__header">
          <div className="login-card__brand">
            <span className="login-card__brand-mark">
              <Sparkles size={20} aria-hidden="true" />
            </span>
            <span className="login-card__brand-name">FinanceAI</span>
          </div>

          <h1 id="login-title" className="login-card__title">
            Iniciar sesión
          </h1>
          <p className="login-card__subtitle">
            Accedé a tu panel financiero y continuá con tu análisis.
          </p>
        </header>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-form__field">
            <label className="login-form__label" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              className="login-form__input"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="login-form__field">
            <label className="login-form__label" htmlFor="login-password">
              Contraseña
            </label>
            <input
              id="login-password"
              className="login-form__input"
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <Button type="submit" fullWidth>
            Iniciar Sesión
          </Button>
        </form>

        <p className="login-card__footer">
          ¿No tenés cuenta?{" "}
          <Link className="login-card__link" to="/register">
            Registrate
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
