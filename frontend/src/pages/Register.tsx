import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import BotonGoogle from "../components/ui/BotonGoogle";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { handleGoogleSuccess } = useGoogleAuth(setError);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

    // Simulación de registro exitoso
    setError("Registración exitosa (simulada). Redirigiendo...");
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <>
      <header className="login-card__header">
        <h1 id="auth-title" className="login-card__title">
          Crear cuenta
        </h1>
        <p className="login-card__subtitle">
          Registrate para acceder a tu panel financiero.
        </p>
      </header>

      <div style={{ marginBottom: "1.5rem" }}>
        <BotonGoogle
          onSuccess={handleGoogleSuccess}
          onError={(err: Error) => setError(err?.message || "Error al registrarse con Google.")}
        >
          Registrate con Google
        </BotonGoogle>
      </div>

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
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
            required
          />
        </div>

        {error && (
          <p role="status" style={{ color: "var(--color-error)", margin: 0 }}>
            {error}
          </p>
        )}

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
    </>
  );
}

export default Register;
