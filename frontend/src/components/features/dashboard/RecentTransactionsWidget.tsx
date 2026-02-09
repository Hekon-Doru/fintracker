import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../common';
import { formatCurrency, formatDate } from '../../../utils';
import type { Transaction } from '../../../types';

interface RecentTransactionsWidgetProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const RecentTransactionsWidget: React.FC<RecentTransactionsWidgetProps> = ({
  transactions,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Transactions
        </h3>
        <Link
          to="/transactions"
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {transactions.slice(0, 5).map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'income'
                    ? 'bg-success-100 dark:bg-success-900/30'
                    : 'bg-danger-100 dark:bg-danger-900/30'
                }`}
              >
                <span className="text-xl">
                  {transaction.type === 'income' ? '📈' : '📉'}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {transaction.description}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {transaction.category?.name} • {formatDate(transaction.transaction_date, 'short')}
                </p>
              </div>
            </div>
            <p
              className={`font-semibold ${
                transaction.type === 'income'
                  ? 'text-success-600 dark:text-success-400'
                  : 'text-danger-600 dark:text-danger-400'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        ))}

        {transactions.length === 0 && (
          <p className="text-center py-8 text-gray-500 dark:text-gray-400">
            No transactions yet
          </p>
        )}
      </div>
    </Card>
  );
};

export default RecentTransactionsWidget;
