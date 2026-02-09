import { Category } from './category';

export type BudgetPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Budget {
  id: number;
  user_id: number;
  category_id: number | null;
  amount: number;
  period: BudgetPeriod;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
  utilization?: {
    spent: number;
    percentage: number;
    remaining: number;
  };
}

export interface CreateBudgetData {
  category_id?: number;
  amount: number;
  period: BudgetPeriod;
  start_date: string;
  end_date?: string;
  is_active?: boolean;
}

export interface UpdateBudgetData {
  category_id?: number;
  amount?: number;
  period?: BudgetPeriod;
  start_date?: string;
  end_date?: string;
  is_active?: boolean;
}
