import { TApiError, TValidationError } from "@app/@types/api";

export const isAFormatError = (error: unknown): error is TApiError => {
  if (!error) return false;
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error
  );
};

export const isAValidationError = (
  error: unknown,
): error is TValidationError => {
  if (!error) return false;
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "error" in error &&
    "statusCode" in error
  );
};
