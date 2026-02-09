import { apiClient } from './apiClient';
import type {
  Account,
  CreateAccountData,
  UpdateAccountData,
  ApiResponse,
} from '../types';

export const accountService = {
  /**
   * Get all accounts for the authenticated user
   */
  getAll: async (): Promise<Account[]> => {
    const response = await apiClient.get<ApiResponse<Account[]>>('/accounts');
    return response.data.data;
  },

  /**
   * Get a specific account by ID
   */
  getById: async (id: number): Promise<Account> => {
    const response = await apiClient.get<ApiResponse<Account>>(`/accounts/${id}`);
    return response.data.data;
  },

  /**
   * Create a new account
   */
  create: async (data: CreateAccountData): Promise<Account> => {
    const response = await apiClient.post<ApiResponse<Account>>('/accounts', data);
    return response.data.data;
  },

  /**
   * Update an existing account
   */
  update: async (id: number, data: UpdateAccountData): Promise<Account> => {
    const response = await apiClient.put<ApiResponse<Account>>(`/accounts/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete an account
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/accounts/${id}`);
  },

  /**
   * Toggle account active status
   */
  toggleActive: async (id: number): Promise<Account> => {
    const response = await apiClient.patch<ApiResponse<Account>>(`/accounts/${id}/toggle-active`);
    return response.data.data;
  },
};
