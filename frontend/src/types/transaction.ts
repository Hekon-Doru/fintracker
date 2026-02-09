import { Account } from './account';
import { Category } from './category';

export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Transaction {
  id: number;
  user_id: number;
  account_id: number;
  category_id: number;
  type: TransactionType;
  amount: number;
  description: string | null;
  transaction_date: string;
  notes: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  account?: Account;
  category?: Category;
}

export interface CreateTransactionData {
  account_id: number;
  category_id: number;
  type: TransactionType;
  amount: number;
  description?: string;
  transaction_date: string;
  notes?: string;
  tags?: string[];
}

export interface UpdateTransactionData {
  account_id?: number;
  category_id?: number;
  type?: TransactionType;
  amount?: number;
  description?: string;
  transaction_date?: string;
  notes?: string;
  tags?: string[];
}

// Type aliases for form compatibility
export type CreateTransactionRequest = CreateTransactionData;

export interface TransactionFilters {
  account_id?: number;
  category_id?: number;
  type?: TransactionType;
  start_date?: string;
  end_date?: string;
  min_amount?: number;
  max_amount?: number;
  search?: string;
  page?: number;
  per_page?: number;
}
