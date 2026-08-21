import { env } from "./env";

export interface AuthResponse {
  token: string;
  id: number;
  nombre: string;
  email: string;
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const url = `${env.apiBaseUrl}/users/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Credenciales incorrectas");
  }

  const text = await response.text();
  if (!text) {
    throw new Error("El servidor no devolvió datos");
  }
  return JSON.parse(text) as AuthResponse;
}

export async function registerUser(nombre: string, email: string, password: string): Promise<AuthResponse> {
  const url = `${env.apiBaseUrl}/users`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Error al crear la cuenta");
  }

  const text = await response.text();
  if (!text) {
    throw new Error("El servidor no devolvió datos");
  }
  return JSON.parse(text) as AuthResponse;
}

// --- Manejo de sesión con JWT ---

export function saveSession(auth: AuthResponse) {
  localStorage.setItem("token", auth.token);
  localStorage.setItem("userId", String(auth.id));
  localStorage.setItem("userName", auth.nombre);
  localStorage.setItem("userEmail", auth.email);
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function getStoredUserId(): string | null {
  return localStorage.getItem("userId");
}

export function getStoredUserName(): string | null {
  return localStorage.getItem("userName");
}

export function isLoggedIn(): boolean {
  return localStorage.getItem("token") !== null;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
}

/**
 * Helper para hacer fetch autenticado con el token JWT.
 */
export async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");

  return fetch(url, { ...options, headers });
}
