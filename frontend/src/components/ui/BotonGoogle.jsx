import { useGoogleLogin } from "@react-oauth/google";
import Button from "./Button";

/**
 * BotonGoogle
 * Props:
 * - onSuccess: function(tokenResponse) => void  -> called when Google returns a token/credential
 * - onError: function(error) => void
 * - children: optional button label
 */
function BotonGoogle({ onSuccess, onError, children, disabled = false }) {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim();
  const isConfigured = Boolean(googleClientId);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      if (typeof onSuccess === "function") onSuccess(tokenResponse);
    },
    onError: (err) => {
      if (typeof onError === "function") onError(err);
      else console.error("Google login error:", err);
    },
  });

  const handleClick = () => {
    if (disabled) {
      return;
    }
    if (!isConfigured) {
      if (typeof onError === "function") {
        onError(new Error("VITE_GOOGLE_CLIENT_ID no está configurado. Agregalo en frontend/.env y reiniciá Vite."));
      }
      return;
    }
    login();
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        fullWidth
        onClick={handleClick}
        disabled={disabled || !isConfigured}
        title={!isConfigured ? "Agregá VITE_GOOGLE_CLIENT_ID en frontend/.env" : undefined}
      >
        {children ?? "Continuar con Google"}
      </Button>
      {!isConfigured && (
        <p style={{ color: "var(--color-error)", fontSize: "0.9rem", margin: "0.5rem 0 0" }}>
          VITE_GOOGLE_CLIENT_ID no está configurado. Creá frontend/.env con tu client ID y reiniciá Vite.
        </p>
      )}
    </>
  );
}

export default BotonGoogle;
