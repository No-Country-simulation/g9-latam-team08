import { useNavigate } from "react-router-dom";

// 1. Definimos la interfaz para la respuesta que nos entrega Google
interface GoogleTokenResponse {
  credential?: string;
  access_token?: string;
}

// 2. Definimos la interfaz para lo que responde tu backend en Spring Boot
interface AuthResponse {
  id: string | number; // Aceptamos ambos por si tu backend manda el ID como número
  // Puedes agregar más campos aquí si tu backend los devuelve (ej: email: string)
}

// 3. Tipamos el parámetro 'setError'.
// Le decimos a TS que es una función que recibe un string (el mensaje) y no retorna nada (void).
export const useGoogleAuth = (setError: (message: string) => void) => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (tokenResponse: GoogleTokenResponse) => {
    console.log("Token de Google recibido:", tokenResponse);
    const tokenStr = tokenResponse.credential || tokenResponse.access_token;

    // TypeScript nos exige asegurarnos de que el token realmente exista antes de enviarlo
    if (!tokenStr) {
      setError("No se pudo obtener el token de autenticación.");
      return;
    }

    try {
      // 1. Enviamos el token al backend
      const response = await fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: tokenStr })
      });

      if (!response.ok) {
        throw new Error("El backend rechazó el token de Google");
      }

      // 2. Extraemos el usuario y le decimos a TypeScript qué forma tiene (AuthResponse)
      const userData: AuthResponse = await response.json();

      // 3. Guardamos el ID en el almacenamiento del navegador
      // Transformamos a string por si el ID del backend viene como number
      localStorage.setItem('userId', userData.id.toString());

      // 4. Redirigimos al usuario al panel financiero
      navigate('/historial');

    } catch (error) {
      console.error("Error al comunicar con el backend:", error);
      setError("No pudimos validar tu cuenta de Google con nuestro servidor.");
    }
  };

  return { handleGoogleSuccess };
};
