import { isAFormatError, isAValidationError } from "./isAFormatError";

export const getErrorResponse = (error: unknown): string | null => {
  if (error instanceof Error) return error.message;

  if (isAFormatError(error)) return error.message;

  if (isAValidationError(error)) return error.message.join(", ");

  if (typeof error === 'string') return error;
  
  return null;
};
