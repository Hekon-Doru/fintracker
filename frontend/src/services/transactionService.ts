import { apiClient } from './apiClient';
import type {
  Transaction,
  CreateTransactionData,
  UpdateTransactionData,
  TransactionFilters,
  ApiResponse,
  PaginatedResponse,
} from '../types';

export const transactionService = {
  /**
   * Get all transactions with optional filters
   */
  getAll: async (filters?: TransactionFilters): Promise<PaginatedResponse<Transaction>> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }

    const response = await apiClient.get<PaginatedResponse<Transaction>>(
      `/transactions?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Get a specific transaction by ID
   */
  getById: async (id: number): Promise<Transaction> => {
    const response = await apiClient.get<ApiResponse<Transaction>>(`/transactions/${id}`);
    return response.data.data;
  },

  /**
   * Create a new transaction
   */
  create: async (data: CreateTransactionData): Promise<Transaction> => {
    const response = await apiClient.post<ApiResponse<Transaction>>('/transactions', data);
    return response.data.data;
  },

  /**
   * Update an existing transaction
   */
  update: async (id: number, data: UpdateTransactionData): Promise<Transaction> => {
    const response = await apiClient.put<ApiResponse<Transaction>>(`/transactions/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a transaction
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/transactions/${id}`);
  },

  /**
   * Import transactions from CSV file
   */
  import: async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);

    await apiClient.post('/transactions/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Export transactions to CSV
   */
  export: async (filters?: TransactionFilters): Promise<Blob> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }

    const response = await apiClient.get(
      `/transactions/export?${params.toString()}`,
      { responseType: 'blob' }
    );
    return response.data as Blob;
  },
};
