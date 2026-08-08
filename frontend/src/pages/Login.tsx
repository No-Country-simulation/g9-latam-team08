import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import BotonGoogle from "../components/ui/BotonGoogle";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

function Login() {
  // Tipamos explícitamente los estados como strings
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { handleGoogleSuccess } = useGoogleAuth(setError);

  // En TypeScript, debemos especificar qué tipo de evento recibe onSubmit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Credenciales incorrectas. Por favor, revisá tu email y contraseña.");
      return;
    }

    // Simulación de login exitoso
    localStorage.setItem('userId', '1');
    navigate("/historial");
  };

  return (
    <>
      <header className="login-card__header">
        <h1 id="auth-title" className="login-card__title">
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <p className="login-form__error" role="alert" style={{ color: "var(--color-error)" }}>
            {error}
          </p>
        )}

        <Button type="submit" fullWidth>
          Iniciar Sesión
        </Button>
      </form>

      <div className="login-social">
        <p className="login-social__label">O continuá con</p>
        <BotonGoogle
          onSuccess={handleGoogleSuccess}
          onError={(err: Error) => setError(err?.message || "Error al iniciar sesión con Google.")}
        >
          Iniciar sesión con Google
        </BotonGoogle>
      </div>

      <p className="login-card__footer">
        ¿No tenés cuenta?{" "}
        <Link className="login-card__link" to="/register">
          Registrate
        </Link>
      </p>
    </>
  );
}

export default Login;
