import { apiClient } from './apiClient';
import type {
  Goal,
  CreateGoalData,
  UpdateGoalData,
  ApiResponse,
} from '../types';

export const goalService = {
  /**
   * Get all goals for the authenticated user
   */
  getAll: async (): Promise<Goal[]> => {
    const response = await apiClient.get<ApiResponse<Goal[]>>('/goals');
    return response.data.data;
  },

  /**
   * Get a specific goal by ID
   */
  getById: async (id: number): Promise<Goal> => {
    const response = await apiClient.get<ApiResponse<Goal>>(`/goals/${id}`);
    return response.data.data;
  },

  /**
   * Create a new goal
   */
  create: async (data: CreateGoalData): Promise<Goal> => {
    const response = await apiClient.post<ApiResponse<Goal>>('/goals', data);
    return response.data.data;
  },

  /**
   * Update an existing goal
   */
  update: async (id: number, data: UpdateGoalData): Promise<Goal> => {
    const response = await apiClient.put<ApiResponse<Goal>>(`/goals/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a goal
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/goals/${id}`);
  },

  /**
   * Contribute to a goal
   */
  contribute: async (id: number, amount: number): Promise<Goal> => {
    const response = await apiClient.post<ApiResponse<Goal>>(`/goals/${id}/contribute`, {
      amount,
    });
    return response.data.data;
  },

  /**
   * Withdraw from a goal
   */
  withdraw: async (id: number, amount: number): Promise<Goal> => {
    const response = await apiClient.post<ApiResponse<Goal>>(`/goals/${id}/withdraw`, {
      amount,
    });
    return response.data.data;
  },
};
