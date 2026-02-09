import { apiClient } from './apiClient';
import type { DashboardData, ApiResponse } from '../types';

export const dashboardService = {
  /**
   * Get dashboard data for the authenticated user
   */
  getData: async (): Promise<DashboardData> => {
    const response = await apiClient.get<ApiResponse<DashboardData>>('/dashboard');
    return response.data.data;
  },
};
