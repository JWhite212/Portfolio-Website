import clsx, { type ClassValue } from "clsx";

export const EMAIL_MAX_LENGTH = 320;
export const MESSAGE_MAX_LENGTH = 2000;

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const validateString = (
  value: unknown,
  maxLength: number,
): value is string => {
  if (!value || typeof value !== "string" || value.trim().length === 0) {
    return false;
  }

  return value.trim().length <= maxLength;
};

export const validateEmail = (value: unknown): value is string => {
  if (!validateString(value, EMAIL_MAX_LENGTH)) {
    return false;
  }

  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(
    value,
  );
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  if (typeof error === "string") {
    return error;
  }

  return "Something went wrong.";
};
