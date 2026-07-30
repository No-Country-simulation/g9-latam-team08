import { Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import "./Login.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor completá todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // TODO: Conectar con la API de registro aquí.
    // Ejemplo mínimo: fetch('/api/register', { method: 'POST', body: JSON.stringify({ name, email, password }) })...

    // Por ahora sólo limpiar y mostrar confirmación básica
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("Registración exitosa (simulada). Podés iniciar sesión ahora.");
  };

  return (
    <main className="login-page">
      <div className="login-page__backdrop" aria-hidden="true" />

      <section className="login-card" aria-labelledby="register-title">
        <header className="login-card__header">
          <div className="login-card__brand">
            <span className="login-card__brand-mark">
              <Sparkles size={20} aria-hidden="true" />
            </span>
            <span className="login-card__brand-name">FinanceAI</span>
          </div>

          <h1 id="register-title" className="login-card__title">
            Crear cuenta
          </h1>
          <p className="login-card__subtitle">
            Registrate para acceder a tu panel financiero.
          </p>
        </header>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-form__field">
            <label className="login-form__label" htmlFor="register-name">
              Nombre
            </label>
            <input
              id="register-name"
              className="login-form__input"
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Tu nombre"
              autoComplete="name"
              required
            />
          </div>

          <div className="login-form__field">
            <label className="login-form__label" htmlFor="register-email">
              Email
            </label>
            <input
              id="register-email"
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
            <label className="login-form__label" htmlFor="register-password">
              Contraseña
            </label>
            <input
              id="register-password"
              className="login-form__input"
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="login-form__field">
            <label className="login-form__label" htmlFor="register-confirm-password">
              Confirmar contraseña
            </label>
            <input
              id="register-confirm-password"
              className="login-form__input"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
          </div>

          {error && <p role="status" style={{ color: "var(--color-error)", margin: 0 }}>{error}</p>}

          <Button type="submit" fullWidth>
            Crear cuenta
          </Button>
        </form>

        <p className="login-card__footer">
          ¿Ya tenés cuenta?{" "}
          <Link className="login-card__link" to="/login">
            Iniciar sesión
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
