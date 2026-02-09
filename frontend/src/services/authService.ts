import { apiClient } from './apiClient';
import type {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  ResetPasswordData,
  ApiResponse,
} from '../types';

export const authService = {
  /**
   * Register a new user
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    // Extract only the fields expected by the backend
    const { name, email, password, password_confirmation } = data;
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/v1/register', {
      name,
      email,
      password,
      password_confirmation,
    });
    return response.data.data;
  },

  /**
   * Login user with credentials
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/v1/login', credentials);
    return response.data.data;
  },

  /**
   * Logout current user
   */
  logout: async (): Promise<void> => {
    await apiClient.post('/v1/logout');
    localStorage.removeItem('auth_token');
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/v1/me');
    return response.data.data;
  },

  /**
   * Request password reset email
   */
  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   */
  resetPassword: async (data: ResetPasswordData): Promise<void> => {
    await apiClient.post('/auth/reset-password', data);
  },

  /**
   * Verify email with token
   */
  verifyEmail: async (token: string): Promise<void> => {
    await apiClient.post('/auth/verify-email', { token });
  },

  /**
   * Resend email verification
   */
  resendVerification: async (): Promise<void> => {
    await apiClient.post('/auth/resend-verification');
  },
};
