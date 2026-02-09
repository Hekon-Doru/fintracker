export interface IncomeExpenseReport {
  period: {
    start: string;
    end: string;
  };
  total_income: number;
  total_expense: number;
  net_income: number;
  income_by_category: CategoryReport[];
  expense_by_category: CategoryReport[];
}

export interface CategoryReport {
  category_id: number;
  category_name: string;
  amount: number;
  percentage: number;
  transaction_count: number;
}

export interface TrendData {
  date: string;
  income: number;
  expense: number;
  balance: number;
}

export interface ReportFilters {
  start_date: string;
  end_date: string;
  account_id?: number;
  category_id?: number;
  interval?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}
