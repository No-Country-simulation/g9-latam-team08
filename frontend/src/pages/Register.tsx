import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import BotonGoogle from "../components/ui/BotonGoogle";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { FcGoogle } from "react-icons/fc";
import { env } from "../api/env";

function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Controla si el registro fue exitoso para cambiar la vista
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const navigate = useNavigate();
  const { handleGoogleSuccess, isLoading } = useGoogleAuth(setError);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Por favor, completá todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, ingresá un correo electrónico válido.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden. Verificalas e intentá de nuevo.");
      return;
    }

    setIsSubmitting(true);

    try {
const response = await fetch(
  `${env.apiBaseUrl}api/usuarios`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: name,
      email,
      password,
    }),
  }
);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar en el servidor.");
      }

      console.log("Usuario validado por el backend:", data);

      // activamos nuestra pantalla de éxito
      setIsSuccess(true);

      // Lo mandamos al login después de 2.5 segundos para que lea bien el mensaje
      setTimeout(() => navigate('/login'), 2500);

    } catch (err: any) {
      setError(err.message || "No se pudo conectar con el servidor Java.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="login-card__header">
        <h1 id="auth-title" className="login-card__title">
          {isSuccess ? "¡Bienvenido a FinanceAI!" : "Crear cuenta"}
        </h1>
        <p className="login-card__subtitle">
          {isSuccess ? "Tu cuenta ha sido creada exitosamente." : "Registrate para acceder a tu panel financiero."}
        </p>
      </header>

      {/* RENDERIZADO CONDICIONAL: Si hay éxito muestra el mensaje, sino el formulario */}
      {isSuccess ? (
        <div style={{ textAlign: "center", padding: "2rem 0", animation: "fadeIn 0.5s ease-in-out" }}>

          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: "0 auto 1rem auto", display: "block" }}
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>

          <h2 style={{ fontSize: "1.25rem", color: "#374151", marginBottom: "0.5rem" }}>
            ¡Registro completado!
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>
            Redirigiendo al inicio de sesión...
          </p>
        </div>
      ) : (
        // Todo el bloque del formulario original se muestra solo si NO hay éxito
        <>
          <div style={{ marginBottom: "1.5rem" }}>
            <BotonGoogle
              onSuccess={handleGoogleSuccess}
              onError={(err: Error) => setError(err?.message || "Error al registrarse con Google.")}
              disabled={isLoading || isSubmitting}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <FcGoogle size={22} />
                <span style={{ fontWeight: 600 }}>
                  {isLoading ? "Verificando..." : "Registrate con Google"}
                </span>
              </div>
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

            <Button type="submit" fullWidth disabled={isSubmitting || isLoading}>
              {isSubmitting ? "Procesando..." : "Crear cuenta"}
            </Button>
          </form>

          <p className="login-card__footer">
            ¿Ya tenés cuenta?{" "}
            <Link className="login-card__link" to="/login">
              Iniciar sesión
            </Link>
          </p>
        </>
      )}
    </>
  );
}

export default Register;
