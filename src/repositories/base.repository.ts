import Cookies from "js-cookie";
import { isAFormatError } from "@app/util/error/isAFormatError";
import { getErrorResponse } from "@app/util/error/getErrorResponse";

export const AUTH_UNAUTHORIZED_EVENT = "auth:unauthorized";

const isBrowser = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

export default class BaseRepository {
  private baseURL: string;
  private headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  constructor(baseURL: string, prefix: string = '') {
    this.baseURL = baseURL+prefix;
  }

  private skipUnauthorizedCleanup = false;

  /**
   * Marca al siguiente request como uno en el que un 401 NO debe
   * disparar cleanup ni evento de auth. Útil para endpoints
   * como `auth.check`, donde 401 sin token es el estado "no
   * autenticado" legítimo y NO una sesión vencida.
   */
  public withAuthCleanupSkipped(): this {
    this.skipUnauthorizedCleanup = true;
    return this;
  }

  private async _handleResponse<T>(response: Response): Promise<T> {
    this.clearHeaders();
    const skipCleanup = this.skipUnauthorizedCleanup;
    this.skipUnauthorizedCleanup = false;
    if (!response.ok) {
      if (response.status === 401 && !skipCleanup) {
        this.handleUnauthorized();
      }
      let data: unknown = null;
      try {
        data = await response.json();
      } catch {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      const messageError = getErrorResponse(data);

      if (messageError) throw new Error(messageError);
      
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    if (response.status === 204) return {} as T;
    const data: T = await response.json();
    return data;
  }

  /**
   * El backend usa 401 para tokens vencidos o inválidos.
   * Limpiamos la cookie para que las próximas llamadas se hagan
   * anónimas y los componentes UI (que ya soportan `isAuth: false`)
   * puedan continuar mostrando la información pública.
   */
  private handleUnauthorized() {
    if (!isBrowser()) return;
    if (Cookies.get("token")) {
      Cookies.remove("token");
    }
    window.dispatchEvent(new CustomEvent(AUTH_UNAUTHORIZED_EVENT));
  }

  private async _request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, options);
    return this._handleResponse<T>(response);
  }

  async get<T>(endpoint: string): Promise<T> {
    const options: RequestInit = {
      method: 'GET',
      headers: this._getHeaders(),
    };
    return this._request<T>(endpoint, options);
  }

  async post<T, U = void>(endpoint: string, body: U): Promise<T> {
    const options: RequestInit = {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(body ?? {}),
    };
    return this._request<T>(endpoint, options);
  }

  async put<T, U = void>(endpoint: string, body: U): Promise<T> {
    const options: RequestInit = {
      method: 'PUT',
      headers: this._getHeaders(),
      body: JSON.stringify(body),
    };
    return this._request<T>(endpoint, options);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const options: RequestInit = {
      method: 'DELETE',
      headers: this._getHeaders(),
    };
    return this._request<T>(endpoint, options);
  }

  async patch<T, U>(endpoint: string, body: U): Promise<T> {
    const options: RequestInit = {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(body),
    };
    return this._request<T>(endpoint, options);
  }

  setHeaders(headers: HeadersInit) {
    this.headers = { ...this.headers, ...headers };
  }

  clearHeaders() {
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  private _getHeaders() {
    return this.headers;
  }
}