import type { Transaction } from '../types';

/**
 * Calculate total of transactions
 */
export const calculateTotal = (transactions: Transaction[]): number => {
  return transactions.reduce((total, transaction) => {
    if (transaction.type === 'income') {
      return total + transaction.amount;
    } else if (transaction.type === 'expense') {
      return total - transaction.amount;
    }
    return total;
  }, 0);
};

/**
 * Calculate income total
 */
export const calculateIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0);
};

/**
 * Calculate expense total
 */
export const calculateExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0);
};

/**
 * Calculate net income (income - expenses)
 */
export const calculateNetIncome = (transactions: Transaction[]): number => {
  return calculateIncome(transactions) - calculateExpenses(transactions);
};

/**
 * Calculate percentage of budget used
 */
export const calculateBudgetPercentage = (spent: number, budget: number): number => {
  if (budget === 0) return 0;
  return Math.min((spent / budget) * 100, 100);
};

/**
 * Calculate goal progress percentage
 */
export const calculateGoalProgress = (current: number, target: number): number => {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
};
