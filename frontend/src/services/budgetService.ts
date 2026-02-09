import { apiClient } from './apiClient';
import type {
  Budget,
  CreateBudgetData,
  UpdateBudgetData,
  ApiResponse,
} from '../types';

export const budgetService = {
  /**
   * Get all budgets for the authenticated user
   */
  getAll: async (): Promise<Budget[]> => {
    const response = await apiClient.get<ApiResponse<Budget[]>>('/budgets');
    return response.data.data;
  },

  /**
   * Get a specific budget by ID
   */
  getById: async (id: number): Promise<Budget> => {
    const response = await apiClient.get<ApiResponse<Budget>>(`/budgets/${id}`);
    return response.data.data;
  },

  /**
   * Create a new budget
   */
  create: async (data: CreateBudgetData): Promise<Budget> => {
    const response = await apiClient.post<ApiResponse<Budget>>('/budgets', data);
    return response.data.data;
  },

  /**
   * Update an existing budget
   */
  update: async (id: number, data: UpdateBudgetData): Promise<Budget> => {
    const response = await apiClient.put<ApiResponse<Budget>>(`/budgets/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a budget
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/budgets/${id}`);
  },

  /**
   * Toggle budget active status
   */
  toggleActive: async (id: number): Promise<Budget> => {
    const response = await apiClient.patch<ApiResponse<Budget>>(`/budgets/${id}/toggle-active`);
    return response.data.data;
  },
};
