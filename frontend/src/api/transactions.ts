import { env } from "./env";
import { authenticatedFetch, getStoredUserId } from "./auth";

export interface TransactionResponse {
  id: number;
  nombre_tienda: string;
  subcategoria?: string;
  monto: number;
  metodo_pago?: string;
  esencial?: boolean;
  categoria_principal: string;
  confidence: number;
  fecha: string;
  type: string;
}

export interface CreateTransactionRequest {
  nombre_tienda: string;
  subcategoria?: string;
  monto: number;
  metodo_pago?: string;
  esencial?: boolean;
  categoria_principal: string;
  fecha: string;
  type: string;
}

/**
 * Obtiene todas las transacciones del usuario logueado.
 */
export async function getUserTransactions(): Promise<TransactionResponse[]> {
  const userId = getStoredUserId();
  if (!userId) return [];

  const url = `${env.apiBaseUrl}/transactions/user/${userId}`;
  try {
    const response = await authenticatedFetch(url);
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

/**
 * Crea una nueva transacción.
 */
export async function createTransaction(data: CreateTransactionRequest): Promise<TransactionResponse | null> {
  const userId = getStoredUserId();
  if (!userId) return null;

  const url = `${env.apiBaseUrl}/transactions?userId=${userId}`;
  try {
    const response = await authenticatedFetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    return response.json();
  } catch (error) {
    console.error("[Transactions] Error al crear:", error);
    return null;
  }
}

/**
 * Actualiza una transacción existente.
 */
export async function updateTransaction(id: number, data: Partial<CreateTransactionRequest>): Promise<TransactionResponse | null> {
  const url = `${env.apiBaseUrl}/transactions/${id}`;
  try {
    const response = await authenticatedFetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

/**
 * Elimina una transacción.
 */
export async function deleteTransaction(id: number): Promise<boolean> {
  const url = `${env.apiBaseUrl}/transactions/${id}`;
  try {
    const response = await authenticatedFetch(url, { method: "DELETE" });
    return response.ok || response.status === 204;
  } catch {
    return false;
  }
}
