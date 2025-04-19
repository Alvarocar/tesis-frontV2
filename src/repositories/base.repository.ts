
export default class BaseRepository {
  private baseURL: string;
  private headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  constructor(baseURL: string, prefix: string = '') {
    this.baseURL = baseURL+prefix;
  }

  private async _handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const data =  await response.json();
      if (data.message) {
        throw new Error(data.message);
      }
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    if (response.status === 204) return {} as T;
    const data: T = await response.json();
    return data;
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
      body: JSON.stringify(body),
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

  private _getHeaders() {
    return this.headers;
  }
}