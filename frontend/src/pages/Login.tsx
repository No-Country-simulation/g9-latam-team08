import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import BotonGoogle from "../components/ui/BotonGoogle";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // 1. NUEVO ESTADO: Para saber si estamos esperando la validación de Java
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();
  const { handleGoogleSuccess, isLoading } = useGoogleAuth(setError);

  // 2. MODIFICACIÓN: Función asíncrona para conectarse a la API
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    // 1. Validar que no haya campos vacíos
    if (!email.trim() || !password.trim()) {
      setError("Por favor, completá todos los campos.");
      return;
    }

    // 2. Validar el formato del correo electrónico con Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, ingresá un correo electrónico válido.");
      return;
    }

    // ==========================================
    // 3. NUEVA LÓGICA: Conexión real con Spring Boot (Login)
    // ==========================================
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Enviamos el email y la contraseña al servidor
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Si las credenciales están mal (ej. HTTP 401)
      if (!response.ok) {
        throw new Error(data.message || "Credenciales incorrectas.");
      }

      console.log("Login exitoso, datos del servidor:", data);

      // Guardamos el ID real de la base de datos
      localStorage.setItem('userId', data.id.toString());

      // Si tu backend envía un token JWT, lo guardamos para usarlo después
      if (data.token) {
        localStorage.setItem('jwt_token', data.token);
      }

      localStorage.setItem('userName', data.name);
      localStorage.setItem('userEmail', data.email);

      if (data.photo) {
        localStorage.setItem('userPhoto', data.photo);
      } else {
        localStorage.removeItem('userPhoto');
      }

      // ¡Aprobado! Lo dejamos pasar al historial
      navigate("/historial");

    } catch (err: any) {
      setError(err.message || "Error al conectar con el servidor.");
    } finally {
      setIsSubmitting(false); // Apagamos el estado de carga
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

        {/* 4. MODIFICACIÓN: Desactivamos el botón de login mientras carga */}
        <Button type="submit" fullWidth disabled={isSubmitting || isLoading}>
          {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
      </form>

      <div className="login-social">
        <p className="login-social__label">O continuá con</p>
        <BotonGoogle
          onSuccess={handleGoogleSuccess}
          onError={(err: Error) => setError(err?.message || "Error al iniciar sesión con Google.")}
          disabled={isLoading || isSubmitting}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
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
