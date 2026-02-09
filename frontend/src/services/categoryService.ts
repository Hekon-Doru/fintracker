import { apiClient } from './apiClient';
import type {
  Category,
  CategoryType,
  CreateCategoryData,
  UpdateCategoryData,
  ApiResponse,
} from '../types';

export const categoryService = {
  /**
   * Get all categories, optionally filtered by type
   */
  getAll: async (type?: CategoryType): Promise<Category[]> => {
    const url = type ? `/categories?type=${type}` : '/categories';
    const response = await apiClient.get<ApiResponse<Category[]>>(url);
    return response.data.data;
  },

  /**
   * Get a specific category by ID
   */
  getById: async (id: number): Promise<Category> => {
    const response = await apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data;
  },

  /**
   * Create a new category
   */
  create: async (data: CreateCategoryData): Promise<Category> => {
    const response = await apiClient.post<ApiResponse<Category>>('/categories', data);
    return response.data.data;
  },

  /**
   * Update an existing category
   */
  update: async (id: number, data: UpdateCategoryData): Promise<Category> => {
    const response = await apiClient.put<ApiResponse<Category>>(`/categories/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a category
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  },
};
