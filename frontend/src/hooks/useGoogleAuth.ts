import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 1. Interfaz de Google
interface GoogleTokenResponse {
  credential?: string;
  access_token?: string;
}

// 2. Interfaz del Backend
interface AuthResponse {
  id: string | number;
  token?: string;
  nombre?: string;
  email?: string;
}

export const useGoogleAuth = (setError: (message: string) => void) => {
  const navigate = useNavigate();

  // Estado para saber si la petición está en curso
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleSuccess = async (tokenResponse: GoogleTokenResponse) => {
    setIsLoading(true);
    setError(""); // Limpiamos cualquier error de un intento anterior

    const tokenStr = tokenResponse.credential || tokenResponse.access_token;

    if (!tokenStr) {
      setError("No se pudo obtener el token de autenticación de Google.");
      setIsLoading(false);
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
        throw new Error(`El backend rechazó el token (Status: ${response.status})`);
      }

      // 2. Extraemos el usuario (Ej: Rodrigo lopez, ID: 1, Token: "eyJhbGci...")
      const userData: AuthResponse = await response.json();

      // 3. Guardamos los datos de sesión en el navegador
      localStorage.setItem('userId', userData.id.toString());

      // Guardamos el JWT para usarlo luego
      if (userData.token) {localStorage.setItem('jwt_token', userData.token);}

      if (userData.name) localStorage.setItem('userName', userData.name);
      if (userData.email) localStorage.setItem('userEmail', userData.email);
      if (userData.photo) localStorage.setItem('userPhoto', userData.photo);

      // 4. Redirigimos al panel
      navigate('/historial');

    } catch (error) {
      console.error("Error al comunicar con el backend:", error);
      setError("No pudimos validar tu cuenta de Google con nuestro servidor.");
    } finally {
      // Pase lo que pase (éxito o error), apagamos el estado de carga
      setIsLoading(false);
    }
  };

  // Retornamos también el isLoading para que el componente visual lo pueda usar
  return { handleGoogleSuccess, isLoading };
};
