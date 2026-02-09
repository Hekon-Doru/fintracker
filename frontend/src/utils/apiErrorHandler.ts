import type { AxiosError } from 'axios';
import type { ApiError } from '../types';

/**
 * Extract error message from API error
 */
export const getErrorMessage = (error: unknown): string => {
  if (!error) return 'An unknown error occurred';

  // Check if it's an Axios error
  if (typeof error === 'object' && 'isAxiosError' in error) {
    const axiosError = error as AxiosError<ApiError>;
    
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
    
    if (axiosError.message) {
      return axiosError.message;
    }
  }

  // Check if it's an Error object
  if (error instanceof Error) {
    return error.message;
  }

  // Check if it's a string
  if (typeof error === 'string') {
    return error;
  }

  return 'An unknown error occurred';
};

/**
 * Extract validation errors from API error
 */
export const getValidationErrors = (error: unknown): Record<string, string[]> | null => {
  if (typeof error === 'object' && error !== null && 'isAxiosError' in error) {
    const axiosError = error as AxiosError<ApiError>;
    return axiosError.response?.data?.errors || null;
  }
  return null;
};

/**
 * Get first validation error for a field
 */
export const getFieldError = (errors: Record<string, string[]> | null, field: string): string | null => {
  if (!errors || !errors[field]) return null;
  return errors[field][0] || null;
};
