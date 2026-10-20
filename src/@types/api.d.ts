
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

export type Paginator = {
  page: string,
  pageSize: string,
}

export type TPaginatorWithQ = Paginator & {
  q: string;
}

export type TListResult<T> = {
  currentPage: number;
  totalPages: number;
  result: T[],
};

export type TApiError = {
  code: string;
  message: string;
  context?: Record<string, unknown>;
}

export type TValidationError = {
  message: string[];
  error: string;
  statusCode: 400;
};
