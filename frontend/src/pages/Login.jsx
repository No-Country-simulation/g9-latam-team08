import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import BotonGoogle from "../components/ui/BotonGoogle";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { handleGoogleSuccess, isLoading } = useGoogleAuth(setError);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Por favor, completá todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, ingresá un correo electrónico válido.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(data.message || data || "Credenciales incorrectas.");
      }

      console.log("Login exitoso, datos del servidor:", data);

      localStorage.setItem("userId", data.id.toString());

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      localStorage.setItem("userName", data.nombre || data.name || "");
      localStorage.setItem("userEmail", data.email || "");

      if (data.photo) {
        localStorage.setItem("userPhoto", data.photo);
      } else {
        localStorage.removeItem("userPhoto");
      }

      navigate("/historial");
    } catch (err) {
      setError(err.message || "Error al conectar con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
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

        <Button type="submit" fullWidth disabled={isSubmitting || isLoading}>
          {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
      </form>

      <div className="login-social">
        <p className="login-social__label">O continuá con</p>
        <BotonGoogle
          onSuccess={handleGoogleSuccess}
          onError={(err) => setError(err?.message || "Error al iniciar sesión con Google.")}
          disabled={isLoading || isSubmitting}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <FcGoogle size={22} />
            <span style={{ fontWeight: 600 }}>
              {isLoading ? "Verificando..." : "Iniciar sesión con Google"}
            </span>
          </div>
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
