import { apiClient } from './apiClient';
import type {
  IncomeExpenseReport,
  CategoryReport,
  TrendData,
  ReportFilters,
  ApiResponse,
} from '../types';

export const reportService = {
  /**
   * Get income vs expense report
   */
  getIncomeExpense: async (start: string, end: string): Promise<IncomeExpenseReport> => {
    const response = await apiClient.get<ApiResponse<IncomeExpenseReport>>(
      `/reports/income-expense?start_date=${start}&end_date=${end}`
    );
    return response.data.data;
  },

  /**
   * Get spending by category report
   */
  getByCategory: async (start: string, end: string): Promise<CategoryReport[]> => {
    const response = await apiClient.get<ApiResponse<CategoryReport[]>>(
      `/reports/by-category?start_date=${start}&end_date=${end}`
    );
    return response.data.data;
  },

  /**
   * Get trends over time
   */
  getTrends: async (start: string, end: string, interval: string = 'daily'): Promise<TrendData[]> => {
    const response = await apiClient.get<ApiResponse<TrendData[]>>(
      `/reports/trends?start_date=${start}&end_date=${end}&interval=${interval}`
    );
    return response.data.data;
  },

  /**
   * Export report to CSV/PDF
   */
  export: async (type: 'csv' | 'pdf', filters: ReportFilters): Promise<Blob> => {
    const params = new URLSearchParams();
    params.append('type', type);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    const response = await apiClient.get(
      `/reports/export?${params.toString()}`,
      { responseType: 'blob' }
    );
    return response.data as Blob;
  },
};
