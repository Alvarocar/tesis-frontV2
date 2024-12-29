
export type TApiResponse<T> = {
  data: T;
  message?: string;
}

export namespace TApiResponse {
  export interface Token<T> {
    data: T & { token: string };
    message?: string;
  }
}
