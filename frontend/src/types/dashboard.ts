import { Account } from './account';
import { Budget } from './budget';
import { Transaction } from './transaction';
import { Goal } from './goal';

export interface DashboardData {
  total_balance: number;
  total_income: number;
  total_expenses: number;
  net_income: number;
  accounts: Account[];
  recent_transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  spending_by_category: CategorySpending[];
  income_vs_expense_trend: TrendDataPoint[];
}

export interface CategorySpending {
  category_id: number;
  category_name: string;
  total_amount: number;
  percentage: number;
  color: string | null;
}

export interface TrendDataPoint {
  date: string;
  income: number;
  expense: number;
}
