import { TApiError } from "@app/@types/api";

export const isAFormatError = (error: unknown): error is TApiError => {
  if (!error) return false;
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error;
}