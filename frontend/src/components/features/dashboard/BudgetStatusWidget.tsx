import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge } from '../../common';
import { formatCurrency, calculateBudgetPercentage } from '../../../utils';
import type { Budget } from '../../../types';

interface BudgetStatusWidgetProps {
  budgets: Budget[];
  isLoading?: boolean;
}

const BudgetStatusWidget: React.FC<BudgetStatusWidgetProps> = ({
  budgets,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
      </Card>
    );
  }

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'danger';
    if (percentage >= 75) return 'warning';
    return 'success';
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Budget Status
        </h3>
        <Link
          to="/budgets"
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          View all
        </Link>
      </div>

      <div className="space-y-4">
        {budgets.slice(0, 4).map((budget) => {
          const percentage = calculateBudgetPercentage(
            budget.utilization?.spent || 0,
            budget.amount
          );
          const statusColor = getStatusColor(percentage);

          return (
            <div key={budget.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {budget.category?.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatCurrency(budget.utilization?.spent || 0)} of{' '}
                    {formatCurrency(budget.amount)}
                  </p>
                </div>
                <Badge variant={statusColor} size="sm">
                  {percentage.toFixed(0)}%
                </Badge>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    statusColor === 'danger'
                      ? 'bg-danger-600'
                      : statusColor === 'warning'
                      ? 'bg-warning-600'
                      : 'bg-success-600'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          );
        })}

        {budgets.length === 0 && (
          <p className="text-center py-8 text-gray-500 dark:text-gray-400">
            No budgets set
          </p>
        )}
      </div>
    </Card>
  );
};

export default BudgetStatusWidget;
